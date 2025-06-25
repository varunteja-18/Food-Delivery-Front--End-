import React from 'react';
import { useCart } from '../context/CartContext';
import { FoodItem } from '../types'; 


// interface FoodItem {
//   id: number;
//   name: string;
//   price: number;
//   description: string;
//   imgUrl: string;
// }

const foodItems: FoodItem[] = [
  {
    id: 1,
    name: 'Margherita Pizza',
    description: 'Classic cheese & tomato pizza',
    imgUrl: "https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg",
    price: 299,
  },
  {
    id: 2,
    name: 'Veg Burger',
    description: 'Delicious burger with fresh veggies',
    imgUrl: 'https://i.pinimg.com/564x/de/06/f2/de06f257023a514fa12962a587854ae9.jpg',
    price: 149,
  },
  {
    id: 3,
    name: 'Pasta Alfredo',
    description: 'Creamy white sauce pasta',
    imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH24I4ZMn--lFCf2GTfQ8bd_XoiEehhtJlQw&s',
    price: 259,
  },
  {
    id: 4,
    name: 'Paneer Tikka',
    description: 'Grilled cottage cheese with spices',
    imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkMkpqoei0lwKvuBXDLvxPPWaVrxDINQ7pJQ&s',
    price: 199,
  },
  {
    id: 5,
    name: 'Chicken Biryani',
    description: 'Hyderabad Chicken Special Biryani',
    imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2A0-Nwgr8SDEj6_X-g-IUJp5GTcvkZj3_SA&s',
    price: 299,
  },
  {
    id: 6,
    name: 'Mutton Biryani',
    description: 'Hyderabad Mutton Special Biryani',
    imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4-GXWh4fiTMj6GKGx6sjtKk6OFyaAtKIKJg&s',
    price: 350,
  },
  {
    id: 7,
    name: 'Veg Biryani',
    description: 'Veg Biryani',
    imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ88hteNrVf7MUwLUmvx3W3qWmUYya89zGHcQ&s',
    price: 150,
  },
  {
    id: 8,
    name: 'Panner Biryani',
    description: 'Special Panner Biryani',
    imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRzdTW_WjxMAIqYlOuV5e_Y1vL9T9aiXZeBQ&s',
    price: 200,
  },
  {
    id: 9,
    name: 'Double Ka Meetha',
    description: 'Sweet',
    imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQoj0UGlTKrSCWlKX0jmCnTwcM7I4DTxIFCQ&s',
    price: 350,
  },
  {
    id: 10,
    name: 'Apricot Delight',
    description: 'Sweet',
    imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTOhoGVj2MhAgYUULtnNtJy04vteD94kVXDQ&s',
    price: 350,
  }

];

const Home: React.FC = () => {
  const { addToCart } = useCart();

  return (
    <div className="home-container">
      <h2>Welcome to Food Delivery</h2>
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
    </div>
  );
};

export default Home;
