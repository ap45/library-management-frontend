import { useState } from 'react';
import "./Checkout.css";

const Checkout = () => {
  const [customerId, setCustomerId] = useState("");
  const [itemIds, setItemIds] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasFines, setHasFines] = useState(false);
  const [validCard, setValidCard] = useState(false);
  const [renewCard, setRenewCard] = useState(false);

  const checkFinesBeforeCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/check_fines/${customerId}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok && data.has_fines) {
        setHasFines(true);
        setMessage("Please pay outstanding fines in order to proceed with checkout.");
      } else {
        await handleCheckout(); 
      }
    } catch (error) {
      setMessage("Error connecting to the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const checkLibraryCard = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/check_library_card/${customerId}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      const data = await response.json();

      if (response.ok && data.valid_card) {
        setValidCard(true);
        setMessage("Valid library card. Proceed with checkout.");
      } else {
        setValidCard(false);
        setRenewCard(true); 
        setMessage("Invalid library card. Renew library card to proceed with checkout.");
      }
    } catch (error) {
      setMessage("Error connecting to the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCardRenew = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/renew_library_card/${customerId}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Library card was renewed. Checkout can proceed.");
        setValidCard(true);
        setRenewCard(false);
      } else {
        setMessage(data.message || "Error renewing card.");
      }
    } catch (error) {
      setMessage("Error connecting to the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    if (!customerId || !itemIds) {
      setMessage("Please enter both Customer ID and Item IDs.");
      return;
    }
    const API_URL = import.meta.env.VITE_BACKEND_URL;

    const itemIdArray = itemIds.split(',').map(id => id.trim()).filter(id => id);
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/api/check_out/${customerId}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ item_ids: itemIdArray })
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        setMessage(`${data.message} Due dates: ${data.due_dates.join(', ')}`);
        setCustomerId("");
        setItemIds("");
      } else if (response.status === 207) {
        // Handle the partial success (Multi-Status)
        setMessage(`${data.message} Details: ${data.details.join(', ')}`);
      } else {
        setMessage(data.message || "Error checking out the items.");
      }
    } catch (error) {
      setMessage("Error connecting to the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handlePayFine = async () => {
    setLoading(true);
    try {
      const payResponse = await fetch(
        `http://localhost:8000/api/pay_fines/${customerId}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const payData = await payResponse.json();

      if (payResponse.ok) {
        setMessage("Fines paid successfully. Proceeding with checkout.");
        setHasFines(false);
        await handleCheckout();
      } else {
        setMessage(payData.message || "Error paying fines.");
      }
    } catch (error) {
      setMessage("Error connecting to the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelTransaction = () => {
    setMessage("Transaction canceled due to outstanding fines.");
    setHasFines(false);
  };

  return (
    <div className="checkout-container" style={{position: "fixed"}}>
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
        <button onClick={checkLibraryCard} disabled={loading || !customerId}>
          {loading ? "Checking..." : "Check Library Card"}
        </button>
        {!hasFines ? (
          <button 
            onClick={checkFinesBeforeCheckout} 
            disabled={loading || !customerId || !itemIds || !validCard}
          >
            {loading ? "Processing..." : "Checkout"}
          </button>
        ) : (
          <>
            <button onClick={handlePayFine} disabled={loading}>
              Yes, Pay Fine
            </button>
            <button onClick={handleCancelTransaction} disabled={loading}>
              No, Cancel
            </button>
          </>
        )}
        {renewCard && (
          <button onClick={handleCardRenew} disabled={loading}>
            {loading ? "Renewing..." : "Renew Library Card"}
          </button>
        )}
      </div>
      {message && (
        <div className={`message ${message.includes("Error") || message.includes("Invalid") ? "error" : "success"}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Checkout;

