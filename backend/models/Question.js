const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {


  quetionid:{type :String , required: true},
  question:{type:String,required:true},
  
 

   
  },
{
    timestamps: true
}
  
);


module.exports = mongoose.model("Question", questionSchema);
