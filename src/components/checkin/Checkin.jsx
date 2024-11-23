import { useState } from "react";
import "./Checkin.css";

const Checkin = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const [itemIds, setItemIds] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [queue, setQueue] = useState([]); // For storing reservation queue

  const handleCheckin = async () => {
    if (!itemIds) {
      setMessage("Item IDs are required.");
      return;
    }

    const itemIdArray = itemIds
      .split(",") // Split the string by commas
      .map((id) => id.trim()) // Remove extra spaces
      .filter((id) => id); // Remove empty values

    if (itemIdArray.length === 0) {
      setMessage("Invalid Item IDs.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/api/check_in/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item_ids: itemIdArray }), // Ensure it's a valid array
      });

      const data = await response.json();
      if (data.status === "success") {
        const checkedInMessages = data.checked_in_items.map((item) => {
          const lateFeeMessage = item.late_fees
            ? `Late fees of $${item.late_fees.toFixed(2)} applied.`
            : "No late fees.";
          return `Item ID ${item.item_id}: ${lateFeeMessage}`;
        });

        setMessage(
          `Check-in successful!\n\n${checkedInMessages.join("\n")}`
        );

        // Process reservation if items are checked in successfully
        await processReservationOnCheckIn(itemIdArray[0]); // Process reservation for the first item

        // Get the reservation queue after check-in
        await getReservationQueue(itemIdArray[0]);
      } else {
        const notFoundItems = data.not_found_items.join(", ");
        setMessage(`Error: Items not found: ${notFoundItems}`);
      }
    } catch (error) {
      setMessage("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  const processReservationOnCheckIn = async (itemId) => {
    try {
      const response = await fetch(`${API_URL}/api/notify_next_customer/${itemId}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data.status === "success") {
        setMessage((prev) => `${prev}\n${data.message}`);
      } else {
        setMessage((prev) => `${prev}\n${data.message}`);
      }
    } catch (error) {
      setMessage("Error processing reservation.");
    }
  };

  const getReservationQueue = async (itemId) => {
    try {
      const response = await fetch(`${API_URL}/api/reservation_status/${itemId}/`, {
        method: "GET",
      });
      const data = await response.json();
      if (data.status === "success") {
        setQueue(data.queue);
      } else {
        setQueue([]);
        setMessage("No active reservations.");
      }
    } catch (error) {
      setMessage("Error retrieving reservation queue.");
    }
  };

  return (
    <div className="checkin-container">
      <h2 style={{ textAlign: "center", color: "#333" }}>Book Check-In</h2>
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
      <button onClick={handleCheckin} disabled={loading || !itemIds}>
        Check In
      </button>
      {message && (
        <div
          style={{
            marginTop: "20px",
            whiteSpace: "pre-line",
            color: message.includes("Error") ? "red" : "green",
          }}
        >
          {message}
        </div>
      )}

    </div>
  );
};

export default Checkin;
