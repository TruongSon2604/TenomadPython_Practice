import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navigation from './components/Navigation';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import BooksPage from './pages/BooksPage';
import BookFormPage from './pages/BookFormPage';

// Styles
import './styles/main.scss';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navigation />

          <main className="main-content">
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<HomePage />} />

              {/* Protected routes */}
              <Route path="/books" element={
                <ProtectedRoute>
                  <BooksPage />
                </ProtectedRoute>
              } />

              <Route path="/books/new" element={
                <ProtectedRoute>
                  <BookFormPage />
                </ProtectedRoute>
              } />

              <Route path="/books/:id" element={
                <ProtectedRoute>
                  <BookFormPage />
                </ProtectedRoute>
              } />

              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
