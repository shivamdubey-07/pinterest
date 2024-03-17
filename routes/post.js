const mongoose = require('mongoose');

// Define the schema for the post
const postSchema = new mongoose.Schema({
  imageText: {
    type: String,
    
  },
  image:{
    type:String

  },

  user:{
    type:mongoose.Schema.Types.ObjectId ,//this is type of id of mongoose
    ref:'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Array,
    default: []
  }
});

// Create the Post model
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
