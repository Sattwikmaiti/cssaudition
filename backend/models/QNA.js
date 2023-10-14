const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {


  quetionid:{type :Number , required: true},
  question:{type:String,required:true},
  answer:{type:String,required:true},
 

   
  },
{
    timestamps: true
}
  
);


module.exports = mongoose.model("QNA", questionSchema);
