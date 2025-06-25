import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
// import './Navbar.css';

const Navbar: React.FC = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.setItem('loggedIn', 'false');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <h1>FoodDelivery</h1>
      <ul className="nav-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/cart">Cart ({totalItems})</Link></li>
        <li><Link to="/orders">Orders</Link></li>
        <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;
