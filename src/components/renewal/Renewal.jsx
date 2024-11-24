// import { useState } from "react";
// import "./Renewal.css";

// // Assuming the reserved function is imported or available globally.
// // import { checkBookReservation } from "./ReservationPage"; // Import the function from the other page.

// const Renewal = () => {
//   const API_URL = import.meta.env.VITE_BACKEND_URL;
//   const [customerId, setCustomerId] = useState("");
//   const [borrowedBooks, setBorrowedBooks] = useState([]);
//   const [selectedBookIds, setSelectedBookIds] = useState([]);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [validCard, setValidCard] = useState(false);
//   const [cancelVisible, setCancelVisible] = useState(false); // State to show cancel button

//   const instructions = [
//     "Enter a valid Customer Id.",
//     "Select the books you wish to renew from the list.",
//     "Click on Renew Book to extend due date (2 weeks) for selected books.",
//     "Books can only be renewed up to 3 times. If a book is on the reservation list, it cannot be renewed.",
//     "Upon successful renewal, the due date of each book will be extended 2 weeks and a confirmation message will appear."
//   ];

//   const fetchBorrowedBooks = async () => {
//     setLoading(true);
//     setMessage("");
//     setCancelVisible(true); // Show cancel button after clicking "View Borrowed Books"

//     try {
//       const response = await fetch(`${API_URL}/api/borrowed_books/${customerId}/`, {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//       });
//       const data = await response.json();
//       if (data.status === "success") {
//         const booksWithReservationStatus = await Promise.all(
//           data.books.map(async (book) => {
//             const isReserved = await checkBookReservation(book.book_id);
//             return { ...book, reserved: isReserved };
//           })
//         );
//         setBorrowedBooks(booksWithReservationStatus);
//         setValidCard(true);
//       } else {
//         setValidCard(false);
//         setMessage(data.message || "Unable to fetch borrowed books.");
//       }
//     } catch (error) {
//       setMessage("Error connecting to server.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     // Reset all relevant states to initial values
//     setCustomerId("");
//     setBorrowedBooks([]);
//     setSelectedBookIds([]);
//     setMessage("");
//     setValidCard(false);
//     setCancelVisible(false); // Hide cancel button
//   };

//   const handleBookSelection = (bookId) => {
//     setSelectedBookIds((prevSelected) =>
//       prevSelected.includes(bookId)
//         ? prevSelected.filter((id) => id !== bookId)
//         : [...prevSelected, bookId]
//     );
//   };

//   return (
//     <div className="renewal-container">
//       <h2 style={{ textAlign: "center", color: "#333" }}>Book Renewal</h2>
//       <div className="instructions">
//         <h3>Instructions for Testing the Renewal Feature:</h3>
//         <ul style={{ listStyleType: "decimal", paddingLeft: "20px" }}>
//           {instructions.map((instruction, index) => (
//             <li key={index} style={{ marginBottom: "10px" }}>{instruction}</li>
//           ))}
//         </ul>
//       </div>
//       <div className="input-group">
//         <label htmlFor="customerId">Customer ID:</label>
//         <input
//           id="customerId"
//           type="text"
//           value={customerId}
//           onChange={(e) => setCustomerId(e.target.value)}
//           disabled={loading}
//           style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
//         />
//         <button
//           onClick={fetchBorrowedBooks}
//           disabled={loading || !customerId}
//           style={{ padding: "10px 20px", backgroundColor: "#3f51b5", color: "white", border: "none", borderRadius: "5px" }}
//         >
//           View Borrowed Books
//         </button>
//         {cancelVisible && (
//           <button
//             onClick={handleCancel}
//             style={{ padding: "10px 20px", marginLeft: "10px", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "5px" }}
//           >
//             Cancel Transaction
//           </button>
//         )}
//       </div>
//       {borrowedBooks.length > 0 && validCard && (
//         <div className="borrowed-books">
//           <h3>Borrowed Books:</h3>
//           <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
//             {borrowedBooks.map((book) => (
//               <li key={book.book_id} style={{ marginBottom: "10px" }}>
//                 <label>
//                   <input
//                     type="checkbox"
//                     name="book"
//                     value={book.book_id}
//                     checked={selectedBookIds.includes(book.book_id)}
//                     onChange={() => handleBookSelection(book.book_id)}
//                     disabled={book.renewal_count >= 3 || book.reserved} 
//                   />
//                   {` Book ID: ${book.book_id}, Title: ${book.title}, Due Date: ${book.due_date}, Renewals: ${book.renewal_count}/3`}
//                   {book.renewal_count >= 3 && (
//                     <span style={{ color: "red", marginLeft: "10px" }}>Renewal Limit Reached</span>
//                   )}
//                   {book.reserved && (
//                     <span style={{ color: "red", marginLeft: "10px" }}>Reserved</span>
//                   )}
//                 </label>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//       {message && (
//         <div style={{ marginTop: "20px", whiteSpace: "pre-line", color: message.includes("Error") ? "red" : "green" }}>
//           {message}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Renewal;





// import { useState} from "react";
// import "./Renewal.css";

// // // Assuming the reserved function is imported or available globally.
// // import { checkBookReservation } from "./ReservationPage"; // Import the function from the other page.

// const Renewal = () => {
//   const API_URL = import.meta.env.VITE_BACKEND_URL;
//   const [customerId, setCustomerId] = useState("");
//   const [borrowedBooks, setBorrowedBooks] = useState([]);
//   const [selectedBookIds, setSelectedBookIds] = useState([]);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [validCard, setValidCard] = useState(false);
//   const [customerIdError, setCustomerIdError] = useState(""); // New state for invalid ID error
//   const [noBooksSelectedWarning, setNoBooksSelectedWarning] = useState(""); // New state for no books selected warning
//   const [cancelVisible, setCancelVisible] = useState(false); // State to show cancel button

  

//   const instructions = [
//     "Enter a valid Customer Id.",
//     "Select the books you wish to renew from the list.",
//     "Click on Renew Book to extend due date (2 weeks) for selected books.",
//     "Books can only be renewed up to 3 times. If a book is on the reservation list, it cannot be renewed.",
//     "Upon successful renewal, the due date of each book will be extended 2 weeks and a confirmation message will appear."
//   ];

//   const fetchBorrowedBooks = async () => {
//     if (!/^\d+$/.test(customerId)) {  // Check if customerId contains only numbers
//       setCustomerIdError("Customer ID must be a numeric value.");
//       setMessage("");
//       setBorrowedBooks([]);
//       setValidCard(false);
//       setCancelVisible(false);
//       return;
//     }

//     setLoading(true);
//     setMessage("");
//     setCustomerIdError(""); // Reset error message
//     setCancelVisible(true); // Show cancel button

//     try {
//       const response = await fetch(`${API_URL}/api/borrowed_books/${customerId}/`, {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//       });
//       const data = await response.json();
//       if (data.status === "success") {
//         const booksWithReservationStatus = await Promise.all(
//           data.books.map(async (book) => {
//             const isReserved = await checkBookReservation(book.book_id); // Check reservation status
//             return { ...book, reserved: isReserved };
//           })
//         );
//         setBorrowedBooks(booksWithReservationStatus);
//         setValidCard(true);
//         setMessage("");
//       } else {
//         setValidCard(false);
//         setMessage(data.message || "Unable to fetch borrowed books.");
//       }
//     } catch (error) {
//       setMessage("Error connecting to server.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRenewBook = async () => {
//     if (selectedBookIds.length === 0) {
//       setNoBooksSelectedWarning("No books selected, please select one or cancel.");
//       return;
//     }
    
//     const booksToRenew = selectedBookIds.filter(
//       (bookId) => borrowedBooks.find((book) => book.book_id === bookId && book.renewal_count < 3 && !book.reserved)
//     );
  
//     if (booksToRenew.length === 0) {
//       setMessage("Please select at least one eligible book (not reserved and under 3 renewals) to renew.");
//       return;
//     }
  
//     setLoading(true);
//     setMessage("");
//     setNoBooksSelectedWarning(""); // Reset warning message
  
//     try {
//       const response = await fetch(`${API_URL}/api/renew_books/${customerId}/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ book_ids: booksToRenew }),
//       });
//       const data = await response.json();
      
//       if (data.status === "success") {
//         setMessage("Books renewed successfully! Here are the new due dates:");
        
//         // Update borrowedBooks with new due dates and increment renewal count
//         setBorrowedBooks((prevBooks) =>
//           prevBooks.map((book) =>
//             data.renewed_books[book.book_id]
//               ? { ...book, due_date: data.renewed_books[book.book_id].new_due_date, renewal_count: book.renewal_count + 1 }
//               : book
//           )
//         );
  
//         // Reset selected books
//         setSelectedBookIds([]);
//       } else {
//         setMessage(data.message || "Some books could not be renewed.");
//       }
//     } catch (error) {
//       setMessage("Error renewing books.");
//     } finally {
//       setLoading(false);
      
//     }
//   };
  

//   const handleBookSelection = (bookId) => {
//     setSelectedBookIds((prevSelected) =>
//       prevSelected.includes(bookId)
//         ? prevSelected.filter((id) => id !== bookId)
//         : [...prevSelected, bookId]
//     );
//   };

//   const handleCancel = () => {
//     setCustomerId("");
//     setBorrowedBooks([]);
//     setSelectedBookIds([]);
//     setMessage("");
//     setValidCard(false);
//     setCustomerIdError("");
//     setNoBooksSelectedWarning("");
//     setCancelVisible(false); // Hide cancel button
//   };

//   return (
//     <div className="renewal-container">
//       <h2 style={{ textAlign: "center", color: "#333" }}>Book Renewal</h2>
//       <div className="instructions">
//         <h3>Instructions for Testing the Renewal Feature:</h3>
//         <ul style={{ listStyleType: "decimal", paddingLeft: "20px" }}>
//           {instructions.map((instruction, index) => (
//             <li key={index} style={{ marginBottom: "10px" }}>{instruction}</li>
//           ))}
//         </ul>
//       </div>
//       <div className="input-group">
//         <label htmlFor="customerId">Customer ID:</label>
//         <input
//           id="customerId"
//           type="text"
//           value={customerId}
//           onChange={(e) => setCustomerId(e.target.value)}
//           disabled={loading}
//           style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
//         />
//         <button
//           onClick={fetchBorrowedBooks}
//           disabled={loading || !customerId}
//           style={{ padding: "10px 20px", backgroundColor: "#3f51b5", color: "white", border: "none", borderRadius: "5px" }}
//         >
//           View Borrowed Books
//         </button>
//         {cancelVisible && (
//           <button
//             onClick={handleCancel}
//             style={{ padding: "10px 20px", marginLeft: "10px", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "5px" }}
//           >
//             Cancel
//           </button>
//         )}
//         {customerIdError && <div style={{ color: "red", marginTop: "10px" }}>{customerIdError}</div>}
//       </div>
//       {borrowedBooks.length > 0 && validCard && (
//         <div className="borrowed-books">
//           <h3>Borrowed Books:</h3>
//           <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
//             {borrowedBooks.map((book) => (
//               <li key={book.book_id} style={{ marginBottom: "10px" }}>
//                 <label>
//                   <input
//                     type="checkbox"
//                     name="book"
//                     value={book.book_id}
//                     checked={selectedBookIds.includes(book.book_id)}
//                     onChange={() => handleBookSelection(book.book_id)}
//                     disabled={book.renewal_count >= 3 || book.reserved} 
//                   />
//                   {` Book ID: ${book.book_id}, Title: ${book.title}, Due Date: ${book.due_date}, Renewals: ${book.renewal_count}/3`}
//                   {book.renewal_count >= 3 && (
//                     <span style={{ color: "red", marginLeft: "10px" }}>Renewal Limit Reached</span>
//                   )}
//                   {book.reserved && (
//                     <span style={{ color: "red", marginLeft: "10px" }}>Reserved</span>
//                   )}
//                 </label>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//       <button
//         onClick={handleRenewBook}
//         disabled={loading || selectedBookIds.length === 0}
//         style={{ padding: "10px 20px", backgroundColor: "#4caf50", color: "white", border: "none", borderRadius: "5px" }}
//       >
//         Renew Selected Books
//       </button>
//       <div style={{ color: "green", marginTop: "10px" }}>{message}</div>
//       <div style={{ color: "red", marginTop: "10px" }}>{noBooksSelectedWarning}</div>
//     </div>
//   );
// };

// export default Renewal;


import { useState } from "react";
import "./Renewal.css";

// Mock data for testing
const mockCustomerData = {
  "12345": {
    borrowedBooks: [
      { book_id: 1, title: "Book A", due_date: "2024-12-01", renewal_count: 2, reserved: false },
      { book_id: 2, title: "Book B", due_date: "2024-12-03", renewal_count: 1, reserved: true },
      { book_id: 3, title: "Book C", due_date: "2024-12-05", renewal_count: 0, reserved: false },
    ],
  },
  "67890": {
    borrowedBooks: [
      { book_id: 4, title: "Book D", due_date: "2024-12-10", renewal_count: 1, reserved: false },
      { book_id: 5, title: "Book E", due_date: "2024-12-15", renewal_count: 3, reserved: false },
    ],
  },
};

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
  const [cancelVisible, setCancelVisible] = useState(false);

  const instructions = [
    "Enter a valid Customer Id.",
    "Select the books you wish to renew from the list.",
    "Click on Renew Book to extend due date (2 weeks) for selected books.",
    "Books can only be renewed up to 3 times. If a book is on the reservation list, it cannot be renewed.",
    "Upon successful renewal, the due date of each book will be extended 2 weeks and a confirmation message will appear."
  ];

  const fetchBorrowedBooks = () => {
    // Mock fetch for testing
    if (!/^\d+$/.test(customerId)) {
      setCustomerIdError("Customer ID must be a numeric value.");
      setMessage("");
      setBorrowedBooks([]);
      setValidCard(false);
      setCancelVisible(false);
      return;
    }

    setLoading(true);
    setMessage("");
    setCustomerIdError("");
    setCancelVisible(true);

    // Simulate fetching borrowed books based on customer ID
    const customerData = mockCustomerData[customerId];

    if (customerData) {
      setBorrowedBooks(customerData.borrowedBooks);
      setValidCard(true);
      setMessage("");
    } else {
      setValidCard(false);
      setMessage("Customer ID not found.");
    }

    setLoading(false);
  };

  const handleRenewBook = async () => {
    if (selectedBookIds.length === 0) {
      setNoBooksSelectedWarning("No books selected, please select one or cancel.");
      return;
    }

    const booksToRenew = selectedBookIds.filter(
      (bookId) =>
        borrowedBooks.find(
          (book) => book.book_id === bookId && book.renewal_count < 3 && !book.reserved
        )
    );

    if (booksToRenew.length === 0) {
      setMessage("Please select at least one eligible book (not reserved and under 3 renewals) to renew.");
      return;
    }

    setLoading(true);
    setMessage("");
    setNoBooksSelectedWarning("");

    // Simulate the renewal process (mock API call)
    setTimeout(() => {
      const updatedBooks = borrowedBooks.map((book) => {
        if (booksToRenew.includes(book.book_id)) {
          return { ...book, due_date: "2024-12-19", renewal_count: book.renewal_count + 1 };
        }
        return book;
      });

      setBorrowedBooks(updatedBooks);
      setSelectedBookIds([]);
      setMessage("Books renewed successfully! New due dates updated.");
      setLoading(false);
    }, 1000);
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
    setCancelVisible(false);
  };

  return (
    <div className="renewal-container">
      <h2 style={{ textAlign: "center", color: "#333" }}>Book Renewal</h2>
      <div className="instructions">
        <h3>Instructions for Testing the Renewal Feature:</h3>
        <ul style={{ listStyleType: "decimal", paddingLeft: "20px" }}>
          {instructions.map((instruction, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>{instruction}</li>
          ))}
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
          style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
        />
        <button
          onClick={fetchBorrowedBooks}
          disabled={loading || !customerId}
          style={{ padding: "10px 20px", backgroundColor: "#3f51b5", color: "white", border: "none", borderRadius: "5px" }}
        >
          View Borrowed Books
        </button>
        {cancelVisible && (
          <button
            onClick={handleCancel}
            style={{ padding: "10px 20px", marginLeft: "10px", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "5px" }}
          >
            Cancel
          </button>
        )}
        {customerIdError && <div style={{ color: "red", marginTop: "10px" }}>{customerIdError}</div>}
      </div>
      {borrowedBooks.length > 0 && validCard && (
        <div className="borrowed-books">
          <h3>Borrowed Books:</h3>
          <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
            {borrowedBooks.map((book) => (
              <li key={book.book_id} style={{ marginBottom: "10px" }}>
                <label>
                  <input
                    type="checkbox"
                    name="book"
                    value={book.book_id}
                    checked={selectedBookIds.includes(book.book_id)}
                    onChange={() => handleBookSelection(book.book_id)}
                    disabled={book.renewal_count >= 3 || book.reserved}
                  />
                  {` Book ID: ${book.book_id}, Title: ${book.title}, Due Date: ${book.due_date}, Renewals: ${book.renewal_count}/3`}
                  {book.renewal_count >= 3 && (
                    <span style={{ color: "red", marginLeft: "10px" }}>Renewal Limit Reached</span>
                  )}
                  {book.reserved && (
                    <span style={{ color: "red", marginLeft: "10px" }}>Reserved</span>
                  )}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        onClick={handleRenewBook}
        disabled={loading || selectedBookIds.length === 0}
        style={{ padding: "10px 20px", backgroundColor: "#4caf50", color: "white", border: "none", borderRadius: "5px" }}
      >
        Renew Selected Books
      </button>
      <div style={{ color: "green", marginTop: "10px" }}>{message}</div>
      <div style={{ color: "red", marginTop: "10px" }}>{noBooksSelectedWarning}</div>
    </div>
  );
};

export default Renewal;
