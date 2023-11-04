const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String,  default:'' },
    email: { type: String, required: true, unique: true },
    phone: { type: String, default:''},
    roll: { type: String,  default:''},
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
