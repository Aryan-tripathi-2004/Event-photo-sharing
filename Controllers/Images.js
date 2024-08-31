const Image=require('../Models/Images');
const Room=require('../Models/Rooms');
const Comment=require('../Models/Comments');
const Video=require('../Models/Videos');
const {determineFileType}=require('../Public/JS/Script');
const {validateImageSchema}= require('../Middleware');

module.exports.AddImage = async(req,res)=>{
    let{id}=req.params;
    let roomInfo = await Room.findById(req.params.id);
    let File=req.file;
    validateImageSchema;
    let newImage= new Image({
        FileName:File.filename,
        FilePath:File.path
    });
    roomInfo.Images.push(newImage); 
    await newImage.save();
    await roomInfo.save();
    req.flash("success","Image added successfully!");
    res.redirect(`/Rooms/${id}`);
};

module.exports.DeleteImage = async(req,res)=>{
    let {id,MediaId}=req.params;
    await Room.findByIdAndUpdate(id,{$pull:{Images:MediaId}});
    await Image.findByIdAndDelete(MediaId);
    req.flash("success","Image deleted successfully!");
    res.redirect(`/Rooms/${id}`);
};

module.exports.ShowImage = async(req,res)=>{
    let {id,MediaId}=req.params;
    const roomInfo=await Room.findById(id);
    let media=await Image.findById(MediaId).populate({path:"Comments",populate:{path:"owner"}},) || await Video.findById(MediaId).populate({path:"Comments",populate:{path:"owner"}},);
    let FileType= determineFileType(media.FileName);
    res.render("ShowImage.ejs",{roomInfo,media,FileType});
};

module.exports.uploadMedia = async (req,res)=>{   
    try {

    let { id } = req.params;
    let roomInfo = await Room.findById(id);
    const files = req.files;
    // Arrays to store promises for saving images and videos
    const mediaPromises = [];

    for (const file of files) {
      console.log(file);
      if (file.mimetype.startsWith('image')) {
        validateImageSchema;
        const newImage = new Image({
          FileName: file.filename,
          FilePath: file.path
        });
        // Save the image and add its ID to the roomInfo
        mediaPromises.push(
          newImage.save().then(image => {
            roomInfo.Images.push(image._id);
          })
        );
      } else if (file.mimetype.startsWith('video')) {
        validateImageSchema;
        console.log("hi");
        const newVideo = new Video({
          FileName: file.filename,
          FilePath: file.path
        });
        // Save the video and add its ID to the roomInfo
        mediaPromises.push(
          newVideo.save().then(video => {
            roomInfo.Videos.push(video._id);
          })
        );
      }
    }

    // Wait for all media files to be saved
    await Promise.all(mediaPromises);

    // Save the roomInfo document once after all media files have been saved
    await roomInfo.save();

    req.flash("success", "Media added successfully!");
    res.redirect(`/Rooms/${id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
  

module.exports.AddComment = async(req,res)=>{
    let {id,MediaId}=req.params; 
    let media=await Image.findById(MediaId) || await Video.findById(MediaId);

    let NewComment = new Comment(req.body.Comment);
    NewComment.owner=req.user._id;

    media.Comments.push(NewComment);

    await NewComment.save();
    await media.save();

    res.redirect(`/Rooms/${id}/showImage/${MediaId}`);
};

module.exports.DeleteComment = async(req,res)=>{
  let {id,MediaId,CommentId}=req.params;
  await Image.findByIdAndUpdate(MediaId,{$pull:{Comments:CommentId}});
  await Comment.findByIdAndDelete(CommentId);
  req.flash("success","Comment deleted successfully!");
  res.redirect(`/Rooms/${id}/showImage/${MediaId}`);
};