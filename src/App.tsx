import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import Login from './components/Login';
import Orders from './components/Orders';
import Register from './components/Register';
import Navbar from './components/Navbar';
import { CartProvider } from './context/CartContext';
import './App.css';

// Check if user is authenticated
const isAuthenticated = () => {
  const user = localStorage.getItem('user');
  const loggedIn = localStorage.getItem('loggedIn');
  return user && loggedIn === 'true';
};

// Core content of the app, wrapped in Router
const AppContent: React.FC = () => {
  const location = useLocation();

  // Only show Navbar if logged in and not on login/register pages
  const showNavbar =
    isAuthenticated() && !['/', '/register'].includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={isAuthenticated() ? <Home /> : <Navigate to="/" />} />
          <Route path="/cart" element={isAuthenticated() ? <Cart /> : <Navigate to="/" />} />
          <Route path="/orders" element={isAuthenticated() ? <Orders /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
};

// Main App component with Router and Context
const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
};

export default App;
