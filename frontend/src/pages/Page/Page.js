import React,{useEffect,useState} from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import "./Page.css"
import { styled } from '@mui/material/styles';
import {useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { toast, ToastContainer } from 'react-toastify';
import loader  from "./loader.gif"
import "react-toastify/dist/ReactToastify.css";

import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import axios from 'axios';
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 'auto',
  minHeight: '100px',
  lineHeight: '100px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  borderBottom: '2px solid lightgrey', // Set the bottom border
  backgroundColor: '#E3E4FA',
  padding: '15px',
  borderTop: '10px solid #95B9C7 ',
  marginBottom:'10px' // Set the top border with blue color
}));




const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Web Developer',
  'App Developer',
  'Event Management',
  'Content Writer',
  'Graphic Designer', 
  'Video Editor',
  
];

function getStyles(name, DomainName, theme) {
  return {
    fontWeight:
      DomainName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}





const FormClone = () => {
  const notify = () => {
    

    toast.success("Successfully Saved!", {
      position: toast.POSITION.TOP_CENTER
    });
  };

  const [data, setData] = useState();
  const [userId,setuserId]=useState()
  const [loading, setLoading] = useState(true);
  const handleonChange = (fieldName) => (event) => {
    // Clone the current data object to avoid mutating state directly
    const newData = { ...data };
    
    // Update the specific field in the cloned object based on fieldName
    newData[fieldName] = event.target.value;
 // console.log(newData)
    // Set the updated data object to state
    setData(newData); // Assuming you have a state variable named setData for your data
  };
  useEffect(() => {
    console.log("hello")
    // Define the URL you want to fetch data from
    const apiUrl = `https://cssaudition2k23latest.onrender.com/api/users/userdetails/${JSON.parse(localStorage.getItem('id'))}`; // Replace with your API URL

    // Use Axios to make the GET request
    axios.get(apiUrl)
      .then((response) => {
        // Data has been successfully fetched
        setData(response.data);
        setuserId(response.data._id)
        setLoading(false);
        console.log(response.data)
        //console.log(response.data)
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);
  const theme = useTheme();

  const handleFieldChange = (fieldName) => (event) => {
    const {
      target: { value },
    } = event;
    if (fieldName === 'category') {
      // Assuming you want to update the 'category' field using setData
      const newData = { ...data };
      newData[fieldName] = typeof value === 'string' ? value.split(',') : value;
      setData(newData);
    }
  };
  
    const handleUpdateUser = async () => {
      try {
        // Define the updated fields
       
       const copyData = { ...data };
       const {username,phone,roll,linked,github,category,add1,add2,email,password}=copyData
      

console.log( userId)
        // Make the PUT request to update the user
        const response = await axios.put(`https://cssaudition2k23latest.onrender.com/api/users/updateUser/${userId}`,  {

        username,
        phone,
        roll,
        linked,
        github,
        category,
        add1,
        add2,
        } );
  
        if (response) {
          console.log('User updated successfully:', response.data.message);
          notify()
        } else {
          console.error('User not found or update failed:', response.data.message);
        }
      } catch (error) {
        console.error('Error updating user:', error);
      }
    };


  
  
  return (

    <div className="div">
       {loading ? (
        // Display a loading indicator here
        <div className="loading">
          loading...
          

        </div>
      ) : ( <div className="div">
      <Container maxWidth="md"  style={{ padding: '20px',height:'auto', borderRadius:'10px'}}>

        <Item><img src={loader} style={{height:'15rem'}} /></Item>
        <Item elevation={5}>
  
        <Typography  align="center"   style={{height:'5rem',display:'flex',justifyContent:'center',alignItems:'center'}}  gutterBottom>
          Computer Science Society Audtion Form
        </Typography>
        </Item>
        <form>
          <div style={{ marginBottom: '20px' }}>
           <Item elevation={5}>
  
  
           <Typography  align='left' gutterBottom>
          Name
        </Typography>
           <TextField id="standard-basic" className="inputs"  value={data?.username}  onChange={handleonChange('username')} variant="standard" />
            
            </Item> 
          
          </div>
          <div style={{ marginBottom: '20px' }}>
           <Item elevation={5}>
  
  
           <Typography  align='left' gutterBottom>
          Phone Number 
        </Typography>
           <TextField id="standard-basic" className="inputs" value={data?.phone} onChange={handleonChange('phone')} variant="standard" />
            
            </Item> 
          
          </div> <div style={{ marginBottom: '20px' }}>
           <Item elevation={5}>
  
  
           <Typography  align='left' gutterBottom>
          Roll Number 
        </Typography>
           <TextField id="standard-basic" className="inputs"  value={data?.roll} onChange={handleonChange('roll')}variant="standard" />
            
            </Item> 
          
          </div>
          <div style={{ marginBottom: '20px' }}>
           <Item elevation={5}>
  
  
           <Typography  align='left' gutterBottom>
          LinkedIn Profile Link
        </Typography>
           <TextField id="standard-basic" className="inputs" value={data?.linkedin} onChange={handleonChange('linkedin')}variant="standard" />
            
            </Item> 
          
          </div>
          <div style={{ marginBottom: '20px' }}>
           <Item elevation={5}>
  
  
           <Typography  align='left' gutterBottom>
          Github Link ( For Developer Roles) 
        </Typography>
           <TextField id="standard-basic" className="inputs"  value={data?.github}  onChange={handleonChange('github')}variant="standard" />
            
            </Item> 
          
          </div>
          <div style={{ marginBottom: '20px' }}>
           <Item elevation={5}>
           <InputLabel id="demo-multiple-chip-label">Interested Domains</InputLabel>
           
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={data.category}
            onChange={handleFieldChange('category')}
            input={<OutlinedInput id="select-multiple-chip"  />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, data.category, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
            
            </Item> 
          
          </div>
  
  
          <div style={{ marginBottom: '20px' }}>
           <Item elevation={5}>
  
  
           <Typography  align='left' gutterBottom>
          Additional Links 1 (if any like figma, behance, dribble,youtube etc) 
        </Typography>
           <TextField id="standard-basic" className="inputs" value={data.add1}  onChange={handleonChange('add1')} variant="standard" />
            
            </Item> 
          
          </div>
          <div style={{ marginBottom: '20px' }}>
           <Item elevation={5}>
  
  
           <Typography  align='left' gutterBottom>
          Additional Links 2  
        </Typography>
           <TextField id="standard-basic" className="inputs"  value={data.add2} onChange={handleonChange('add2')} variant="standard" />
            
            </Item> 
          
          </div>
  
  
  
          <Button
            variant="contained"
            color="primary"
            fullWidth
             onClick={handleUpdateUser}
          >
            Submit
            <ToastContainer />
          </Button>
        </form>
      </Container>
      </div> )}
    </div>
   
  );
};

export default FormClone;