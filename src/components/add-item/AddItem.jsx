import { useState } from 'react';

const AddItem = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Prepare data object for backend
  const newBookData = { title, author, isbn, genre, year };

  // Placeholder function for adding a book (to be connected with backend API)
  const handleAddItem = async () => {
    // Validation check
    if (!title || !author || !isbn || !genre || !year) {
      setMessage("Please fill out all fields.");
      return;
    }

    setLoading(true);

    try {
      // API URL setup: replace 'VITE_BACKEND_URL' with actual environment variable in backend configuration
      const API_URL = import.meta.env.VITE_BACKEND_URL; 
      const response = await fetch(`${API_URL}/api/add_item`, { // Replace `/api/add_item` with actual endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBookData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Book added successfully: ${data.message}`);
        // Optionally reset form fields after successful submission
        setTitle('');
        setAuthor('');
        setIsbn('');
        setGenre('');
        setYear('');
      } else {
        setMessage(data.message || "Failed to add book.");
      }
    } catch (error) {
      setMessage("Error connecting to the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-item-container" style={{position: "fixed"}}>
      <h2>Add New Book</h2>
      <div className="input-group">
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
      </div>
      <div className="input-group">
        <label htmlFor="author">Author:</label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          disabled={loading}
        />
      </div>
      <div className="input-group">
        <label htmlFor="isbn">ISBN:</label>
        <input
          id="isbn"
          type="text"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          disabled={loading}
        />
      </div>
      <div className="input-group">
        <label htmlFor="genre">Genre:</label>
        <input
          id="genre"
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          disabled={loading}
        />
      </div>
      <div className="input-group">
        <label htmlFor="year">Year:</label>
        <input
          id="year"
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          disabled={loading}
        />
      </div>
      <div className="button-group">
        <button onClick={handleAddItem} disabled={loading}>
          {loading ? "Adding..." : "Add Book"}
        </button>
      </div>

      {message && (
        <div className={`message ${message.includes("Error") || message.includes("Failed") ? "error" : "success"}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default AddItem;
