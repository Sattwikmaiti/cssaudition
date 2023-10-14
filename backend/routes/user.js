
const express=require("express");
const router = express.Router();
const User = require("../models/User.js");
const QNA = require("../models/QNA.js");



router.get('/all',async(req,res)=>
{   try{
    const users=await User.find();
    res.status(200).json(users)
} catch(err){
    res.status(500).json(err)
}
});

//  register of user 
router.post("/register", async (req, res) => {
  
    const newUser = new User({
      username: req.body.username,
      profilename:req.body.profilename,
      email: req.body.email,
      phone : req.body.phone,
      roll: req.body.roll,

       github:req.body.github,
       linkedin:req.body.linkedin,
     password:req.body.password,

    });
  
    try {
      const savedUser = await newUser.save();
     
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
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
  
     
  
     
      return res.status(200).json("Logged in Succesfully");
    } catch (err) {
      return res.status(500).json(err);
    }
  });
  

  // get user details 


router.get('/userdetails/:id',async(req,res)=>
{
  const user=await User.findById(req.params.id);

 
   res.json({ user: user, originalPassword: user.password });
});



// delete user  by id 


router.delete("/delete/:id",  async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });

// update userdetails 

  router.put("/updateqna/:id", async (req, res) => {
    const newQNA = new QNA({
      quetionid : req.body.quetionid,
      question: req.body.question,
      answer: req.body.answer
 
     });
  
    try {
   

      const user = await User.findById(req.params.id);

      if(user)
      {
        user.qna.push(newQNA);
       user.markModified('qna');
       await user.save();


      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

  module.exports = router;