const mongoose = require('mongoose');
const plm=require("passport-local-mongoose")


mongoose.connect("mongodb+srv://shivamdubey:IamMahi07@cluster0.jvlvmfh.mongodb.net/pinterest?retryWrites=true&w=majority&appName=Cluster0",{
  
    useNewUrlParser:true,
    useUnifiedtopology:true,

});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
  },
  posts: [{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Post'//for reference of model post
  }],
  dp: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  fullname: {
    type:String,
    required:true
  }
});

userSchema.plugin(plm)

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
