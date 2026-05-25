# KnihaPlus — Technical Documentation

Complete inline/docstring-style documentation for all public functions and classes.

---

## app.py — Functions

### `load_database`
```python
def load_database() -> dict:
    """
    Load the library database from a JSON file on disk.

    Reads the JSON file specified by the module-level DB_FILE constant.
    If the file does not exist, returns a fresh empty database structure.

    Returns:
        A dictionary with keys "books", "members", and "loans",
        each containing a list of record dicts.

    Raises:
        json.JSONDecodeError: If the file exists but contains invalid JSON.
        PermissionError: If the file exists but is not readable.

    Example:
        >>> db = load_database()
        >>> list(db.keys())
        ['books', 'members', 'loans']
    """
```

### `save_database`
```python
def save_database(db: dict) -> None:
    """
    Persist the in-memory database to a JSON file on disk.

    Overwrites the file at DB_FILE with the serialized contents of db.
    No file locking is performed (see Bug #27).

    Args:
        db: The full database dict with keys "books", "members", "loans".

    Returns:
        None.

    Raises:
        TypeError: If db contains non-serializable objects.
        PermissionError: If the file path is not writable.

    Example:
        >>> save_database({"books": [], "members": [], "loans": []})
    """
```

### `add_book`
```python
def add_book(title: str, author: str, isbn: str, copies: int = 1, db: dict = []) -> int:
    """
    Add a new book to the library, or increment copies if the ISBN already exists.

    If a book with the given ISBN is already present, its copy count is
    increased by the copies parameter. Otherwise a new book record is
    created and appended.

    Args:
        title: The full title of the book.
        author: The author's name.
        isbn: The ISBN identifier string (e.g., "978-80-7049-123-4").
        copies: Number of physical copies to add (default 1).
        db: The database dict. WARNING — the default value is a mutable
            list, which is a bug (see Bug #7).

    Returns:
        The integer ID of the added or updated book record.

    Raises:
        TypeError: If db is the default empty list (has no "books" key).

    Example:
        >>> db = load_database()
        >>> add_book("Švejk", "Hašek", "978-80-7049-123-4", 3, db)
        1
    """
```

### `search_books`
```python
def search_books(query: str, db: dict) -> list[dict]:
    """
    Search for books whose title or author contains the query substring.

    Performs a case-sensitive substring match (see Bug #11 — should be
    case-insensitive).

    Args:
        query: The search string to look for in title and author fields.
        db: The database dict.

    Returns:
        A list of book dicts matching the query. May be empty.

    Example:
        >>> search_books("Švejk", db)
        [{"id": 1, "title": "Osudy dobrého vojaka Švejka", ...}]
    """
```

### `borrow_book`
```python
def borrow_book(member_id: int, book_id: int, db: dict) -> dict:
    """
    Create a loan record for a member borrowing a book.

    Validates that the member exists and is active, that the book exists,
    and that at least one copy is available. Decrements the book's
    available count and creates a loan record with a due date of
    MAX_BORROW_DAYS from today.

    Args:
        member_id: The integer ID of the borrowing member.
        book_id: The integer ID of the book to borrow.
        db: The database dict.

    Returns:
        A dict with key "success" (bool). On success, also contains
        "loan_id" (int) and "due_date" (str, ISO format). On failure,
        contains "error" (str) with a description.

    Raises:
        TypeError: If member_id does not match any member (Bug #2 —
            accesses None["active"]).

    Example:
        >>> borrow_book(1, 1, db)
        {"success": True, "loan_id": 1, "due_date": "2026-06-04"}
    """
```

### `return_book`
```python
def return_book(loan_id: int, db: dict) -> dict:
    """
    Process the return of a borrowed book and calculate any overdue fine.

    Marks the loan as returned, calculates the number of days late,
    and computes a fine. WARNING: uses abs() on days_late, so early
    returns are also fined (Bug #6).

    Args:
        loan_id: The integer ID of the loan to return.
        db: The database dict.

    Returns:
        A dict with "success" (bool). On success, also contains
        "fine" (float) and "days_late" (int). On failure, contains
        "error" (str).

    Example:
        >>> return_book(1, db)
        {"success": True, "fine": 0.0, "days_late": 0}
    """
```

### `get_member_history`
```python
def get_member_history(member_id: int, db: dict) -> list[dict]:
    """
    Retrieve all loan records for a given member.

    Returns loans in insertion order, not sorted by date (Bug #14).

    Args:
        member_id: The integer ID of the member.
        db: The database dict.

    Returns:
        A list of loan dicts belonging to the member. May be empty.

    Example:
        >>> get_member_history(1, db)
        [{"id": 1, "member_id": 1, "book_id": 1, ...}]
    """
```

### `calculate_statistics`
```python
def calculate_statistics(db: dict) -> dict:
    """
    Compute aggregate statistics about the library.

    Calculates total counts and the top 5 most-borrowed book IDs.
    WARNING: raises ZeroDivisionError if there are no members (Bug #3).

    Args:
        db: The database dict.

    Returns:
        A dict with keys:
            - "total_books" (int): Number of book records.
            - "total_members" (int): Number of member records.
            - "total_loans" (int): Number of loan records.
            - "avg_loans_per_member" (float): Average loans per member.
            - "top_books" (list[int]): Up to 5 most-borrowed book IDs.

    Raises:
        ZeroDivisionError: If there are zero members.

    Example:
        >>> calculate_statistics(db)
        {"total_books": 10, "total_members": 5, ...}
    """
```

### `register_member`
```python
def register_member(name: str, email: str, db: dict) -> int:
    """
    Register a new library member.

    Creates a new member record with an auto-incremented ID.
    WARNING: does not validate email format (Bug #12) and does not
    prevent duplicate emails (Bug #8).

    Args:
        name: The member's full name.
        email: The member's email address.
        db: The database dict.

    Returns:
        The integer ID of the newly registered member.

    Example:
        >>> register_member("Ján Novák", "jan@example.com", db)
        1
    """
```

### `authenticate_admin`
```python
def authenticate_admin(password: str) -> bool:
    """
    Verify an admin password against the stored MD5 hash.

    WARNING: Uses MD5 hashing with a hardcoded password (Bug #1).
    Not suitable for production use.

    Args:
        password: The plaintext password to verify.

    Returns:
        True if the MD5 hash matches, False otherwise.

    Example:
        >>> authenticate_admin("admin123")
        True
    """
```

### `export_overdue_loans`
```python
def export_overdue_loans(db: dict, output_file: str = "overdue.txt") -> int:
    """
    Export a list of overdue (unreturned, past-due) loans to a text file.

    Each line in the output file contains: loan_id, member_name, fine.

    Args:
        db: The database dict.
        output_file: Path to the output text file (default "overdue.txt").

    Returns:
        The number of overdue loans found and written.

    Raises:
        IOError: If the file cannot be written (handle is not safely
            managed — Bug #15).

    Example:
        >>> export_overdue_loans(db)
        3
    """
```

### `get_book_by_id`
```python
def get_book_by_id(book_id: int, db: dict) -> dict:
    """
    Look up a single book by its ID.

    WARNING: raises IndexError if the book ID does not exist (Bug #4).

    Args:
        book_id: The integer ID of the book.
        db: The database dict.

    Returns:
        The book dict matching the given ID.

    Raises:
        IndexError: If no book matches the ID.

    Example:
        >>> get_book_by_id(1, db)
        {"id": 1, "title": "Švejk", ...}
    """
```

### `paginate`
```python
def paginate(items: list, page: int, page_size: int = 10) -> list:
    """
    Return a page-sized slice of items.

    WARNING: uses 0-indexed page calculation, so page=1 returns the
    second page of results (Bug #13).

    Args:
        items: The full list to paginate.
        page: The page number (currently 0-indexed).
        page_size: Number of items per page (default 10).

    Returns:
        A list slice corresponding to the requested page.

    Example:
        >>> paginate([1,2,3,4,5], page=0, page_size=2)
        [1, 2]
    """
```

### `update_book_copies`
```python
def update_book_copies(book_id: int, delta: int, db: dict) -> bool:
    """
    Adjust the total copy count of a book by a delta value.

    WARNING: only updates "copies", not "available" (Bug #10).

    Args:
        book_id: The integer ID of the book to update.
        delta: The number to add (positive) or subtract (negative)
            from the copy count.
        db: The database dict.

    Returns:
        True if the book was found and updated, False otherwise.

    Example:
        >>> update_book_copies(1, 5, db)
        True
    """
```

---

## models.py — Classes

### `Book`
```python
class Book:
    """
    Represents a book in the library catalogue.

    Attributes:
        id (int): Unique identifier for the book.
        title (str): The book's title.
        author (str): The author's full name.
        isbn (str): The ISBN identifier.
        copies (int): Total number of physical copies owned.
        available (int): Number of copies currently available for borrowing.

    Example:
        >>> book = Book(1, "Švejk", "Hašek", "978-80-123", 3)
        >>> book.is_available()
        True
    """

    def to_dict(self) -> dict:
        """
        Serialize the Book to a plain dictionary.

        Returns:
            A dict with keys: id, title, author, isbn, copies, available.
        """

    def __str__(self) -> str:
        """
        Return a human-readable string representation.

        Returns:
            A string in the format "Title by Author".
        """

    def is_available(self) -> bool:
        """
        Check whether at least one copy is available for borrowing.

        Returns:
            True if available > 0, False otherwise.
        """
```

### `Member`
```python
class Member:
    """
    Represents a registered library member.

    Attributes:
        id (int): Unique member identifier.
        name (str): Full name of the member.
        email (str): Email address (unvalidated — Bug #12).
        active (bool): Whether the member account is active.
        loans (list[dict]): List of loan records associated with this member.

    Example:
        >>> member = Member(1, "Ján Novák", "jan@example.com")
        >>> member.can_borrow()
        True
    """

    def can_borrow(self) -> bool:
        """
        Check if the member is allowed to borrow more books.

        Enforces a hardcoded limit of 5 active (unreturned) loans.

        Returns:
            True if the member has fewer than 5 active loans.
        """

    def get_fine_total(self) -> float:
        """
        Calculate the total fines across all loans.

        WARNING: includes both paid and unpaid fines (Bug #22).

        Returns:
            The sum of all fine amounts as a float.
        """
```

### `Loan`
```python
class Loan:
    """
    Represents a book loan transaction.

    Attributes:
        id (int): Unique loan identifier.
        member_id (int): ID of the borrowing member.
        book_id (int): ID of the borrowed book.
        borrow_date: The date the book was borrowed.
        due_date: The date by which the book must be returned.
        returned (bool): Whether the book has been returned.
        return_date: The actual return date (always None — Bug #21).

    Example:
        >>> loan = Loan(1, 1, 1, date(2026, 5, 1), date(2026, 5, 15))
        >>> loan.is_overdue()
        True
    """

    def is_overdue(self) -> bool:
        """
        Check if this loan is past its due date and not yet returned.

        WARNING: raises TypeError if due_date is a string (Bug #20).

        Returns:
            True if today is past the due date and the book has not
            been returned. False otherwise.

        Raises:
            TypeError: If due_date is a string instead of a date object.
        """
```
