import React, { useState ,useEffect} from 'react';
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
  const[register,setRegister]=useState(false);
   const[login,setLogin]=useState(false);
   const[error,setError]=useState("")




   
  const notify = () => {
    
 console.log({error})
    toast.error(`${error}`, {
      position: toast.POSITION.TOP_CENTER
    });
    setError("")
  
  };
  function checkSuffix(inputString) {
  var suffix = "@btech.nitdgp.ac.in";

  // Using the endsWith() method to check if the string ends with the specified suffix
  if (inputString.endsWith(suffix)) {
    return true;
  } else {
    return false;
  }
}
  const handleRegister = async () => {
    console.log("clicked")
    setRegister(true);
    try {
      // Create an object containing the registration data
      if(email==='' || password==='')
      {
        setError("Empty Password or Email")
        setRegister(false);
        //notify()
        return;
      }
   if(checkSuffix(email)===false)
   { 
    console.log("idhar")
    setError("Please use your college email id")
    setRegister(false);
   //  notify()
    return;
   }

   //
   
      // Make a POST request to the registration API endpoint
      const response = await axios.post('https://cssaudition2k23latest.onrender.com/api/users/register', {
        email,password
      });

      // Handle the response, e.g., show a success message
      if (response.data ) {
        // Successful login
        console.log('Registerd successful');
        localStorage.setItem('id',JSON.stringify(response.data._id));
       setRegister(false);
        navigate('/page'); // Navigate to the '/page' route
      } else {
        // Failed login
        
        setError('Already Registered Email');
       // notify()
        setRegister(false);
      }
    } catch (error) {
      setRegister(false);
      setError('Wrong Password or Wrong Email');
      // Handle login errors
      //notify()
      console.error('Login failed');
      console.error('Error:', error);
    }
  };

  const handleLogin = async () => {
    setLogin(true);
    console.log(email);
    if(email==='' || password==='')
      {
        setLogin(false);
        setError("Empty Password or Email")
        
       // notify()
        return;
      }
    try {
      // Create an object containing the login data
      const loginData = {
        email: email,
        password: password,
      };
 //
      // Make a POST request to the login API endpoint
      const response = await axios.post('https://cssaudition2k23latest.onrender.com/api/users/login', loginData);

      // Handle the response
      if (response.data!=null) {
        // Successful login
        console.log('Login successful');
        setLogin(false);
        localStorage.setItem('id',JSON.stringify(response.data._id));
       // console.log('Response Data:', response.data);
        navigate('/page'); // Navigate to the '/page' route
      } else {
        // Failed login
        setLogin(false);

        setError('Wrong Password or Wrong Email');
        //notify()
      }
    } catch (error) {
      setLogin(false);
      setError('Wrong Password or Wrong Email');
      // Handle login errors
      //notify()
      console.error('Login failed');
      console.error('Error:', error);
    }
    setLogin(false);
  };

  useEffect(() => {
    if (error !== '') {
      notify();
    }
  }, [error, notify]);

  return (
    <div className="login-page-container">
      <div className="left-half"></div>
      <div className="right-half">
      <svg className="svg1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#a2d9ff" fill-opacity="1" d="M0,96L14.1,101.3C28.2,107,56,117,85,122.7C112.9,128,141,128,169,149.3C197.6,171,226,213,254,240C282.4,267,311,277,339,277.3C367.1,277,395,267,424,234.7C451.8,203,480,149,508,133.3C536.5,117,565,139,593,154.7C621.2,171,649,181,678,181.3C705.9,181,734,171,762,165.3C790.6,160,819,160,847,154.7C875.3,149,904,139,932,122.7C960,107,988,85,1016,112C1044.7,139,1073,213,1101,224C1129.4,235,1158,181,1186,186.7C1214.1,192,1242,256,1271,288C1298.8,320,1327,320,1355,304C1383.5,288,1412,256,1426,240L1440,224L1440,0L1425.9,0C1411.8,0,1384,0,1355,0C1327.1,0,1299,0,1271,0C1242.4,0,1214,0,1186,0C1157.6,0,1129,0,1101,0C1072.9,0,1045,0,1016,0C988.2,0,960,0,932,0C903.5,0,875,0,847,0C818.8,0,791,0,762,0C734.1,0,706,0,678,0C649.4,0,621,0,593,0C564.7,0,536,0,508,0C480,0,452,0,424,0C395.3,0,367,0,339,0C310.6,0,282,0,254,0C225.9,0,198,0,169,0C141.2,0,113,0,85,0C56.5,0,28,0,14,0L0,0Z"></path></svg>
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
        {register===false ? <button className="button" onClick={handleRegister} >
            Register
            <ToastContainer />
          </button>:<button className="button" >
            .......
          </button> }
          {login===false ? <button className="button" onClick={handleLogin} >
            Login 
            <ToastContainer />
          </button>:<button className="button" >
           ......
          </button> }
        </div>

        <h6 className="welcome-text" style={{color:'grey'}}>Please Fill The Detail Form Page</h6>
        {/* <div className="input-containers">
          <div className="i1">
             <a href="https://www.instagram.com/cssnitdgp/?hl=en" target="_blank"><InstagramIcon  /></a> 
          </div>
          <div className="i2">
           <a href="https://www.linkedin.com/company/cssnitdgp/mycompany/" target="_blank"> <LinkedInIcon /></a>
          </div>
          <div className="i3">
           <a href="https://www.cssnitdgp.in/" target="_blank"> <LanguageIcon  /></a>
          </div>
          
        </div> */}

        <svg  className="svg2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
  <path fill="#a2d9ff" fill-opacity="1" d="M0,160L18.5,133.3C36.9,107,74,53,111,69.3C147.7,85,185,171,222,202.7C258.5,235,295,213,332,197.3C369.2,181,406,171,443,186.7C480,203,517,245,554,266.7C590.8,288,628,288,665,261.3C701.5,235,738,181,775,133.3C812.3,85,849,43,886,42.7C923.1,43,960,85,997,85.3C1033.8,85,1071,43,1108,64C1144.6,85,1182,171,1218,192C1255.4,213,1292,171,1329,133.3C1366.2,96,1403,64,1422,48L1440,32L1440,320L1421.5,320C1403.1,320,1366,320,1329,320C1292.3,320,1255,320,1218,320C1181.5,320,1145,320,1108,320C1070.8,320,1034,320,997,320C960,320,923,320,886,320C849.2,320,812,320,775,320C738.5,320,702,320,665,320C627.7,320,591,320,554,320C516.9,320,480,320,443,320C406.2,320,369,320,332,320C295.4,320,258,320,222,320C184.6,320,148,320,111,320C73.8,320,37,320,18,320L0,320Z"></path>
</svg>
      </div>
    </div>
  );
};

export default LoginPage;
