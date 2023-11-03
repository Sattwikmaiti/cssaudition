const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String,  unique: true,default:'' },
    email: { type: String, required: true, unique: true },
    phone: { type: String,  unique: true ,default:''},
    roll: { type: String,  unique: true,default:''},
    password: { type: String, required: true },
    linkedin:{
        type: String, default:''
    },
    github:{
        type: String,default:''
    },

    add1:{
      type: String,default:''
  },
  add2:{
    type: String,default:''
},
    
    category:{
      type:Array,default:[]
  }
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
