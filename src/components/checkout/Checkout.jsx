import { useState } from 'react';
import './Checkout.css';

const Checkout = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL;
  const [customerId, setCustomerId] = useState('');
  const [itemIds, setItemIds] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState(''); // To set the message color
  const [loading, setLoading] = useState(false);
  const [validCard, setValidCard] = useState(false);
  const [renewCard, setRenewCard] = useState(false);
  const [hasFines, setHasFines] = useState(false);
  const [totalFines, setTotalFines] = useState(0);
  const [checkoutEnabled, setCheckoutEnabled] = useState(false);
  const [instructions, setInstructions] = useState([
    "Enter your customer ID and click 'Check Library Card' to verify the card status.",
    "If the card is expired, renew it and verify again.",
    "Once the card is valid, check for any outstanding fines.",
    "If fines exist, pay them to proceed.",
    "Finally, enter item IDs and click 'Checkout' to complete the process.",
  ]);

  const handleMessage = (msg, color) => {
    setMessage(msg);
    setMessageColor(color);
  };

  const handleCheckLibraryCard = async () => {
    setLoading(true);
    handleMessage('', '');
    try {
      const response = await fetch(`${API_URL}/api/check_library_card/${customerId}`);
      const data = await response.json();

      if (response.ok) {
        setValidCard(data.valid_card);
        handleMessage(data.message, data.valid_card ? 'green' : 'red');
        if (!data.valid_card) {
          setRenewCard(true); // Prompt to renew the card
        }
      } else {
        handleMessage(data.message, 'red');
        setValidCard(false);
      }
    } catch (error) {
      handleMessage('Error checking library card.', 'red');
    } finally {
      setLoading(false);
    }
  };

  const handleRenewLibraryCard = async () => {
    setLoading(true);
    handleMessage('', '');
    try {
      const response = await fetch(`${API_URL}/api/renew_library_card/${customerId}/`, {
        method: 'POST',
      });
      const data = await response.json();
      handleMessage(data.message, response.ok ? 'green' : 'red');
      if (response.ok) {
        setRenewCard(false);
        setValidCard(true);
      }
    } catch (error) {
      handleMessage('Error renewing library card.', 'red');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckFines = async () => {
    setLoading(true);
    handleMessage('Checking for fines...', 'green');
    try {
      const response = await fetch(`${API_URL}/api/check_fines/${customerId}`);
      const data = await response.json();

      if (response.ok) {
        setHasFines(data.has_fines);
        setTotalFines(data.total_fines);
        handleMessage(data.message, data.has_fines ? 'red' : 'green');
        if (!data.has_fines) {
          setCheckoutEnabled(true); // Enable checkout if no fines
        }
      } else {
        handleMessage(data.message, 'red');
      }
    } catch (error) {
      handleMessage('Error checking fines.', 'red');
    } finally {
      setLoading(false);
    }
  };

  const handlePayFines = async () => {
    setLoading(true);
    handleMessage('', '');
    try {
      const response = await fetch(`${API_URL}/api/pay_fines/${customerId}/`, {
        method: 'POST',
      });
      const data = await response.json();
      handleMessage(data.message, response.ok ? 'green' : 'red');
      if (response.ok) {
        setHasFines(false); // Assume fines are now cleared
        setCheckoutEnabled(true); // Enable checkout
      }
    } catch (error) {
      handleMessage('Error paying fines.', 'red');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    handleMessage('', '');
    try {
      const response = await fetch(`${API_URL}/api/check_out/${customerId}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item_ids: itemIds.split(',').map((id) => id.trim()) }),
      });
      const data = await response.json();
  
      if (response.ok) {
        const successfulCheckouts = data.successful_checkouts.map(
          (item) =>
            `Item ID: ${item.item_id}, Due Date: ${item.due_date}, Message: ${item.message}`
        ).join('\n');
        const failureMessages = data.failed_checkouts
          ? data.failed_checkouts.map((item) => `Item ID: ${item.item_id}, Message: ${item.message}`).join('\n')
          : '';
  
        let message = `${successfulCheckouts}`;
        if (failureMessages) {
          message += `\n\nFailed to Checkout:\n${failureMessages}`;
        }
  
        handleMessage(message, 'green');
      } else {
        const failureMessages = data.failed_checkouts
          ? data.failed_checkouts.map((item) => `Item ID: ${item.item_id}, Message: ${item.message}`).join('\n')
          : 'Checkout failed due to an unknown error.';
        handleMessage(failureMessages, 'red');
      }
    } catch (error) {
      handleMessage('Error during checkout.', 'red');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="checkout-container">
      <h1>Library Checkout</h1>
      <div className="instructions">
        <h3>Instructions:</h3>
        <ol>
          {instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="form-group">
        <label>Customer ID:</label>
        <input
          type="text"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
        <button onClick={handleCheckLibraryCard} disabled={loading}>
          Check Library Card
        </button>
      </div>

      {renewCard && (
        <div style={{'padding-top':'15px'}}>
          <button  onClick={handleRenewLibraryCard} disabled={loading}>
            Renew Library Card
          </button>
        </div>
      )}

      {validCard && (
        <div style={{'padding-top':'15px'}}>
          <button style={{marginTop: '5px'}} onClick={handleCheckFines} disabled={loading}>
            Check Fines
          </button>
        </div>
      )}

      {hasFines && (
        <div style={{'padding-top':'15px'}}>
          <p tyle={{marginTop: '5px'}} >Total fines: ${totalFines}</p>
          <button  tyle={{marginTop: '5px'}} onClick={handlePayFines} disabled={loading}>
            Pay Fines
          </button>
        </div>
      )}

      {checkoutEnabled && (
        <div>
          <label>Item IDs (comma-separated):</label>
          <input
            type="text"
            value={itemIds}
            onChange={(e) => setItemIds(e.target.value)}
          />
          <button onClick={handleCheckout} disabled={loading}>
            Checkout
          </button>
        </div>
      )}

      {message && (
        <p className="message" style={{ color: messageColor }}>
          {message}
        </p>
      )}
      {loading && <p className="loading">Processing...</p>}
    </div>
  );
};

export default Checkout;
