import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { FoodItem } from '../types';
import axios from 'axios';

const Home: React.FC = () => {
  const { addToCart } = useCart();
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const res = await axios.get<FoodItem[]>('http://localhost:5125/api/Food');
        setFoodItems(res.data);
      } catch (error) {
        console.error('Failed to fetch food items', error);
        setError('Failed to load food items.');
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, []);

  return (
    <div className="home-container">
      <h2>Welcome to Food Delivery</h2>
      {loading ? (
        <p>Loading food items...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div className="food-list">
          {foodItems.map((item) => (
            <div className="food-card" key={item.id}>
              <img src={item.imgUrl} alt={item.name} />
              <div className="food-card-content">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>₹{item.price}</p>
                <button onClick={() => addToCart(item)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
