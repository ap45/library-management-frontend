import {useState, useEffect} from 'react';
import './Dashboard.css';
import { Button, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';

const dummyData = [ //remove after api endpoint is connected
    {
      PatronID: 1,
      PatronFN: "John",
      PatronLN: "Doe",
      Street_Address: "123 Main St",
      City: "Anytown",
      State: "CA",
      Zip_Code: "12345",
      Phone_Number: "123-456-7890",
      Email_Address: "johndoe@email.com"
    },
    {
        PatronID: 2, 
        PatronFN: "Jane",
        PatronLN: "Smith",
        Street_Address: "456 Elm St",
        City: "Anytown",
        State: "CA",
        Zip_Code: "54321",
        Phone_Number: "987-654-3210",
        Email_Address: "janesmith@email.com"
    },
    {
        PatronID: 3, 
        PatronFN: "Michael",
        PatronLN: "Johnson",
        Street_Address: "789 Oak St",
        City: "Anytown",
        State: "CA",
        Zip_Code: "54321",
        Phone_Number: "111-222-333",
        Email_Address: "micaheljohnson@email.com"
    },
    {
        PatronID: 4, 
        PatronFN: "Emily",
        PatronLN: "Brown",
        Street_Address: "101 Pine St",
        City: "Anytown",
        State: "CA",
        Zip_Code: "54321",
        Phone_Number: "444-555-6666",
        Email_Address: "emilybrown@email.com"
    },
    {
        PatronID: 5, 
        PatronFN: "David",
        PatronLN: "Davidson",
        Street_Address: "222 Cedar St",
        City: "Anytown",
        State: "CA",
        Zip_Code: "54321",
        Phone_Number: "777-888-9999",
        Email_Address: "daviddavidson@email.com"
    },
    {
        PatronID: 6, 
        PatronFN: "Sophia",
        PatronLN: "Miller",
        Street_Address: "333 Maple St",
        City: "Anytown",
        State: "CA",
        Zip_Code: "54321",
        Phone_Number: "222-333-4444",
        Email_Address: "sophiamiller@email.com"
    },
    {
        PatronID: 7, 
        PatronFN: "James",
        PatronLN: "Wilson",
        Street_Address: "444 Willow St",
        City: "Anytown",
        State: "CA",
        Zip_Code: "54321",
        Phone_Number: "555-666-7898",
        Email_Address: "jameswilson@email.com"
    },
    {
        PatronID: 8, 
        PatronFN: "Olivia",
        PatronLN: "Moore",
        Street_Address: "555 Oak St",
        City: "Anytown",
        State: "CA",
        Zip_Code: "54321",
        Phone_Number: "888-999-0000",
        Email_Address: "oliviamoore@email.com"
    },
    {
        PatronID: 9, 
        PatronFN: "Noah",
        PatronLN: "Taylor",
        Street_Address: "666 Pine St",
        City: "Anytown",
        State: "CA",
        Zip_Code: "54321",
        Phone_Number: "111-222-3333",
        Email_Address: "noahtaylor@email.com"
    },
    {
        PatronID: 10, 
        PatronFN: "Ava",
        PatronLN: "Anderson",
        Street_Address: "777 Cedar St",
        City: "Anytown",
        State: "CA",
        Zip_Code: "54321",
        Phone_Number: "444-555-6666",
        Email_Address: "avaanderson@email.com"
    },
    // Add more dummy data objects as needed
  ];

const Dashboard = () => {
    const [patrons, setPatrons] = useState([]); //ignore associated problem; will go away once endpoint is connected correctly and dummy data is removed
    const [showDialog, setShowDialog] = useState(false);
    const [selectedPatron, setSelectedPatron] = useState(null); 
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/patrons'); //replace with actual API endpoint
            const data = await response.json();
            setPatrons(data); 
        };

        fetchData();
    }, []);

    const handleViewCheckouts = (patron) => {
        setSelectedPatron(patron);
        setShowDialog(true);
    };

    const handleCloseDialog = () => {
        setShowDialog(false);
    }

    return (
        <div className="dashboard-container">
            <table className="table">
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
                    </tr>
                </thead>
                <tbody>
                    {dummyData.map((patron) => ( // replace dummyData.map((patrons)) with patrons.map((patron))
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
                            <Button variant="outlined" className="view-checkout" onClick={() => handleViewCheckouts(patron)}>
                                View
                            </Button>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Dialog open={showDialog} onClose={handleCloseDialog} maxWidth="60%">
                <div style={{backgroundColor: 'white', padding: '20px'}}>
                    <DialogTitle>
                        Checked Out Items for: {selectedPatron?.PatronFN} {selectedPatron?.PatronLN}
                        {/* <IconButton onClick={handleCloseDialog}>
                            <CloseIcon />
                        </IconButton> */} 
                    </DialogTitle>
                    {/*fetch and display checked out items for selected patron*/}
                    <DialogContent>
                        <ul >
                            <li>Book 1</li>
                            <li>Book 2</li>
                            <li>Book 3</li>
                        </ul>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>X</Button>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    );
};

export default Dashboard;