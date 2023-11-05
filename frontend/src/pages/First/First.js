import React, { useState } from 'react';
import './First.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';
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
      const response = await axios.post('https://cssaudition2k23latest.onrender.com/api/users/register', {
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
      const response = await axios.post('https://cssaudition2k23latest.onrender.com/api/users/login', loginData);

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
        <h4 className="welcome-text">Welcome To CSS Auditions !!</h4>
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

        <div className="input-containers">
          <div className="i1">
             <a href="https://www.instagram.com/cssnitdgp/?hl=en" target="_blank"><InstagramIcon  /></a> 
          </div>
          <div className="i2">
           <a href="https://www.linkedin.com/company/cssnitdgp/mycompany/" target="_blank"> <LinkedInIcon /></a>
          </div>
          <div className="i3">
           <a href="https://www.cssnitdgp.in/" target="_blank"> <LanguageIcon  /></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
