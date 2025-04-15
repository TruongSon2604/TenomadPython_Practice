import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
  const { currentUser } = useAuth();

  return (
    <div style={{
      textAlign: 'center',
      padding: '3rem 1rem',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1>Welcome to Book Management System</h1>
      <p style={{
        fontSize: '1.1rem',
        color: '#555',
        lineHeight: 1.6,
        margin: '1.5rem 0'
      }}>
        This application allows you to manage your book collection with ease.
        You can add new books, update existing ones, and keep track of your entire library.
      </p>

      {currentUser ? (
        <div>
          <p style={{ marginBottom: '2rem' }}>
            Hello, <strong>{currentUser.name}</strong>! You are currently logged in.
          </p>

          <Link
            to="/books"
            style={{
              display: 'inline-block',
              background: '#3498db',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: 'bold',
              marginTop: '1rem'
            }}
          >
            Go to Book Management
          </Link>
        </div>
      ) : (
        <Link
          to="/login"
          style={{
            display: 'inline-block',
            background: '#3498db',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '4px',
            textDecoration: 'none',
            fontWeight: 'bold',
            marginTop: '1rem'
          }}
        >
          Sign In
        </Link>
      )}
    </div>
  );
};

export default HomePage;
