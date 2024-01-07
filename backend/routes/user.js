
const express=require("express");
const router = express.Router();
const User = require("../models/User.js");
const nodemailer = require('nodemailer');
const json2csv = require('json2csv').Parser;
const fs = require('fs');

router.get('/all',async(req,res)=>
{   try{
    const users=await User.find();
    const fields = ['_id', 'username', 'email','phone','roll','password','linkedin','github','add1','add2','category','createdAt','updatedAt',
  '__v']; // Define the fields you want in the CSV
    const json2csvParser = new json2csv({ fields });
    const csv = json2csvParser.parse(users);

    fs.writeFileSync('output.csv', csv); // Save CSV file

    res.attachment('output.csv'); 
    res.status(200).json(users)
} catch(err){
    res.status(500).json(err)
}
});

//  register of user 
router.post("/register", async (req, res) => {
  

// console.log("here")
// const transporter = nodemailer.createTransport({
         
//           service: 'gmail.com',
//           auth:{
//               user:'hachkathoncommon@gmail.com',
//               pass:'Sattwik@2002'
//           }
//         });
//         console.log(transporter)


//         const info = await transporter.sendMail({
//           from: '"Sattwik Maiti" <hachkathoncommon@gmail.com>', // sender address
//           to: `${req.body.email}`, // list of receivers
//           subject: "CSS Registration SuccessFull", // Subject line
//           text: "Welcome To Computer Science Society", // plain text body
//           html: " Your Question Paper :  <img  src={'https://media.licdn.com/dms/image/C560BAQF6lm99eoAgjg/company-logo_200_200/0/1675197081133?e=2147483647&v=beta&t=Vmmcb012jJ98_Y2CyDrqrrLnPpokbUDRep7KX4IK2cg'} style={{height:'15rem'}} /> ",
       
//         })
//         console.log("Message sent: %s", info.messageId);
    const newUser = new User({
     
      email: req.body.email,
     password:req.body.password,

    });

    const user = await User.findOne({ email :req.body.email });
    
    if (user) {
      res.status(500).json("error");

    } else {
      try {
        const user= await newUser.save();
        
          console.log("usser qq")
          res.status(201).json(user);
        } catch (err) {
          console.log("ee")
          res.status(500).json(err);
        }
      
    }
  
    
  });

 // login of user using email and password

  router.post('/login', async (req, res) => {
    try {
      const user = await User.findOne({
        email: req.body.email,
      });
  
      if (!user) {
        return res.status(401).json('Wrong Email !! ');
      }
  
      
      const originalPassword =user.password;
      const inputPassword = req.body.password;
  
      if (originalPassword !== inputPassword) {
        return res.status(401).json('Wrong Password');
      }
  
     
  
     
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  });
  

  // get user details 


router.get('/userdetails/:id',async(req,res)=>
{
  const user=await User.findById(req.params.id);

 
   return res.json(user);
});



  router.put('/updateUser/:userId', async (req, res) => {
    const userId = req.params.userId;
    const updatedFields = req.body; // Fields to be updated based on the request body
  
    try {
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $set: updatedFields },
        { new: true } // To return the updated document
      );
  
      if (user) {
        return res.json({ message: 'User updated successfully', user });
      } else {
        return res.status(404).json({ message: 'User not found or update failed.' });
      }
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  module.exports = router;