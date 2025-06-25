import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import './Auth.css';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

const handleRegister = () => {
    if (!email || !password) {
      alert('Please fill in both fields.');
      return;
    }

    const user = { email, password };
    localStorage.setItem('user', JSON.stringify(user));
    alert('✅ Registration Successful! Please login.');
    navigate('/');
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
        <p>Already have an account? <span onClick={() => navigate('/')}>Login</span></p>
      </form>
    </div>
  );
};

export default Register;
