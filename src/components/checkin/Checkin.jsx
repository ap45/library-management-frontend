import { useState } from 'react';
import "./Checkin.css";

const CheckIn = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const [itemIds, setItemIds] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const instructions = [
    "Enter Item IDs (comma-separated) for check-in.",
    "Click on 'Check In' to return the items to the library.",
    "Upon successful check-in, a message with the returned item IDs will appear."
  ];

  const handleCheckIn = async () => {
    if (!itemIds) {
      setMessage("Item IDs are required.");
      return;
    }

    const itemIdArray = itemIds.split(',').map(id => id.trim()).filter(id => id);
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`${API_URL}/api/check_in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item_ids: itemIdArray })
      });
      const data = await response.json();
      if (data.status === 'success') {
        const returnedItems = data.returned_items
          .map(item => `Item ID: ${item.item_id}`)
          .join('\n');
        setMessage(`Check-in successful!\n${returnedItems}`);
        setItemIds("");
      } else {
        setMessage(data.message || "Error checking in items.");
      }
    } catch (error) {
      setMessage("Error connecting to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkin-container">
      <h2 style={{ textAlign: "center", color: "#333" }}>Book Check-In</h2>
      <div className="instructions">
        <h3>Instructions for Testing the Check-In Feature:</h3>
        <ul style={{ listStyleType: "decimal", paddingLeft: "20px" }}>
          {instructions.map((instruction, index) => (
            <li key={index} style={{ marginBottom: "10px" }}>{instruction}</li>
          ))}
        </ul>
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
        <button onClick={handleCheckIn} disabled={loading || !itemIds} style={{ padding: "10px 20px", backgroundColor: "#4caf50", color: "white", border: "none", borderRadius: "5px" }}>
          Check In
        </button>
      </div>
      {message && (
        <div style={{ marginTop: "20px", whiteSpace: "pre-line", color: message.includes("Error") ? "red" : "green" }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Checkin; 