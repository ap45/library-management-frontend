import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
  const [customerId, setCustomerId] = useState("");
  const [itemId, setItemId] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Change anything starting at 21 for backend
  const handleCheckout = async () => {
    try {
      const response = await fetch(`/api/check_out/${customerId}/${itemId}/`, { //Change this im not
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        const error = await response.json();
        setMessage(error.message);
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setMessage("Error checking out the item.");
    }
  };

  // Navigate to the ManageFines page
  const handlePayFines = () => {
    navigate("./ManageFines.jsx"); 
  };

  return (
    <div>
      <h2>Checkout</h2>
      <div>
        <label>Customer ID:</label>
        <input
          type="text"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
      </div>
      <div>
        <label>Item ID:</label>
        <input
          type="text"
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
        />
      </div>
      <button onClick={handleCheckout}>Checkout</button>
      <button onClick={handlePayFines}>Manage Fines</button> 
      {message && <p>{message}</p>}
    </div>
  );
};

export default Checkout;

