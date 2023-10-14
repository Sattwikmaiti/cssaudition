const express=require("express");
const router = express.Router();
const Question = require("../models/Question.js");



//  register of Question 
router.post("/register", async (req, res) => {
  
    const newQuestion = new Question({
     quetionid : req.body.quetionid,
     question: req.body.question

    });
  
    try {
      const savedQuestion = await newQuestion.save();
     
      res.status(201).json(savedQuestion);
    } catch (err) {
      res.status(500).json(err);
    }
  });

 
  

  // get Question details 


router.get('/questiondetails/:id',async(req,res)=>
{
    // here id means question tag number 
    const query = { questionid: { $in: req.params.id } };

    const results = await Question.find(query).toArray();


    res.status(200).json(results)
   
});



// delete Question  by id  (mongodb ID)


router.delete("/delete/:id",  async (req, res) => {
    try {
      await Question.findByIdAndDelete(req.params.id);
      res.status(200).json("Question has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });


  module.exports = router;