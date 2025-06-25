import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './Auth.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem('user', JSON.stringify({ email }));
      localStorage.setItem('loggedIn', 'true');
      navigate('/home');
    } else {
      alert('Enter credentials');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
        <p>Don't have an account? <span onClick={() => navigate('/register')}>Register</span></p>
      </form>
    </div>
  );
};

export default Login;
