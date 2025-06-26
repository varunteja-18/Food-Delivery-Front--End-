import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: number;
  items: OrderItem[];
  total: number;
  orderDate: string;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user.email) return;

      try {
        const res = await axios.get(`http://localhost:5125/api/Orders/${user.email}`);
        setOrders(res.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-page">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              <strong>Order #{order.id}</strong>
              <ul>
                {order.items.map(item => (
                  <li key={item.id}>
                    {item.name} × {item.quantity} - ₹{item.price * item.quantity}
                  </li>
                ))}
              </ul>
              <p><strong>Total:</strong> ₹{order.total.toFixed(2)}</p>
              <p><small>Placed on: {new Date(order.orderDate).toLocaleString()}</small></p>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
