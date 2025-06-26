import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart: React.FC = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleConfirmOrder = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const orderData = {
      email: user.email,
      items: cart.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      orderDate: new Date().toISOString()
    };

    await axios.post('http://localhost:5125/api/Orders', orderData);
    alert('Order confirmed!');
    clearCart();
  } catch (err) {
    console.error(err);
    alert('Order failed!');
  }
};


  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                <strong>{item.name}</strong> - ₹{item.price} × {item.quantity}
                <button onClick={() => removeFromCart(item.id)}>-</button>
                <button onClick={() => addToCart(item)}>+</button>
              </li>
            ))}
          </ul>
          <h3>Total: ₹{total.toFixed(2)}</h3>
          <button onClick={clearCart}>Clear Cart</button>
          <button onClick={handleConfirmOrder}>Confirm Order</button>
        </>
      )}
    </div>
  );
};

export default Cart;
