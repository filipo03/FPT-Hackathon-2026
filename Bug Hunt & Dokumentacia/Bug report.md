# KnihaPlus — Bug Report

**Project:** KnihaPlus - Systém správy knižničného fondu v2.3.1
**Date:** 2026-05-21
**Reviewer:** Senior Python Code Reviewer (automated)

---

## Bug #1: Hardcoded Admin Password with Weak MD5 Hash
**File:** app.py
**Line:** 15
**Severity:** Critical
**Type:** Security
**Description:** The admin password `"admin123"` is hardcoded in the source code and hashed with MD5, which is cryptographically broken. Anyone reading the source code knows the password, and MD5 rainbow tables can reverse the hash in milliseconds. This provides zero real security.
**Reproduction:** Read line 15 of app.py; the plaintext password `"admin123"` is visible. Alternatively, look up the MD5 hash in any online rainbow table.
**Proposed Fix:**
```python
import bcrypt
import os

# Store hashed password in environment variable or config file
ADMIN_PASSWORD_HASH = os.environ.get("ADMIN_PASSWORD_HASH")

def authenticate_admin(password):
    if ADMIN_PASSWORD_HASH is None:
        raise RuntimeError("ADMIN_PASSWORD_HASH environment variable not set")
    return bcrypt.checkpw(password.encode(), ADMIN_PASSWORD_HASH.encode())
```

---

## Bug #2: Null Pointer — Missing None Check on Member Lookup
**File:** app.py
**Line:** 69
**Severity:** Critical
**Type:** Null Pointer
**Description:** If `member_id` does not match any member in the database, `member` remains `None`. Accessing `member["active"]` on `None` raises a `TypeError: 'NoneType' object is not subscriptable`, crashing the application.
**Reproduction:** Call `borrow_book(9999, 1, db)` where member ID 9999 does not exist.
**Proposed Fix:**
```python
member = None
for m in db["members"]:
    if m["id"] == member_id:
        member = m

if member is None:
    return {"success": False, "error": "Člen nenájdený"}

if member["active"] is False:
    return {"success": False, "error": "Člen nie je aktívny"}
```

---

## Bug #3: Division by Zero in Statistics
**File:** app.py
**Line:** 145
**Severity:** Critical
**Type:** Error Handling
**Description:** `calculate_statistics` divides `len(db["loans"])` by `total_members` without checking if `total_members` is zero. On a fresh database with no members, this raises `ZeroDivisionError`.
**Reproduction:** Call `calculate_statistics({"books": [], "members": [], "loans": []})`.
**Proposed Fix:**
```python
avg_loans = len(db["loans"]) / total_members if total_members > 0 else 0.0
```

---

## Bug #4: IndexError in `get_book_by_id`
**File:** app.py
**Line:** 228
**Severity:** Critical
**Type:** Error Handling
**Description:** The list comprehension `[b for b in db["books"] if b["id"] == book_id][0]` raises `IndexError: list index out of range` if no book matches the given ID. There is no fallback or None check.
**Reproduction:** Call `get_book_by_id(9999, db)` with a non-existent book ID.
**Proposed Fix:**
```python
def get_book_by_id(book_id, db):
    matches = [b for b in db["books"] if b["id"] == book_id]
    return matches[0] if matches else None
```

---

## Bug #5: Incorrect `timedelta` Positional Argument
**File:** app.py
**Line:** 89
**Severity:** High
**Type:** Logic
**Description:** `datetime.timedelta(MAX_BORROW_DAYS)` passes 14 as the first positional argument, which is **days** — so the result is accidentally correct only because `timedelta`'s first positional arg happens to be `days`. However, this is fragile and misleading. If the constant name or intent changes (e.g., to hours), the code silently breaks. The explicit keyword `days=` should always be used for clarity and safety.
**Reproduction:** The code works by coincidence; rename the constant to represent hours and it still passes as days.
**Proposed Fix:**
```python
due_date = today + datetime.timedelta(days=MAX_BORROW_DAYS)
```

---

## Bug #6: Fines Charged for Early Returns (abs() Bug)
**File:** app.py
**Line:** 116
**Severity:** High
**Type:** Logic
**Description:** `abs(days_late)` converts negative values (early returns) to positive, so members who return books **before** the due date are charged a fine. For example, returning 3 days early produces `abs(-3) * 0.10 = 0.30` fine.
**Reproduction:** Borrow a book, return it the next day (well before the 14-day due date). The fine will be > 0.
**Proposed Fix:**
```python
days_late = (return_date - due_date).days
fine = max(0, days_late) * FINE_PER_DAY
```

---

## Bug #7: Mutable Default Argument `db=[]`
**File:** app.py
**Line:** 30
**Severity:** High
**Type:** Python Antipattern
**Description:** `def add_book(..., db=[])` uses a mutable default argument. The empty list is shared across all calls that don't provide `db`. Additionally, line 33 accesses `db["books"]` on a list, which raises `TypeError` (lists don't have string keys). The default should be `None` and the function should require an explicit `db` dict.
**Reproduction:** Call `add_book("Title", "Author", "123")` without passing `db`. It crashes with `TypeError: list indices must be integers or slices, not str`.
**Proposed Fix:**
```python
def add_book(title, author, isbn, copies=1, db=None):
    if db is None:
        raise ValueError("Database parameter 'db' is required")
    # ... rest of function
```

---

## Bug #8: Duplicate Emails Allowed in Registration
**File:** app.py
**Lines:** 171–173
**Severity:** High
**Type:** Logic
**Description:** The duplicate email check iterates over members but uses `pass` when a match is found instead of returning an error. Every registration succeeds regardless of whether the email already exists, allowing duplicate accounts.
**Reproduction:** Call `register_member("A", "a@b.com", db)` twice — two members with the same email are created.
**Proposed Fix:**
```python
for m in db["members"]:
    if m["email"] == email:
        return {"success": False, "error": "Email už existuje v systéme"}
```

---

## Bug #9: Non-Unique ID Generation
**File:** app.py
**Lines:** 38, 92, 176
**Severity:** High
**Type:** Logic
**Description:** IDs are generated with `len(collection) + 1`. If items are ever deleted, this produces duplicate IDs. For example: add 3 books (IDs 1,2,3), delete book 2 (length becomes 2), add a new book — it gets ID 3, colliding with the existing book 3.
**Reproduction:** Add and delete items, then add again.
**Proposed Fix:**
```python
import uuid

new_id = str(uuid.uuid4())
# Or for integer IDs:
new_id = max((b["id"] for b in db["books"]), default=0) + 1
```

---

## Bug #10: `available` Not Updated When `copies` Changed
**File:** app.py
**Lines:** 239–245
**Severity:** High
**Type:** Logic
**Description:** `update_book_copies` adjusts `book["copies"]` by `delta` but never touches `book["available"]`. After adding 5 more copies, the system still reports the old availability count. Worse, if copies are reduced below the current available count, `available` can exceed `copies`.
**Reproduction:** Call `update_book_copies(1, 5, db)` — copies increases by 5 but available stays unchanged.
**Proposed Fix:**
```python
def update_book_copies(book_id, delta, db):
    for book in db["books"]:
        if book["id"] == book_id:
            new_copies = book["copies"] + delta
            if new_copies < 0:
                return False
            currently_borrowed = book["copies"] - book["available"]
            book["copies"] = new_copies
            book["available"] = max(0, new_copies - currently_borrowed)
            return True
    return False
```

---

## Bug #11: Case-Sensitive Book Search
**File:** app.py
**Lines:** 55–57
**Severity:** Medium
**Type:** Logic
**Description:** `search_books` uses `in` for substring matching, which is case-sensitive. Searching for "hašek" won't find "Hašek". Users expect case-insensitive search.
**Reproduction:** `search_books("hašek", db)` returns `[]` even though the author is "Jaroslav Hašek".
**Proposed Fix:**
```python
def search_books(query, db):
    results = []
    query_lower = query.lower()
    for book in db["books"]:
        if query_lower in book["title"].lower() or query_lower in book["author"].lower():
            results.append(book)
    return results
```

---

## Bug #12: No Email Format Validation
**File:** app.py
**Line:** 169 / models.py Line 36
**Severity:** Medium
**Type:** Error Handling
**Description:** `register_member` and the `Member` class accept any string as an email — including empty strings, numbers, or garbage. No regex or structural validation is performed.
**Reproduction:** `register_member("Test", "not-an-email", db)` succeeds.
**Proposed Fix:**
```python
import re

def register_member(name, email, db):
    if not re.match(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$", email):
        return {"success": False, "error": "Neplatný formát emailu"}
    # ... rest of function
```

---

## Bug #13: Off-by-One in Pagination
**File:** app.py
**Lines:** 234–236
**Severity:** Medium
**Type:** Logic
**Description:** `paginate` computes `start = page * page_size`. If pages are 1-indexed (page 1 = first page), then page 1 returns items `[10:20]` instead of `[0:10]`. The user never sees the first page of results.
**Reproduction:** `paginate([1,2,3,4,5], page=1, page_size=2)` returns `[3, 4]` instead of `[1, 2]`.
**Proposed Fix:**
```python
def paginate(items, page, page_size=10):
    start = (page - 1) * page_size  # 1-indexed pages
    end = start + page_size
    return items[start:end]
```

---

## Bug #14: Unsorted Member History
**File:** app.py
**Lines:** 129–136
**Severity:** Medium
**Type:** Logic
**Description:** `get_member_history` returns loans in insertion order, not sorted by date. Users expect chronological ordering.
**Reproduction:** Borrow books on different dates; history returns them in arbitrary insertion order.
**Proposed Fix:**
```python
def get_member_history(member_id, db):
    history = [loan for loan in db["loans"] if loan["member_id"] == member_id]
    history.sort(key=lambda l: l["borrow_date"], reverse=True)
    return history
```

---

## Bug #15: File Handle Not Safely Closed
**File:** app.py
**Lines:** 218–221
**Severity:** Medium
**Type:** Error Handling
**Description:** `export_overdue_loans` opens a file with `f = open(...)` and calls `f.close()` after the loop. If any exception occurs during `f.write()`, the file handle is leaked. A `with` statement should be used.
**Reproduction:** Cause a write error (e.g., disk full) — the file handle is never closed.
**Proposed Fix:**
```python
with open(output_file, "w") as f:
    for item in overdue:
        f.write(f"{item['loan_id']},{item['member']},{item['fine']}\n")
```

---

## Bug #16: O(n^2) Member Lookup in Overdue Export
**File:** app.py
**Lines:** 204–208
**Severity:** Medium
**Type:** Performance
**Description:** For each overdue loan, the code iterates through all members to find the name. With L loans and M members, this is O(L*M). A pre-built dictionary lookup would reduce it to O(L+M).
**Reproduction:** With 10,000 loans and 5,000 members, this loop performs up to 50 million comparisons.
**Proposed Fix:**
```python
def export_overdue_loans(db, output_file="overdue.txt"):
    today = datetime.date.today()
    member_lookup = {m["id"]: m["name"] for m in db["members"]}
    overdue = []

    for loan in db["loans"]:
        if not loan["returned"]:
            due = datetime.date.fromisoformat(loan["due_date"])
            if today > due:
                days = (today - due).days
                member_name = member_lookup.get(loan["member_id"], "Neznámy")
                overdue.append({
                    "loan_id": loan["id"],
                    "member": member_name,
                    "book_id": loan["book_id"],
                    "days_late": days,
                    "fine": days * FINE_PER_DAY
                })

    with open(output_file, "w") as f:
        for item in overdue:
            f.write(f"{item['loan_id']},{item['member']},{item['fine']}\n")

    return len(overdue)
```

---

## Bug #17: `==` Used Instead of `is` for Boolean/None Comparison
**File:** app.py
**Line:** 69
**Severity:** Medium
**Type:** Python Antipattern
**Description:** `member["active"] == False` should be `member["active"] is False` or `not member["active"]`. Using `==` with booleans can produce unexpected results with truthy/falsy values.
**Reproduction:** If `member["active"]` is `0` or `""`, the check may behave incorrectly.
**Proposed Fix:**
```python
if not member["active"]:
    return {"success": False, "error": "Člen nie je aktívny"}
```

---

## Bug #18: `Book.is_available()` Method Never Used
**File:** models.py
**Line:** 29 / app.py Line 82
**Severity:** Medium
**Type:** Logic
**Description:** The `Book` class has an `is_available()` method, but `borrow_book()` in app.py checks `book["available"] <= 0` directly on a dict instead of using the model. The models and the app logic are completely disconnected — the classes in models.py are never instantiated by app.py.
**Reproduction:** Inspect code: `Book`, `Member`, `Loan` classes are defined but never used.
**Proposed Fix:**
Either use the model classes throughout app.py, or remove them. If keeping the dict approach, remove the unused classes to avoid confusion.

---

## Bug #19: `available` Not Validated Against `copies` in Book Model
**File:** models.py
**Line:** 12
**Severity:** Medium
**Type:** Logic
**Description:** The `Book` constructor sets `self.available = copies` but never validates that `available <= copies`. External code could set `available` to a value exceeding `copies`, creating an inconsistent state.
**Reproduction:** `b = Book(1, "T", "A", "ISBN", 3); b.available = 10` — no error raised.
**Proposed Fix:**
```python
@property
def available(self):
    return self._available

@available.setter
def available(self, value):
    if value < 0 or value > self.copies:
        raise ValueError(f"Available must be between 0 and {self.copies}")
    self._available = value
```

---

## Bug #20: `Loan.is_overdue()` Compares Date with String
**File:** models.py
**Lines:** 67–68
**Severity:** Medium
**Type:** Logic
**Description:** `is_overdue()` compares `today` (a `date` object) with `self.due_date`. If `due_date` was passed as a string (as done in app.py line 96), this comparison raises `TypeError: '>' not supported between instances of 'datetime.date' and 'str'`.
**Reproduction:** `loan = Loan(1, 1, 1, "2026-01-01", "2026-01-14"); loan.is_overdue()` raises TypeError.
**Proposed Fix:**
```python
def is_overdue(self):
    import datetime
    today = datetime.date.today()
    due = self.due_date if isinstance(self.due_date, datetime.date) else datetime.date.fromisoformat(self.due_date)
    return today > due and not self.returned
```

---

## Bug #21: `Loan.return_date` Never Set
**File:** models.py
**Line:** 62
**Severity:** Low
**Type:** Logic
**Description:** `Loan` has a `return_date` attribute initialized to `None`, but `return_book()` in app.py operates on dicts, not `Loan` objects. Even if the class were used, nothing in the codebase sets `return_date`.
**Reproduction:** Return a book; `loan.return_date` remains `None`.
**Proposed Fix:**
```python
# In return_book or a Loan.mark_returned() method:
loan.return_date = datetime.date.today()
```

---

## Bug #22: `Member.get_fine_total()` Sums Paid and Unpaid Fines
**File:** models.py
**Lines:** 47–50
**Severity:** Low
**Type:** Logic
**Description:** `get_fine_total()` sums all fines in the member's loan history, including fines already paid. There is no `paid` flag, so the total only grows.
**Reproduction:** A member who pays a fine still sees the same total.
**Proposed Fix:**
```python
def get_fine_total(self):
    total = 0
    for loan in self.loans:
        if "fine" in loan and not loan.get("paid", False):
            total += loan["fine"]
    return total
```

---

## Bug #23: Hardcoded Borrow Limit in `Member.can_borrow()`
**File:** models.py
**Line:** 41
**Severity:** Low
**Type:** Logic
**Description:** The limit of 5 active loans is hardcoded. Different member tiers or policy changes require code modifications.
**Reproduction:** Changing the borrow limit requires editing source code.
**Proposed Fix:**
```python
MAX_ACTIVE_LOANS = 5  # module-level constant or config

def can_borrow(self, max_loans=MAX_ACTIVE_LOANS):
    active_loans = [l for l in self.loans if not l.get("returned", False)]
    return len(active_loans) < max_loans
```

---

## Bug #24: Missing `__repr__` on `Book` Class
**File:** models.py
**Line:** 25
**Severity:** Low
**Type:** Python Antipattern
**Description:** `Book` defines `__str__` but not `__repr__`. In debugging contexts (REPL, logs, print of lists), Python uses `__repr__`, which defaults to an unhelpful `<Book object at 0x...>`.
**Reproduction:** `print([book])` shows `[<models.Book object at 0x...>]` instead of useful info.
**Proposed Fix:**
```python
def __repr__(self):
    return f"Book(id={self.id}, title='{self.title}', isbn='{self.isbn}')"
```

---

## Bug #25: `import datetime` Inside Method Body
**File:** models.py
**Line:** 65
**Severity:** Low
**Type:** Python Antipattern
**Description:** `Loan.is_overdue()` imports `datetime` inside the method body. While functional, this is an antipattern — imports should be at module level for clarity and slight performance benefit on repeated calls.
**Reproduction:** Inspect code; no runtime error but violates PEP 8 conventions.
**Proposed Fix:**
```python
# At top of models.py:
import datetime

# Remove the import from is_overdue()
```

---

## Bug #26: No `borrow_book` Limit Check
**File:** app.py
**Lines:** 61–100
**Severity:** Medium
**Type:** Logic
**Description:** `borrow_book()` does not check how many active loans a member already has. The `Member.can_borrow()` method exists in models.py but is never called. A member can borrow unlimited books.
**Reproduction:** Call `borrow_book` 100 times for the same member — all succeed.
**Proposed Fix:**
```python
# Add after member validation in borrow_book():
active_loans = [l for l in db["loans"] if l["member_id"] == member_id and not l["returned"]]
if len(active_loans) >= MAX_ACTIVE_LOANS:
    return {"success": False, "error": "Prekročený limit aktívnych výpožičiek"}
```

---

## Bug #27: JSON Database Has No File Locking
**File:** app.py
**Lines:** 18–27
**Severity:** Medium
**Type:** Error Handling
**Description:** `load_database` and `save_database` perform file I/O without any file locking. If two processes access the same JSON file simultaneously, data corruption or lost writes can occur.
**Reproduction:** Run two instances of the application simultaneously that both save to the same file.
**Proposed Fix:**
```python
import fcntl  # Unix; use msvcrt on Windows

def save_database(db):
    with open(DB_FILE, "w") as f:
        fcntl.flock(f, fcntl.LOCK_EX)
        json.dump(db, f, indent=2)
        fcntl.flock(f, fcntl.LOCK_UN)
```

---

## Bug #28: `add_book` ISBN-Match Path Does Not Update `available`
**File:** app.py
**Line:** 35
**Severity:** High
**Type:** Logic
**Description:** When a book with the same ISBN already exists, `add_book` increments `book["copies"]` but does NOT increment `book["available"]`. The new copies are recorded but can never be borrowed because the system doesn't know they're available. This is distinct from Bug #10 (`update_book_copies`) — this is the `add_book` duplicate-ISBN path.
**Reproduction:** Add 3 copies of ISBN "X" (copies=3, available=3). Then call `add_book` again with the same ISBN and copies=2. Now copies=5 but available=3 — the 2 new copies are invisible.
**Proposed Fix:**
```python
for book in db["books"]:
    if book["isbn"] == isbn:
        book["copies"] += copies
        book["available"] += copies  # Also make new copies available
        return book["id"]
```

---

## Bug #29: `return_book` Partial State Mutation on Failure
**File:** app.py
**Lines:** 110–124
**Severity:** High
**Type:** Error Handling
**Description:** `return_book` sets `loan["returned"] = True` on line 110 BEFORE computing the fine on lines 112–116. If `datetime.date.fromisoformat(loan["due_date"])` raises a `ValueError` (corrupted date string), the loan is permanently marked as returned, no fine is recorded, and the book's `available` count is never restored. The function has no rollback mechanism.
**Reproduction:** Manually corrupt a loan's `due_date` to `"not-a-date"` in the JSON, then call `return_book`. The loan is marked returned, the book availability is lost, and a ValueError propagates.
**Proposed Fix:**
```python
def return_book(loan_id, db):
    for loan in db["loans"]:
        if loan["id"] == loan_id:
            if loan["returned"]:
                return {"success": False, "error": "Kniha už bola vrátená"}

            # Compute fine BEFORE mutating state
            return_date = datetime.date.today()
            try:
                due_date = datetime.date.fromisoformat(loan["due_date"])
            except ValueError:
                return {"success": False, "error": "Neplatný dátum splatnosti"}

            days_late = (return_date - due_date).days
            fine = max(0, days_late) * FINE_PER_DAY

            # Now safe to mutate
            loan["returned"] = True
            for book in db["books"]:
                if book["id"] == loan["book_id"]:
                    book["available"] += 1
                    break

            return {"success": True, "fine": fine, "days_late": days_late}

    return {"success": False, "error": "Výpožička nenájdená"}
```

---

## Bug #30: No Encoding Specified in File I/O
**File:** app.py
**Lines:** 20, 26
**Severity:** Medium
**Type:** Error Handling
**Description:** `open(DB_FILE, "r")` and `open(DB_FILE, "w")` do not specify an encoding parameter. On Windows, the default encoding may be `cp1250` or `cp1252` instead of UTF-8. Since the application uses Slovak names and characters (e.g., "Ján Novák", "Hašek"), this can cause `UnicodeDecodeError` or data corruption when the JSON file is read back on a system with a different default encoding.
**Reproduction:** Save a member with name "Ján Novák" on a UTF-8 system, then read the JSON on a Windows system with default `cp1252` encoding, or vice versa.
**Proposed Fix:**
```python
def load_database():
    if os.path.exists(DB_FILE):
        with open(DB_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return {"books": [], "members": [], "loans": []}

def save_database(db):
    with open(DB_FILE, "w", encoding="utf-8") as f:
        json.dump(db, f, ensure_ascii=False, indent=2)
```

---

## Bug #31: No Error Handling for Corrupt JSON in `load_database`
**File:** app.py
**Line:** 21
**Severity:** Medium
**Type:** Error Handling
**Description:** `json.load(f)` is called without a `try/except`. If the JSON file is corrupted (e.g., truncated write, manual edit error, disk failure), the application crashes with `json.JSONDecodeError` on startup with no recovery path. The user loses access to all data.
**Reproduction:** Write `{"books": [{"id": 1, ` (truncated JSON) into `library_db.json`, then call `load_database()`.
**Proposed Fix:**
```python
def load_database():
    if os.path.exists(DB_FILE):
        try:
            with open(DB_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except json.JSONDecodeError:
            backup = DB_FILE + ".corrupt"
            os.rename(DB_FILE, backup)
            print(f"VAROVANIE: Databaza bola poskodena. Zaloha: {backup}")
    return {"books": [], "members": [], "loans": []}
```

---

## Bug #32: `loans_count` Field Never Updated
**File:** app.py
**Line:** 181
**Severity:** Medium
**Type:** Logic
**Description:** The member record includes a `"loans_count": 0` field, but no function ever increments it. `borrow_book()` creates a loan record in `db["loans"]` but never touches `member["loans_count"]`. The field is permanently stale at 0 for all members, providing incorrect data to any consumer that reads it.
**Reproduction:** Register a member, borrow 5 books, inspect `member["loans_count"]` -- still 0.
**Proposed Fix:**
```python
# In borrow_book(), after creating the loan:
member["loans_count"] += 1
```
Or remove the field entirely and compute it dynamically:
```python
def get_member_loan_count(member_id, db):
    return sum(1 for l in db["loans"] if l["member_id"] == member_id)
```

---

## Bug #33: No Guard Against Negative Copies in `update_book_copies`
**File:** app.py
**Line:** 243
**Severity:** Medium
**Type:** Error Handling
**Description:** `update_book_copies` adds `delta` to `book["copies"]` without checking if the result goes negative. Calling `update_book_copies(1, -100, db)` on a book with 3 copies sets copies to -97. Negative copy counts are nonsensical and will corrupt downstream logic.
**Reproduction:** `update_book_copies(1, -100, db)` -- `book["copies"]` becomes -97.
**Proposed Fix:**
```python
def update_book_copies(book_id, delta, db):
    for book in db["books"]:
        if book["id"] == book_id:
            new_copies = book["copies"] + delta
            if new_copies < 0:
                return False
            book["copies"] = new_copies
            return True
    return False
```

---

## Bug #34: CSV Export Has No Field Escaping
**File:** app.py
**Line:** 220
**Severity:** Medium
**Type:** Error Handling
**Description:** `export_overdue_loans` writes comma-separated values, but member names containing commas (e.g., "Novak, Jan") are not quoted or escaped. This produces malformed CSV that any parser will misinterpret, splitting the name across two columns.
**Reproduction:** Register a member with name "Novak, Jan", create an overdue loan, run `export_overdue_loans`. The output line has 4 fields instead of 3.
**Proposed Fix:**
```python
import csv

with open(output_file, "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["loan_id", "member", "fine"])
    for item in overdue:
        writer.writerow([item["loan_id"], item["member"], f"{item['fine']:.2f}"])
```

---

## Bug #35: Floating-Point Precision in Fine Calculation
**File:** app.py
**Lines:** 116, 214, 220
**Severity:** Medium
**Type:** Logic
**Description:** Fines are computed as `days * 0.10` using float arithmetic. This produces precision errors: `3 * 0.10` evaluates to `0.30000000000000004`, not `0.30`. These artifacts propagate into the exported file and returned results. Financial calculations should use `Decimal` or `round()`.
**Reproduction:** Return a book 3 days late. `fine` is `0.30000000000000004` instead of `0.30`.
**Proposed Fix:**
```python
from decimal import Decimal

FINE_PER_DAY = Decimal("0.10")

# In return_book:
fine = max(0, days_late) * FINE_PER_DAY  # Decimal arithmetic is exact

# Or at minimum:
fine = round(max(0, days_late) * FINE_PER_DAY, 2)
```

---

## Bug #36: Empty Search Query Matches All Books
**File:** app.py
**Line:** 56
**Severity:** Low
**Type:** Logic
**Description:** `search_books("", db)` returns every book in the database because `"" in "any string"` evaluates to `True` in Python. An empty query should return an empty list or be explicitly handled as a "list all" operation.
**Reproduction:** `search_books("", db)` -- returns all books.
**Proposed Fix:**
```python
def search_books(query, db):
    if not query or not query.strip():
        return []
    # ... rest of function
```

---

## Bug #37: Member Lookup Loop in `borrow_book` Does Not `break`
**File:** app.py
**Lines:** 64-66
**Severity:** Low
**Type:** Performance
**Description:** The loop that finds a member by ID iterates through ALL members even after a match is found, because there is no `break` statement. With 10,000 members, every borrow operation scans the entire list. Additionally, if duplicate IDs exist (due to Bug #9), this returns the LAST match instead of the first, which is inconsistent with the book lookup loop (line 74-76) that does `break`.
**Reproduction:** With a large member list, profile `borrow_book` -- the member search is always O(n).
**Proposed Fix:**
```python
member = None
for m in db["members"]:
    if m["id"] == member_id:
        member = m
        break
```

---

## Bug #38: No Validation for Negative/Zero Page in `paginate`
**File:** app.py
**Line:** 234
**Severity:** Low
**Type:** Error Handling
**Description:** `paginate` does not validate the `page` parameter. A negative page number (e.g., -1) produces `start = -10`, which in Python slicing returns the last 10 items -- completely wrong results silently returned.
**Reproduction:** `paginate(list(range(100)), -1, 10)` returns `[90, 91, ..., 99]` -- the last page instead of an error.
**Proposed Fix:**
```python
def paginate(items, page, page_size=10):
    if page < 1:
        raise ValueError("Page number must be >= 1")
    if page_size < 1:
        raise ValueError("Page size must be >= 1")
    start = (page - 1) * page_size
    end = start + page_size
    return items[start:end]
```

---

## Bug #39: `id` Parameter Shadows Python Built-in
**File:** models.py
**Lines:** 6, 33, 55
**Severity:** Low
**Type:** Python Antipattern
**Description:** All three model classes (`Book`, `Member`, `Loan`) use `id` as a constructor parameter and instance attribute. This shadows Python's built-in `id()` function. While rarely called explicitly, it can cause subtle bugs in debugging or metaprogramming code that relies on `id()` to get an object's memory address.
**Reproduction:** Inside any method of these classes, `id(some_object)` would return `self.id` (an int) instead of calling the built-in.
**Proposed Fix:**
```python
class Book:
    def __init__(self, book_id, title, author, isbn, copies):
        self.book_id = book_id
        # ... rest of attributes
```
Or, if backward compatibility is needed, keep `self.id` but rename the parameter:
```python
def __init__(self, id_, title, author, isbn, copies):
    self.id = id_
```

---

## Bug #40: Missing `__eq__` and `__hash__` on Model Classes
**File:** models.py
**Lines:** 5, 32, 54
**Severity:** Low
**Type:** Python Antipattern
**Description:** None of the model classes define `__eq__` or `__hash__`. Two `Book` objects with identical attributes are not considered equal (`Book(1,"T","A","I",3) == Book(1,"T","A","I",3)` is `False`). Objects cannot be meaningfully used in sets or as dictionary keys. This makes deduplication, comparison, and testing unreliable.
**Reproduction:** `Book(1,"T","A","I",3) == Book(1,"T","A","I",3)` returns `False`.
**Proposed Fix:**
```python
class Book:
    def __eq__(self, other):
        if not isinstance(other, Book):
            return NotImplemented
        return self.isbn == other.isbn

    def __hash__(self):
        return hash(self.isbn)
```

---

# Summary Table

| #  | Title                                            | File      | Line(s)    | Severity | Type              |
|----|--------------------------------------------------|-----------|------------|----------|-------------------|
| 1  | Hardcoded Admin Password with Weak MD5 Hash      | app.py    | 15         | Critical | Security          |
| 2  | Missing None Check on Member Lookup              | app.py    | 69         | Critical | Null Pointer      |
| 3  | Division by Zero in Statistics                   | app.py    | 145        | Critical | Error Handling    |
| 4  | IndexError in get_book_by_id                     | app.py    | 228        | Critical | Error Handling    |
| 5  | Incorrect timedelta Positional Argument          | app.py    | 89         | High     | Logic             |
| 6  | Fines Charged for Early Returns                  | app.py    | 116        | High     | Logic             |
| 7  | Mutable Default Argument db=[]                   | app.py    | 30         | High     | Python Antipattern|
| 8  | Duplicate Emails Allowed in Registration         | app.py    | 171-173    | High     | Logic             |
| 9  | Non-Unique ID Generation                         | app.py    | 38,92,176  | High     | Logic             |
| 10 | available Not Updated on Copy Change             | app.py    | 239-245    | High     | Logic             |
| 11 | Case-Sensitive Book Search                       | app.py    | 55-57      | Medium   | Logic             |
| 12 | No Email Format Validation                       | app.py/models.py | 169/36 | Medium | Error Handling  |
| 13 | Off-by-One in Pagination                         | app.py    | 234-236    | Medium   | Logic             |
| 14 | Unsorted Member History                          | app.py    | 129-136    | Medium   | Logic             |
| 15 | File Handle Not Safely Closed                    | app.py    | 218-221    | Medium   | Error Handling    |
| 16 | O(n2) Member Lookup in Overdue Export            | app.py    | 204-208    | Medium   | Performance       |
| 17 | == Used Instead of is for Boolean                | app.py    | 69         | Medium   | Python Antipattern|
| 18 | Model Classes Never Used by app.py               | models.py | 29         | Medium   | Logic             |
| 19 | available Not Validated in Book Model            | models.py | 12         | Medium   | Logic             |
| 20 | is_overdue() Compares Date with String           | models.py | 67-68      | Medium   | Logic             |
| 21 | Loan.return_date Never Set                       | models.py | 62         | Low      | Logic             |
| 22 | get_fine_total() Sums Paid and Unpaid Fines      | models.py | 47-50      | Low      | Logic             |
| 23 | Hardcoded Borrow Limit                           | models.py | 41         | Low      | Logic             |
| 24 | Missing __repr__ on Book Class                   | models.py | 25         | Low      | Python Antipattern|
| 25 | import datetime Inside Method Body               | models.py | 65         | Low      | Python Antipattern|
| 26 | No Borrow Limit Check in borrow_book             | app.py    | 61-100     | Medium   | Logic             |
| 27 | JSON Database Has No File Locking                | app.py    | 18-27      | Medium   | Error Handling    |
| 28 | add_book ISBN-Match Doesnt Update available      | app.py    | 35         | High     | Logic             |
| 29 | return_book Partial State Mutation on Failure    | app.py    | 110-124    | High     | Error Handling    |
| 30 | No Encoding Specified in File I/O                | app.py    | 20, 26     | Medium   | Error Handling    |
| 31 | No Error Handling for Corrupt JSON               | app.py    | 21         | Medium   | Error Handling    |
| 32 | loans_count Field Never Updated                  | app.py    | 181        | Medium   | Logic             |
| 33 | No Guard Against Negative Copies                 | app.py    | 243        | Medium   | Error Handling    |
| 34 | CSV Export Has No Field Escaping                 | app.py    | 220        | Medium   | Error Handling    |
| 35 | Floating-Point Precision in Fine Calculation     | app.py    | 116,214,220| Medium   | Logic             |
| 36 | Empty Search Query Matches All Books             | app.py    | 56         | Low      | Logic             |
| 37 | Member Lookup Loop Does Not break                | app.py    | 64-66      | Low      | Performance       |
| 38 | No Validation for Negative Page in paginate      | app.py    | 234        | Low      | Error Handling    |
| 39 | id Parameter Shadows Python Built-in             | models.py | 6, 33, 55  | Low      | Python Antipattern|
| 40 | Missing __eq__/__hash__ on Model Classes         | models.py | 5, 32, 54  | Low      | Python Antipattern|

## Statistics
- **Total bugs: 40**
- **Critical: 4** | **High: 8** | **Medium: 17** | **Low: 11**
