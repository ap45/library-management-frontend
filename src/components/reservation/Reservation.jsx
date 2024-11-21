import {useState} from 'react';
import { Link } from 'react-router-dom';
import './Reservation.css';

const Reservation = () => {
  const [patronID, setPatronID] = useState('');
  const [bookID, setBookID] = useState('');
  const [bookInfo, setBookInfo] = useState(null); 
  const [reservationMessage, setReservationMessage] = useState(''); 
  const [showResetButton, setShowResetButton] = useState(false); 

  //dummy array for testing purposes; remove when API endpoint is connected
  const books = [
    { id: 1, title: 'Book 1', patronID: null },
    { id: 2, title: 'Book 2', patronID: '12345' },
    { id: 3, title: 'Book 3', patronID: null }
  ];

  const handleCheckAvailability = async (e) => {
    e.preventDefault(); 

    // actual method? not sure until i connect with backend 
    // try {
    //   const response = await fetch(`books/bookID`) //replace with API endpoint
    //   const bookData = await response.json(); 

    //   if (!bookData) {
    //     console.error('Book not found', bookID);
    //     throw new Error('Book not found');
    //   } else {
    //     console.log('Found book', bookID);
    //     setBookInfo(bookData); 
    //   }
    // } catch (error) {
    //   console.error('Error fetching book', error); 
    //   alert('Error checking book availability'); 
    // };

    try {
      const book = books.find(book => book.id === parseInt(bookID)); 

      if (!book) {
        console.error('Book not found', bookID);
        throw new Error('Book not found');
      } else {
        console.log('Found book', bookID); 
        setBookInfo(book); 
      }

    } catch (error) {
      console.error('Error', error); 
      alert('Error checking book availability'); 
    }
  };

  const handleReserve = (e) => {
    e.preventDefault(); 

    //conditional will need to use an API call? to check that entered PatronID exists in the database 
    //should have a second check (hidden) that checks the validity of the library card; look at checkout.jsx for the code for this? 
    if (!patronID) {
      setReservationMessage('Please enter a valid Patron ID to reserve.'); 
      return;  
    }

    //implement logic to hanlde reservation with Patron ID (API call)
    //needs to set a flag or something? not sure how to handle this exactly 
    setReservationMessage(`Book ${bookID} has been reserved for Patron ${patronID}`); //update message after reservation
    setShowResetButton(true); 

    setBookID(''); //these reset the form inputs to be blank
    setPatronID('');
  }

  return (
    <div className="reservation-container">
      <h2>Reserve a Book</h2>
      <form onSubmit={handleCheckAvailability}>
        <div className="input-group">
          <label htmlFor="bookID">Book ID: </label>
          <input
            type="number"
            id="bookID"
            value={bookID}
            onChange={(e) => setBookID(e.target.value)}
          />
        </div>
        <br />
        <button type="submit">Check Availability</button>
      </form>
      {bookInfo && (
        <div className="book-info">
          {bookInfo.patronID ? (
            <div>
              <p>This book is currently checked out and is expected to be returned on (placeholder).</p>
              <p>To reserve this book, please enter your Patron ID:</p>
              <form onSubmit={handleReserve}>
                <div className="input-group">
                  <label htmlFor="patronId">Patron ID:</label>
                  <input
                    type="text"
                    id="patronId"
                    value={patronID}
                    onChange={(e) => setPatronID(e.target.value)}
                  />
                </div>
                <br />
                {reservationMessage && <p className="reservation-message">{reservationMessage}</p>}
                <button type="submit">Reserve</button>
              </form>
              {showResetButton && (
                <div>
                  {/* button does not currently work to reload page */}
                  <button onClick={() => window.location.reload()}>Make another Reservation</button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <p>This book is currently available for checkout.</p>
              <button>
                <Link to="/checkout">Checkout Book</Link>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Reservation;