import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./Checkout.css";



const Checkout = () => {
  const [customerId, setCustomerId] = useState("");
  const [itemIds, setItemIds] = useState(""); // Change itemId to itemIds
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!customerId || !itemIds) {
      setMessage("Please enter both Customer ID and Item IDs");
      return;
    }
    const API_URL = import.meta.env.VITE_BACKEND_URL;


    const itemIdArray = itemIds.split(',').map(id => id.trim()).filter(id => id); // Split and trim item IDs
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/api/check_out/${customerId}/`, // Update the URL to use only customer ID
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ item_ids: itemIdArray }) // Send the item IDs in the request body
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(`${data.message} Due dates: ${data.due_dates.join(', ')}`);
        setCustomerId("");
        setItemIds(""); // Clear the input field for item IDs
      } else {
        setMessage(data.message || "Error checking out the item.");
      }
    } catch (error) {
      setMessage("Error connecting to the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handlePayFines = () => {
    navigate("./ManageFines.jsx"); 
  };

  return (
    <div className="checkout-container">
      <h2>Book Checkout</h2>
      <div className="input-group">
        <label htmlFor="customerId">Customer ID:</label>
        <input
          id="customerId"
          type="text"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          disabled={loading}
        />
      </div>
      <div className="input-group">
        <label htmlFor="itemIds">Item IDs (comma-separated):</label>
        <input
          id="itemIds"
          type="text"
          value={itemIds}
          onChange={(e) => setItemIds(e.target.value)}
          disabled={loading}
        />
      </div>
      <div className="button-group">
        <button 
          onClick={handleCheckout} 
          disabled={loading || !customerId || !itemIds}
        >
          {loading ? "Processing..." : "Checkout"}
        </button>
        <button onClick={handlePayFines} disabled={loading}>
          Manage Fines
        </button>
      </div>
      {message && (
        <div className={`message ${message.includes("Error") || message.includes("Cannot") ? "error" : "success"}`}>
          {message}
        </div>
      )}
    </div>
  );
};
 export default Checkout;