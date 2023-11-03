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

import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import axios from 'axios';
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 'auto',
  
  lineHeight: '60px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  borderBottom: '2px solid lightgrey', // Set the bottom border
  backgroundColor: '#E3E4FA',
  padding: '10px',
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


  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const handleonChange = (event) => {
    // Update the state based on the form input fields
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    console.log("hello")
    // Define the URL you want to fetch data from
    const apiUrl = `http://localhost:8000/api/users/userdetails/${JSON.parse(localStorage.getItem('id'))}`; // Replace with your API URL

    // Use Axios to make the GET request
    axios.get(apiUrl)
      .then((response) => {
        // Data has been successfully fetched
        setData(response.data);
        setLoading(false);
        console.log(response.data)
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [data]);
  const theme = useTheme();
  const [DomainName, setDomainName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setDomainName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  return (
    <div className="div">
    <Container maxWidth="md"  style={{ backgroundColor: 'cadetblue', padding: '20px',height:'auto'}}>
      <Item elevation={5}>

      <Typography  align="center" gutterBottom>
        Computer Science Society Audtion Form
      </Typography>
      </Item>
      <form>
        <div style={{ marginBottom: '20px' }}>
         <Item elevation={5}>


         <Typography  align='left' gutterBottom>
        Name
      </Typography>
         <TextField id="standard-basic" className="inputs"   onChange={handleonChange} variant="standard" />
          
          </Item> 
        
        </div>
        <div style={{ marginBottom: '20px' }}>
         <Item elevation={5}>


         <Typography  align='left' gutterBottom>
        Phone Number 
      </Typography>
         <TextField id="standard-basic" className="inputs"   variant="standard" />
          
          </Item> 
        
        </div> <div style={{ marginBottom: '20px' }}>
         <Item elevation={5}>


         <Typography  align='left' gutterBottom>
        Roll Number 
      </Typography>
         <TextField id="standard-basic" className="inputs"  variant="standard" />
          
          </Item> 
        
        </div>
        <div style={{ marginBottom: '20px' }}>
         <Item elevation={5}>


         <Typography  align='left' gutterBottom>
        LinkedIn Profile Link
      </Typography>
         <TextField id="standard-basic" className="inputs"  variant="standard" />
          
          </Item> 
        
        </div>
        <div style={{ marginBottom: '20px' }}>
         <Item elevation={5}>


         <Typography  align='left' gutterBottom>
        Github Link ( For Developer Roles) 
      </Typography>
         <TextField id="standard-basic" className="inputs"  variant="standard" />
          
          </Item> 
        
        </div>
        <div style={{ marginBottom: '20px' }}>
         <Item elevation={5}>
         <InputLabel id="demo-multiple-chip-label">Interested Domains</InputLabel>
         
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={DomainName}
          onChange={handleChange}
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
              style={getStyles(name, DomainName, theme)}
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
         <TextField id="standard-basic" className="inputs"  variant="standard" />
          
          </Item> 
        
        </div>
        <div style={{ marginBottom: '20px' }}>
         <Item elevation={5}>


         <Typography  align='left' gutterBottom>
        Additional Links 2  
      </Typography>
         <TextField id="standard-basic" className="inputs"  variant="standard" />
          
          </Item> 
        
        </div>



        <Button
          variant="contained"
          color="primary"
          fullWidth
          
        >
          Submit
        </Button>
      </form>
    </Container>
    </div>
  );
};

export default FormClone;