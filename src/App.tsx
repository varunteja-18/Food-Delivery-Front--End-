import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import Login from './components/Login';
import Orders from './components/Orders';
import Register from './components/Register';
import Navbar from './components/Navbar';
import { CartProvider } from './context/CartContext';
import './App.css';


// Helper to check authentication status
const isAuthenticated = () => {
  const user = localStorage.getItem('user');
  const loggedIn = localStorage.getItem('loggedIn');
  return user && loggedIn === 'true';
};

// AppContent is responsible for routing and conditional UI
const AppContent: React.FC = () => {
  const location = useLocation();
  const [userId, setUserId] = useState<number | null>(() => {
    const storedId = localStorage.getItem('userId');
    return storedId ? parseInt(storedId) : null;
  });

  // Store userId when user logs in
  const handleLogin = (userData: { id: number; username: string }) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('userId', userData.id.toString());
    localStorage.setItem('loggedIn', 'true');
    setUserId(userData.id);
  };

  // Show Navbar only when authenticated and not on login/register pages
  const showNavbar =
    isAuthenticated() && !['/', '/register'].includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={isAuthenticated() ? <Home /> : <Navigate to="/" />}
          />
          <Route
            path="/cart"
            element={isAuthenticated() ? <Cart /> : <Navigate to="/" />}
          />
          <Route
            path="/orders"
            element={isAuthenticated() ? <Orders /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </>
  );
};

// Wrap AppContent with Router and CartProvider
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
