import React, { useState } from "react";
import "./Renewal.css";

const Renewal = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const [customerId, setCustomerId] = useState("");
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [selectedBookIds, setSelectedBookIds] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [validCard, setValidCard] = useState(false);
  const [customerIdError, setCustomerIdError] = useState("");
  const [noBooksSelectedWarning, setNoBooksSelectedWarning] = useState("");

  const fetchBorrowedBooks = async () => {
    if (!/^\d+$/.test(customerId)) {
      setCustomerIdError("Customer ID must be numeric.");
      setMessage("");
      setBorrowedBooks([]);
      setValidCard(false);
      return;
    }

    setLoading(true);
    setCustomerIdError("");
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/api/borrowed_books/${customerId}/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      if (data.status === "success") {
        setBorrowedBooks(data.borrowed_books);
        setValidCard(true);
      } else {
        setValidCard(false);
        setMessage(data.message || "No borrowed books found for this customer ID.");
      }
    } catch (error) {
      setMessage("Error connecting to the server.");
    } finally {
      setLoading(false);
    }
  };

  const handleRenewBook = async () => {
    if (selectedBookIds.length === 0) {
      setNoBooksSelectedWarning("No books selected. Please select at least one.");
      return;
    }

    setLoading(true);
    setMessage("");
    setNoBooksSelectedWarning("");

    try {
      const response = await fetch(`${API_URL}/api/renew_books/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer_id: customerId, book_ids: selectedBookIds }),
      });
      const data = await response.json();

      if (data.status === "success") {
        setMessage("Books successfully renewed!");
        setBorrowedBooks((prevBooks) =>
          prevBooks.map((book) =>
            data.renewed_books.find((renewed) => renewed.book_id === book.book_id)
              ? {
                  ...book,
                  due_date: data.renewed_books.find((renewed) => renewed.book_id === book.book_id).new_due_date,
                  renewal_count: book.renewal_count + 1,
                }
              : book
          )
        );
        setSelectedBookIds([]);
      } else {
        setMessage(data.message || "Some books could not be renewed.");
      }
    } catch (error) {
      setMessage("Error renewing books. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBookSelection = (bookId) => {
    setSelectedBookIds((prevSelected) =>
      prevSelected.includes(bookId)
        ? prevSelected.filter((id) => id !== bookId)
        : [...prevSelected, bookId]
    );
  };

  const handleCancel = () => {
    setCustomerId("");
    setBorrowedBooks([]);
    setSelectedBookIds([]);
    setMessage("");
    setValidCard(false);
    setCustomerIdError("");
    setNoBooksSelectedWarning("");
  };

  return (
    <div className="renewal-container">
      <h2>Book Renewal</h2>
      <div className="instructions">
        <h3>Instructions:</h3>
        <ul>
          <li>Enter a valid Customer ID (numeric).</li>
          <li>Select books to renew from the displayed list.</li>
          <li>Click "Renew Book" to extend due dates by 2 weeks.</li>
          <li>Books can only be renewed up to 3 times and cannot be renewed if reserved.</li>
        </ul>
      </div>
      <div className="input-group">
        <label htmlFor="customerId">Customer ID:</label>
        <input
          id="customerId"
          type="text"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          disabled={loading}
        />
        <div className="button-group">
          <button onClick={fetchBorrowedBooks} disabled={loading || !customerId}>
            View Borrowed Books
          </button>
          {validCard && (
            <button onClick={handleCancel} disabled={loading}>
              Cancel
            </button>
          )}
        </div>
        {customerIdError && <div className="error-message">{customerIdError}</div>}
      </div>
      {borrowedBooks.length > 0 && validCard && (
        <div className="borrowed-books">
          <h3>Borrowed Books:</h3>
          <table>
            <thead>
              <tr>
                <th>Select</th>
                <th>Book ID</th>
                <th>Title</th>
                <th>Due Date</th>
                <th>Renewals</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {borrowedBooks.map((book) => (
                <tr key={book.book_id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedBookIds.includes(book.book_id)}
                      onChange={() => handleBookSelection(book.book_id)}
                      disabled={book.renewal_count >= 3 || book.reserved}
                    />
                  </td>
                  <td>{book.book_id}</td>
                  <td>{book.title}</td>
                  <td>{book.due_date}</td>
                  <td>{book.renewal_count}/3</td>
                  <td>
                    {book.renewal_count >= 3
                      ? "Renewal limit reached"
                      : book.reserved
                      ? "Book is reserved"
                      : "Eligible for renewal"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="button-group">
        <button onClick={handleRenewBook} disabled={loading || selectedBookIds.length === 0}>
          Renew Book
        </button>
      </div>
      {noBooksSelectedWarning && <div className="warning-message">{noBooksSelectedWarning}</div>}
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default Renewal;
