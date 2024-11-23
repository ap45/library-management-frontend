import { useState, useEffect } from 'react';
import './Dashboard.css';
import { Button, Dialog, DialogContent, DialogTitle, DialogActions, CircularProgress } from '@mui/material';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const Dashboard = () => {
  const [patrons, setPatrons] = useState([]);
  const [showBookDialog, setShowBookDialog] = useState(false);
  const [showRenewDialog, setShowRenewDialog] = useState(false);
  const [selectedPatron, setSelectedPatron] = useState(null);
  const [loanedBooks, setLoanedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRenewing, setIsRenewing] = useState(false); // Renewal loader

  // Fetch all patrons on component mount
  useEffect(() => {
    setIsLoading(true);
    fetch(`${API_URL}/api/patrons`)
      .then((response) => response.json())
      .then((data) => {
        setPatrons(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching patrons:', error);
        setIsLoading(false);
      });
  }, []);

  const handleViewCheckouts = (patron) => {
    setSelectedPatron(patron);
    setIsLoading(true);

    fetch(`${API_URL}/api/bookcheckouts/${patron.PatronID}`)
      .then((response) => response.json())
      .then((data) => {
        setLoanedBooks(data);
        setShowBookDialog(true);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching checkouts:', error);
        setIsLoading(false);
      });
  };

  const handleCloseBookDialog = () => {
    setShowBookDialog(false);
  };

  const handleViewRenewDialog = (patron) => {
    setSelectedPatron(patron);
    setShowRenewDialog(true);
  };

  const handleCloseRenewDialog = () => {
    setShowRenewDialog(false);
    setSelectedPatron(null);
  };

  const handleRenewCard = () => {
    if (!selectedPatron) return;
    setIsRenewing(true); // Start loader
    fetch(`${API_URL}/api/renew_library_card/${selectedPatron.LibraryCard.CardID}/`, {
      method: 'POST',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to renew card');
        }
        return response.json();
      })
      .then((data) => {
        // Update the patron's library card status
        setPatrons((prevPatrons) =>
          prevPatrons.map((patron) =>
            patron.LibraryCard?.CardID === selectedPatron.LibraryCard.CardID
              ? { ...patron, LibraryCard: { ...patron.LibraryCard, Status: 'Active' } }
              : patron
          )
        );
        setIsRenewing(false);
        setShowRenewDialog(false); // Close dialog
      })
      .catch((error) => {
        console.error('Error renewing card:', error);
        setIsRenewing(false);
      });
  };

  return (
    <div className="dashboard-container">
      <h2>Library Patrons</h2>

      {/* Loader for fetching patrons */}
      {isLoading ? (
        <div className="loader-container">
          <CircularProgress />
          <p>Loading...</p>
        </div>
      ) : (
        <div className="dashboard-table-wrapper">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Zipcode</th>
                <th>Phone Number</th>
                <th>Email Address</th>
                <th>View Checkouts</th>
                <th>Library Card Number</th>
                <th>Card Issue Date</th>
                <th>Card Expiration Date</th>
                <th>Card Status</th>
              </tr>
            </thead>
            <tbody>
              {patrons.map((patron) => (
                <tr key={patron.PatronID}>
                  <td>{patron.PatronID}</td>
                  <td>{patron.PatronFN}</td>
                  <td>{patron.PatronLN}</td>
                  <td>{patron.Street_Address}</td>
                  <td>{patron.City}</td>
                  <td>{patron.State}</td>
                  <td>{patron.Zip_Code}</td>
                  <td>{patron.Phone_Number}</td>
                  <td>{patron.Email_Address}</td>
                  <td>
                    <Button variant="outlined" onClick={() => handleViewCheckouts(patron)}>
                      View
                    </Button>
                  </td>
                  <td>{patron.LibraryCard?.CardID || 'N/A'}</td>
                  <td>{patron.LibraryCard?.IssueDate || 'N/A'}</td>
                  <td>{patron.LibraryCard?.ExpirationDate || 'N/A'}</td>
                  <td>
                    {patron.LibraryCard?.Status === 'Expired' ? (
                      <Button
                        variant="outlined"
                        onClick={() => handleViewRenewDialog(patron)}
                      >
                        Renew
                      </Button>
                    ) : (
                      'Active'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Book Checkout Dialog */}
      <Dialog open={showBookDialog} onClose={handleCloseBookDialog} maxWidth="md" fullWidth>
        <DialogTitle style={{ textAlign: 'center' }}>
          Checked Out Items for: <em>{selectedPatron?.PatronFN} {selectedPatron?.PatronLN}</em>
        </DialogTitle>
        <DialogContent>
          {isLoading ? (
            <div className="loader-container">
              <CircularProgress />
              <p>Loading...</p>
            </div>
          ) : (
            <ul>
              {loanedBooks.length > 0 ? (
                loanedBooks.map((book) => (
                  <li key={book.id}>{book.title} - Due Date: {book.dueDate}</li>
                ))
              ) : (
                <p>No books loaned currently.</p>
              )}
            </ul>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBookDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Renew Library Card Dialog */}
      <Dialog open={showRenewDialog} onClose={handleCloseRenewDialog} maxWidth="xs">
        <DialogTitle style={{ textAlign: 'center' }}>Renew Library Card</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to renew this card?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRenewCard} disabled={isRenewing}>
            {isRenewing ? <CircularProgress size={20} /> : 'Renew'}
          </Button>
          <Button onClick={handleCloseRenewDialog} disabled={isRenewing}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;
