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

  // checks if book ID is valid. if valid, updates bookInfo state variable with all data corresponding to book
  // this allows us to check if the patronID is assigned or not, handling the conditional rendering of elements on the page
  // the switch is taken care of by the setup in the return statement
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

      // should have another conditional that checks if the book already has a reservation 
      // fail availability check with 'already reserved, try again later' if book has a reservation

    } catch (error) {
      console.error('Error', error); 
      alert('Error checking book availability'); 
    }
  };

  // checks if the entered patronID exists in the system
  // if yes, allows the book to be reserved
  // if no, should prevent book from being reserved
  const handleReserve = (e) => {
    e.preventDefault(); 

    //conditional will use an API call to check that entered PatronID exists in the database 
    if (!patronID) {
      setReservationMessage('Please enter a valid Patron ID to reserve.'); 
      return;  
    }

    // check validity of library card (not expired) 
    // try {
    //   const response = await fetch(`${API_URL}/api/check_library_card/${patronID}/`, {
    //     method: "GET",
    //     headers: { "Content-Type": "application/json" }
    //   });
    //   const data = await response.json();
  
    //   if (data.status !== 'success' || !data.valid_card) {
    //     setReservationMessage("Your library card is invalid or expired. Please renew your card.");
    //     return;
    //   }
    // } catch (error) {
    //   setReservationMessage("Error checking validity of library card. Please try again later.");
    // }

    // check the number of reservations the patron currently has and prevent new reservation if maximum is reached
    // const response = await fetch(`/patrons/${patronID}/reservations`); //replace with API endpoint
    // const reservationCount = await response.json(); 
    
    // const maxReservations = 2; 

    // if (reservationCount >= maxReservations) {
    //   setReservationMessage(`You have reached the maximum number of allowed reservations (${maxReservations}).`);
    //   return; 
    // }

    //implement logic to handle reservation with Patron ID (API call)
    //needs to set a flag or something? not sure how to handle this exactly 

    // the following go into the conditional that handles placing the reservation on the patron in the DB with an API call
    setReservationMessage(`Book ${bookID} has been reserved for Patron ${patronID}`); //update message after reservation
    setShowResetButton(true); 

    setBookID(''); //these reset the form inputs to be blank
    setPatronID('');
  }

  //conditional rendering of components takes care of checking the availability
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