const mongoose = require("mongoose");
const Comment = require("./Comments");

const ImageSchema = new mongoose.Schema({
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

ImageSchema.post('findOneAndDelete',async(Image)=>{
  if(Image){
  await Comment.deleteMany({_id:{$in: Image.Comments}});
  }
});

const Image = mongoose.model("Images", ImageSchema);
module.exports = Image;
