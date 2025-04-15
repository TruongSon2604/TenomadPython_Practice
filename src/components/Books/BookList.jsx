import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBooks, deleteBook, searchBooks } from "../../services/bookService";
import BookItem from "./BookItem";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    setLoading(true);
    try {
      const allBooks = await getBooks();
      setBooks(allBooks);
      setError("");
    } catch (err) {
      setError("Failed to load books");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    try {
      const results = searchBooks(query);
      setBooks(results);
    } catch (err) {
      setError("Error while searching");
      console.error(err);
    }
  };

  const handleDeleteConfirm = (bookId) => {
    setConfirmDelete(bookId);
  };


  const handleDeleteCancel = () => {
    setConfirmDelete(null);
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await deleteBook(bookId);
      loadBooks(); 
      setConfirmDelete(null);
      setSuccessMessage("Book deleted successfully");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (err) {
      setError(`Failed to delete book: ${err.message}`);
    }
  };

  return (
    <div className="books-container">
      <div className="books-header">
        <h2>Book Management</h2>
        <Link to="/books/new" className="add-book-btn">
          Add New Book
        </Link>
      </div>

      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      <div style={{ marginBottom: "1.5rem" }}>
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={handleSearch}
          style={{
            width: "100%",
            padding: "0.75rem",
            borderRadius: "4px",
            border: "1px solid #bdc3c7",
            fontSize: "1rem",
          }}
        />
      </div>

      {/* Loading indicator */}
      {loading ? (
        <div className="text-center">
          <div className="loader"></div>
          <p>Loading books...</p>
        </div>
      ) : books.length === 0 ? (
        <div className="text-center">
          <p>
            No books found. {searchTerm && "Try a different search term or"}{" "}
            <Link to="/books/new">add a new book</Link>.
          </p>
        </div>
      ) : (
        <div className="books-grid">
          {books.map((book) => (
            <BookItem
              key={book.id}
              book={book}
              onDeleteClick={handleDeleteConfirm}
              confirmDelete={confirmDelete === book.id}
              onConfirmDelete={handleDeleteBook}
              onCancelDelete={handleDeleteCancel}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
