import React from 'react';
import { Link } from 'react-router-dom';

const BookItem = ({
  book,
  onDeleteClick,
  confirmDelete,
  onConfirmDelete,
  onCancelDelete
}) => {
  return (
    <div className="book-card">
      <div className="book-image">
        {book.image ? (
          <img src={book.image} alt={`${book.title} cover`} />
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: '#95a5a6',
            fontStyle: 'italic'
          }}>
            No cover image
          </div>
        )}
      </div>

      <div className="book-info">
        <h3>{book.title}</h3>
        <div className="book-author">by {book.author}</div>
        {book.publishedYear && (
          <div style={{ fontSize: '0.8rem', color: '#7f8c8d', marginBottom: '0.5rem' }}>
            Published: {book.publishedYear}
          </div>
        )}
        {book.isbn && (
          <div style={{ fontSize: '0.8rem', color: '#7f8c8d', marginBottom: '0.5rem' }}>
            ISBN: {book.isbn}
          </div>
        )}
        <div className="book-description">{book.description}</div>
      </div>

      <div className="book-actions">
        <Link to={`/books/${book.id}`} style={{ textDecoration: 'none' }}>
          <button className="edit-btn">
            Edit
          </button>
        </Link>

        {!confirmDelete ? (
          <button
            className="delete-btn"
            onClick={() => onDeleteClick(book.id)}
          >
            Delete
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className="delete-btn"
              onClick={() => onConfirmDelete(book.id)}
              style={{ backgroundColor: 'rgba(231, 76, 60, 0.1)' }}
            >
              Confirm
            </button>
            <button
              onClick={onCancelDelete}
              style={{
                color: '#7f8c8d',
                fontSize: '0.875rem',
                fontWeight: 'bold'
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookItem;
