const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true},
    roll: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    linkedin:{
        type: String, 
    },
    github:{
        type: String,
    },

    qna:{
        type:Array,default:[]
    }
    ,
    category:{
      type:Array,default:[]
  }
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
