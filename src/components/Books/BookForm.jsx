import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getBookById,
  createBook,
  updateBook,
} from "../../services/bookService";

const BookForm = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const isEditMode = !!id;

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (id) {
      loadBooks();
    }
  }, []);

  const loadBooks = async () => {
    setLoading(true);
    try {
      const book = await getBookById(id);
      setFormData(book);
      setError("");
    } catch (err) {
      setError("Failed to load book data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    console.log("frm data", formData);
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };


  const validateForm = () => {
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = "Title is required";
    }

    if (!formData.author.trim()) {
      errors.author = "Author is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      if (isEditMode) {
        console.log("frm data 2", formData);
        updateBook(id, formData);
      } else {
        createBook(formData);
      }
      navigate("/books");
    } catch (err) {
      setError(
        `Failed to ${isEditMode ? "update" : "create"} book: ${err.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-form-container">
      <h2>{isEditMode ? "Edit Book" : "Add New Book"}</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
            disabled={loading}
          />
          {formErrors.title && (
            <div className="error-message">{formErrors.title}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="author">Author *</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            disabled={loading}
          />
          {formErrors.author && (
            <div className="error-message">{formErrors.author}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="coverImage">Cover Image URL</label>
          <input
            type="text"
            id="coverImage"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter cover image URL (optional)"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter book description (optional)"
            disabled={loading}
          />
        </div>

        <div className="form-buttons">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/books")}
            disabled={loading}
          >
            Cancel
          </button>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <div className="loader"></div>
            ) : isEditMode ? (
              "Update Book"
            ) : (
              "Add Book"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
