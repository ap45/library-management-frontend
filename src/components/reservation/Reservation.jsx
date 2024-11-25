import { useState } from "react";
import "./Reservation.css";

const Reservation = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const [customerId, setCustomerId] = useState("");
  const [itemId, setItemId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [validCard, setValidCard] = useState(false);
  const [renewCard, setRenewCard] = useState(false);

  const checkLibraryCard = async () => {
    setLoading(true);
    setMessage("");
    setValidCard(false);
    setRenewCard(false);
    try {
      const response = await fetch(`${API_URL}/api/check_library_card/${customerId}/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data.status === "success") {
        if (data.valid_card) {
          setValidCard(true);
          setMessage("Library card is valid. You may proceed with reservation.");
        } else if (data.card_expired) {
          debugger;
          setRenewCard(true);
          setMessage(data.message);
        }
      } else {
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
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data.status === "success") {
        setRenewCard(false);
        setValidCard(true);
        setMessage(data.message || "Library card renewed. Please recheck card status.");
      } else {
        setMessage(data.message || "Error renewing card.");
      }
    } catch (error) {
      setMessage("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  const handleReserve = async () => {
    if (!validCard) {
      setMessage("Please validate your library card before proceeding.");
      return;
    }

    if (!customerId || !itemId) {
      setMessage("Both Customer ID and Item ID are required.");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`${API_URL}/api/reserve_item/${customerId}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item_id: itemId }),
      });
      const data = await response.json();
      if (data.status === "success") {
        setMessage(data.message);
      } else {
        setMessage(data.message || "Error reserving the item.");
      }
    } catch (error) {
      setMessage("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reservation-container">
      <h2 style={{ textAlign: "center", color: "#333" }}>Reserve an Item</h2>
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
      <button onClick={checkLibraryCard} disabled={loading || !customerId} style={{ padding: "10px 20px", marginRight: "10px", backgroundColor: "#3f51b5", color: "white", border: "none", borderRadius: "5px" }}>
        Check Library Card
      </button>
      {renewCard && (
        <button onClick={handleCardRenew} disabled={loading} style={{ padding: "10px 20px", marginRight: "10px", backgroundColor: "#ff9800", color: "white", border: "none", borderRadius: "5px" }}>
          Renew Library Card
        </button>
      )}
      <div className="input-group">
        <label htmlFor="itemId">Item ID:</label>
        <input
          id="itemId"
          type="text"
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
          disabled={loading || !validCard}
        />
      </div>
      <button
        onClick={handleReserve}
        disabled={loading || !customerId || !itemId}
        style={{
          padding: "10px 20px",
          marginRight: "10px",
          backgroundColor: loading || !customerId || !itemId ? "#d3d3d3" : "#4caf50",
          color: loading || !customerId || !itemId ? "#a9a9a9" : "white",
          border: "none",
          borderRadius: "5px",
          cursor: loading || !customerId || !itemId ? "not-allowed" : "pointer",
        }}
      >
        Reserve
      </button>

      {message && (
        <div style={{ marginTop: "20px", color: message.includes("Error") ? "red" : "green" }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Reservation;
