import { useEffect, useState } from "react";
// @ts-ignore
import { API } from "../utils/config";

export default function PrivatePage() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [isbn, setIsbn] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [newStatus, setNewStatus] = useState(0);

  const fetchBooks = async () => {
    const res = await API.get("/books");
    setBooks(res.data.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch = async () => {
    const res = await API.get(`/books/${search}`);
    console.log("Search response:", res.data);
    setBooks(res.data.data || [res.data]);
  };

  const handleCreate = async () => {
    await API.post("/books", { isbn });
    setIsbn("");
    fetchBooks();
  };

  const openModal = (book: any) => {
    setSelectedBook(book);
    setNewStatus(book.status);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBook(null);
    setNewStatus(0);
  };

  const handleEdit = async () => {
    await API.patch(`/books/${selectedBook._id}`, {
      status: newStatus,
    });
    fetchBooks();
    closeModal();
  };

  const handleDelete = async (id: any) => {
    const res = await API.delete(`/books/${id}`);
    console.log("Delete response:", res.data);
    fetchBooks();
  };

  const getStatusText = (status: any) => {
    switch (status) {
      case 0:
        return "New";
      case 1:
        return "Reading";
      case 2:
        return "Finished";
      default:
        return `Status ${status}`;
    }
  };

  return (
    <div>
      <h1>Books</h1>

      <div>
        <input
          placeholder="Search book by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button
          onClick={() => {
            setSearch("");
            fetchBooks();
          }}
        >
          Clear
        </button>
      </div>

      <div>
        <input
          placeholder="Enter ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />
        <button onClick={handleCreate}>Create Book</button>
      </div>
        <ul>
          {books.map((book: any) => (
            <li
              key={book._id}
            >
              <strong>{book.title}</strong> by {book.author}
              <br />
              <small>ISBN: {book.isbn}</small>
              <br />
              Status: <strong>{getStatusText(book.status)}</strong>
              <br />
              <button
                onClick={() => openModal(book)}
              >
                Change Status
              </button>
              <button
                onClick={() => handleDelete(book._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "8px",
              minWidth: "300px",
              maxWidth: "500px",
            }}
          >
            <h3>Change Book Status</h3>

            {selectedBook && (
              <div>
                <p>
                  <strong>Book:</strong> {selectedBook.title}
                </p>
                <p>
                  <strong>Author:</strong> {selectedBook.author}
                </p>
                <p>
                  <strong>Current Status:</strong>{" "}
                  {getStatusText(selectedBook.status)}
                </p>
              </div>
            )}

            <div>
              <label
                htmlFor="statusSelect"
              >
                Select New Status:
              </label>
              <select
                id="statusSelect"
                value={newStatus}
                onChange={(e) => setNewStatus(parseInt(e.target.value))}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  fontSize: "1rem",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              >
                <option value={0}>New</option>
                <option value={1}>Reading</option>
                <option value={2}>Finished</option>
              </select>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "0.5rem",
              }}
            >
              <button
                onClick={closeModal}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleEdit}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
