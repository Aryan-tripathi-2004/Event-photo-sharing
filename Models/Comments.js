const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  Message: {
    type: String,
    required: true,
    trim: true,
  },
  CreatedAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  }
});

const Comment = mongoose.model("Comments", CommentSchema);
module.exports = Comment;
