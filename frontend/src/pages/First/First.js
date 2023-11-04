import React, { useState } from 'react';
import './First.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const notify = () => {
    

    toast.error("Oops Failed Attempt ! Try once again", {
      position: toast.POSITION.TOP_CENTER
    });
  };
  const handleRegister = async () => {
    try {
      // Create an object containing the registration data
     

      // Make a POST request to the registration API endpoint
      const response = await axios.post('https://cssaudition.onrender.com/register', {
        email,password
      });

      // Handle the response, e.g., show a success message
      if (response.data) {
        // Successful login
        console.log('Registerd successful');
        localStorage.setItem('id',JSON.stringify(response.data._id));
       
        navigate('/page'); // Navigate to the '/page' route
      } else {
        // Failed login
        notify()
        console.log('Login failedhere');
      }
    } catch (error) {

      // Handle login errors
      notify()
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
      const response = await axios.post('https://cssaudition.onrender.com/login', loginData);

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
      notify()
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
            <ToastContainer />
          </button>
          <button className="button" onClick={handleLogin}>
            Login
            <ToastContainer />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
