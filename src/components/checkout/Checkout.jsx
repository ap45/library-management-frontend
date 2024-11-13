import { useState } from 'react';
import "./Checkout.css";

const Checkout = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const [customerId, setCustomerId] = useState("");
  const [itemIds, setItemIds] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasFines, setHasFines] = useState(false);
  const [validCard, setValidCard] = useState(false);
  const [renewCard, setRenewCard] = useState(false);
  const [checkoutEnabled, setCheckoutEnabled] = useState(false);

  const instructions = [
    "Enter a valid Customer ID to check the library card status. (you can Try ID's (1-100) for customer and ITEM IDs(1-107) ",
    "Click on 'Check Library Card' to verify if the card is valid or expired.",
    "If the library card is expired, you will be prompted to renew it.",
    "Once renewed, check the library card status again to proceed.",
    "If the library card is valid, enter Item IDs (comma-separated) for checkout.",
    "Click on 'Checkout' to check for any outstanding fines.",
    "If there are outstanding fines, you will be prompted to pay them.",
    "Once fines are cleared and the library card is valid, click 'Checkout' to complete the process.",
    "Upon successful checkout, a message with item IDs and due dates will appear."
  ];

  const checkLibraryCard = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`${API_URL}/api/check_library_card/${customerId}/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const data = await response.json();
      if (data.status === 'success' && data.valid_card) {
        setValidCard(true);
        setMessage(data.message);
      } else {
        setRenewCard(true);
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  const handleCardRenew = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`${API_URL}/api/renew_library_card/${customerId}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      const data = await response.json();
      setRenewCard(false);
      setValidCard(true);
      setMessage(data.message || "Library card renewed.");
    } catch (error) {
      setMessage("Error renewing card.");
    } finally {
      setLoading(false);
    }
  };

  const checkFinesBeforeCheckout = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`${API_URL}/api/check_fines/${customerId}/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const data = await response.json();
      if (data.has_fines) {
        setHasFines(true);
        setCheckoutEnabled(false);
        setMessage(data.message);
      } else {
        setCheckoutEnabled(true);
        setMessage(data.message || "No outstanding fines.You may proceed with checkout.");
      }
    } catch (error) {
      setMessage("Error checking fines.");
    } finally {
      setLoading(false);
    }
  };

  const handlePayFine = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`${API_URL}/api/pay_fines/${customerId}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      const data = await response.json();
      setHasFines(false);
      setCheckoutEnabled(true); // Enable checkout after paying fines
      setMessage(data.message || "Fines paid. You may proceed with checkout.");
    } catch (error) {
      setMessage("Error paying fines.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    if (!customerId || !itemIds) {
      setMessage("Both Customer ID and Item IDs are required.");
      return;
    }

    const itemIdArray = itemIds.split(',').map(id => id.trim()).filter(id => id);
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`${API_URL}/api/check_out/${customerId}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item_ids: itemIdArray })
      });
      const data = await response.json();
      if (data.status === 'success') {
        const checkedOutItems = data.checked_out_items
          .map(item => `Item ID: ${item.item_id}, Due Date: ${item.due_date}`)
          .join('\n');
        setMessage(`Checkout successful!\n${checkedOutItems}`);
        setCustomerId("");
        setItemIds("");
      } else {
        setMessage(data.message || "Error checking out items.");
      }
    } catch (error) {
      setMessage("Error checking out items.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2 style={{ textAlign: "center", color: "#333" }}>Book Checkout</h2>
      <div className="instructions">
        <h3>Instructions for Testing the Checkout Feature:</h3>
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
      </div>
      <div className="input-group">
        <label htmlFor="itemIds">Item IDs (comma-separated):</label>
        <input
          id="itemIds"
          type="text"
          value={itemIds}
          onChange={(e) => setItemIds(e.target.value)}
          disabled={loading}
          style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
        />
      </div>
      <div className="button-group">
        <button onClick={checkLibraryCard} disabled={loading || !customerId} style={{ padding: "10px 20px", marginRight: "10px", backgroundColor: "#3f51b5", color: "white", border: "none", borderRadius: "5px" }}>
          Check Library Card
        </button>
        {renewCard && (
          <button onClick={handleCardRenew} disabled={loading} style={{ padding: "10px 20px", marginRight: "10px", backgroundColor: "#ff9800", color: "white", border: "none", borderRadius: "5px" }}>
            Renew Library Card
          </button>
        )}
        {!hasFines && validCard && !checkoutEnabled && (
          <button onClick={checkFinesBeforeCheckout} disabled={loading || !itemIds} style={{ padding: "10px 20px", marginRight: "10px", backgroundColor: "#4caf50", color: "white", border: "none", borderRadius: "5px" }}>
            Checkout
          </button>
        )}
        {hasFines && (
          <button onClick={handlePayFine} disabled={loading} style={{ padding: "10px 20px", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "5px" }}>
            Pay Fine
          </button>
        )}
        {checkoutEnabled && (
          <button onClick={handleCheckout} disabled={loading} style={{ padding: "10px 20px", backgroundColor: "#4caf50", color: "white", border: "none", borderRadius: "5px" }}>
            Checkout
          </button>
        )}
      </div>
      {message && (
        <div style={{ marginTop: "20px", whiteSpace: "pre-line", color: message.includes("Error") ? "red" : "green" }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Checkout;
