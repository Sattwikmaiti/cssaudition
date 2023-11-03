import React, { useState } from 'react';
import './First.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      // Create an object containing the registration data
      const registrationData = {
        email: email,
        password: password,
      };

      // Make a POST request to the registration API endpoint
      const response = await axios.post('http://localhost:8000/api/users/register', registrationData);

      // Handle the response, e.g., show a success message
      if (response.data === 'Registered') {
        // Successful login
        console.log('Registerd successful');
        console.log('Response Data:', response.data);
        navigate('/page'); // Navigate to the '/page' route
      } else {
        // Failed login
        console.log('Login failedhere');
      }
    } catch (error) {
      // Handle login errors
      console.error('Login failed');
      console.error('Error:', error);
    }
  };

  const handleLogin = async () => {
    console.log(email);
    try {
      // Create an object containing the login data
      const loginData = {
        email: email,
        password: password,
      };

      // Make a POST request to the login API endpoint
      const response = await axios.post('http://localhost:8000/api/users/login', loginData);

      // Handle the response
      if (response.data!=null) {
        // Successful login
        console.log('Login successful');
        localStorage.setItem('id',JSON.stringify(response.data._id));
       // console.log('Response Data:', response.data);
        navigate('/page'); // Navigate to the '/page' route
      } else {
        // Failed login
        console.log('Login failedhere');
      }
    } catch (error) {
      // Handle login errors
      console.error('Login failed');
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-page-container">
      <div className="left-half"></div>
      <div className="right-half">
        <h2 className="welcome-text">Welcome back</h2>
        <div className="input-container">
          <TextField
            id="outlined-basic"
            label="email"
            className="input"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <TextField
            id="outlined-basic"
            label="password"
            className="input"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-container">
          <button className="button" onClick={handleRegister}>
            Register
          </button>
          <button className="button" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
