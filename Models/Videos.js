const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  FileName: {
    type: String,
    required: true,
    trim: true,
  },
  FilePath: {
    type: String,
    required: true,
    trim: true,
  },
  Comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
    },
  ],
});

const Video = mongoose.model("Videos", VideoSchema);
module.exports = Video;
