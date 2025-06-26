import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please fill in both fields.');
      return;
    }

    try {
      await axios.post(' http://localhost:5125/api/Auth/register', { email, password });
      alert('✅ Registration Successful! Please login.');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Registration failed. Email may already be in use.');
    }
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
