import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleConfirmOrder = () => {
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const newOrder = {
      id: Date.now(),
      items: cart,
      total,
      date: new Date().toLocaleString(),
    };
    localStorage.setItem('orders', JSON.stringify([...existingOrders, newOrder]));
    clearCart();
    alert('✅ Order confirmed!');
    navigate('/orders');
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
