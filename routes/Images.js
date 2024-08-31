const express=require("express");
const router=express.Router({mergeParams: true});
const wrapAsync=require('../Utils/wrapAsync');
const Image=require('../Models/Images');
const Room=require('../Models/Rooms');
const multer  = require('multer');
const {validateImageSchema,isLoggedIn,isOwner}=require('../Middleware');

const ImageController = require('../Controllers/Images');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/Images')
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) 
        cb(null, `${Date.now()}-${file.originalname}`);
    }
  })
  
const upload = multer({ storage: storage});

//add Images
router.post('/AddImages',isLoggedIn,isOwner,upload.array('room[Image]'),ImageController.uploadMedia);

//delete image
router.post('/AddImages/:MediaId',isLoggedIn,isOwner,wrapAsync(ImageController.DeleteImage));

//show image
router.get('/showImage/:MediaId',wrapAsync(ImageController.ShowImage));

//Add New Comment
router.post('/AddImages/:MediaId/Comments',isLoggedIn,wrapAsync(ImageController.AddComment));

//Delete Comment
router.post('/showImage/:MediaId/Comment/:CommentId',isLoggedIn,wrapAsync(ImageController.DeleteComment));


module.exports=router;