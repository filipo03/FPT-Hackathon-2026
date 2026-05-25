# KnihaPlus

## Overview

KnihaPlus is a library management system written in Python for managing book catalogues, member registrations, borrowing/returning workflows, fine calculations, and basic reporting. It uses a flat JSON file as its persistence layer and is designed for small to medium library operations.

**Current version:** 2.3.1

## Features

- Book catalogue management (add, search, update copies)
- Member registration and account management
- Book borrowing and returning with automatic due-date calculation
- Overdue fine computation based on configurable daily rate
- Member loan history tracking
- Library-wide statistics (totals, averages, top borrowed books)
- Overdue loan export to text files
- Paginated result sets
- Admin authentication
- JSON-based persistent storage

## Installation

**Prerequisites:** Python 3.10 or later (uses `date.fromisoformat`).

```bash
# Clone the repository
git clone https://github.com/your-org/knihaplus.git
cd knihaplus

# No external dependencies are required — stdlib only
python app.py
```

To use the improved security fixes (bcrypt for password hashing):

```bash
pip install bcrypt
```

## Usage

### Quick Start

```python
from app import load_database, save_database, register_member, add_book, borrow_book

db = load_database()

# Register a member
member_id = register_member("Ján Novák", "jan@example.com", db)

# Add a book
book_id = add_book("Osudy dobrého vojaka Švejka", "Jaroslav Hašek", "978-80-7049-123-4", 3, db)

# Borrow a book
result = borrow_book(member_id, book_id, db)
print(result)  # {"success": True, "loan_id": 1, "due_date": "2026-06-04"}

# Save changes
save_database(db)
```

### Searching Books

```python
from app import search_books

results = search_books("Švejk", db)
for book in results:
    print(f"{book['title']} — {book['available']}/{book['copies']} available")
```

### Returning a Book and Calculating Fines

```python
from app import return_book

result = return_book(loan_id=1, db=db)
if result["success"]:
    print(f"Fine: €{result['fine']:.2f}")
```

### Exporting Overdue Loans

```python
from app import export_overdue_loans

count = export_overdue_loans(db, "overdue_report.txt")
print(f"{count} overdue loans exported")
```

## Architecture

```
knihaplus/
├── app.py          # Core application logic — all business functions
│                     (load/save DB, CRUD operations, borrowing, fines,
│                      statistics, admin auth, export)
├── models.py       # Data model classes (Book, Member, Loan)
│                     NOTE: these classes are currently unused by app.py,
│                     which operates on plain dicts instead.
└── library_db.json # Auto-generated JSON database file (created at runtime)
```

**Data flow:** All functions accept a `db` dict parameter that is loaded from and saved to `library_db.json`. The dict has three top-level keys: `"books"`, `"members"`, and `"loans"`, each containing a list of record dictionaries.

## Known Issues

This codebase has **40 identified bugs** from a comprehensive code review. The full details, reproduction steps, and proposed fixes are in `BUG_REPORT.md`.

### Critical (4 bugs)

- **Bug #1** — Hardcoded admin password with weak MD5 hash (Security)
- **Bug #2** — Missing None check on member lookup causes crash (Null Pointer)
- **Bug #3** — Division by zero in statistics when no members exist (Error Handling)
- **Bug #4** — IndexError in `get_book_by_id` for missing books (Error Handling)

### High (8 bugs)

- **Bug #5** — Fragile `timedelta` positional argument
- **Bug #6** — Early returns produce fines due to `abs()` usage
- **Bug #7** — Mutable default argument `db=[]`
- **Bug #8** — Duplicate email addresses allowed
- **Bug #9** — Non-unique ID generation after deletions
- **Bug #10** — Available count not updated when copies change
- **Bug #28** — `add_book` ISBN-match path doesn't update `available`
- **Bug #29** — `return_book` partial state mutation on failure (data corruption risk)

### Medium (17 bugs)

Includes case-sensitive search, missing email validation, off-by-one pagination, O(n²) performance in overdue export, unsafe file handling, unused model classes, no file encoding, corrupt JSON handling, stale `loans_count`, negative copies allowed, CSV escaping, and floating-point fine precision. See `BUG_REPORT.md` for full details.

### Low (11 bugs)

Includes missing `__repr__`, import inside method body, hardcoded limits, unset `return_date`, empty query edge case, missing `break` in loops, negative page validation, shadowed `id` built-in, and missing `__eq__`/`__hash__`. See `BUG_REPORT.md`.

## Contributing

1. **Fork** the repository and create a feature branch.
2. Fix bugs starting with Critical and High severity items from `BUG_REPORT.md`.
3. Add unit tests for every function — none exist currently.
4. Follow PEP 8 style and add Google-style docstrings (see `DOCUMENTATION.md`).
5. Integrate the `models.py` classes into `app.py` or remove them to eliminate dead code.
6. Submit a pull request with a clear description of changes.

### Priority Roadmap

1. Fix all Critical and High severity bugs
2. Add comprehensive unit tests
3. Replace JSON file storage with SQLite or PostgreSQL
4. Integrate the model classes with the application logic
5. Add proper logging and input validation

