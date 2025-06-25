
import React, { useEffect, useState } from 'react';

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
  date: string;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
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
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
