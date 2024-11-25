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
      .split(",")
      .map((id) => id.trim())
      .filter((id) => id);

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
        body: JSON.stringify({ item_ids: itemIdArray }),
      });

      const data = await response.json();

      if (response.ok) {
        const checkedInMessages = data.checked_in_items.map((item) => {
          const lateFeeMessage = item.late_fees
            ? `Late fees of $${item.late_fees.toFixed(2)} applied.`
            : "No late fees.";
          return `Item ID ${item.item_id}: ${lateFeeMessage}`;
        });

        const notCheckedOutItems = data.not_checked_out_items.join(", ");
        const notFoundItems = data.not_found_items.join(", ");

        let finalMessage = `Check-in summary:\n\n${checkedInMessages.join("\n")}`;

        if (notCheckedOutItems) {
          finalMessage += `\n\nThe Following Item is not by checked out by anyone: ${notCheckedOutItems}`;
        }

        if (notFoundItems) {
          finalMessage += `\n\nItems not found: ${notFoundItems}`;
        }

        setMessage(finalMessage);

        // Process reservation for the first successfully checked-in item
        if (data.checked_in_items.length > 0) {
          await processReservationOnCheckIn(data.checked_in_items[0].item_id);
          await getReservationQueue(data.checked_in_items[0].item_id);
        }
      } else {
        setMessage(`Error: ${data.message}`);
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
      if (response.ok) {
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
      if (response.ok) {
        setQueue(data.queue);
      } else {
        setQueue([]);
        setMessage((prev) => `${prev}\nNo active reservations.`);
      }
    } catch (error) {
      setMessage((prev) => `${prev}\nError retrieving reservation queue.`);
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
