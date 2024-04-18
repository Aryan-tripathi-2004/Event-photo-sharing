const Room = require('../Models/Rooms');

module.exports.showEvents = async(req,res)=>{
    const Rooms= await Room.find({});
    res.render('Gallery',{Rooms})
};

module.exports.AddEventForm = (req,res)=>{
    res.render("NewRoom.ejs");
};

module.exports.Event = async(req,res)=>{
    let{id}=req.params;
    const roomInfo=await Room.findById(id).populate("Images").populate("owner");
    if(!roomInfo){
        req.flash("error","Event you requeted for does not exist!"); 
        res.redirect("/Rooms");
    }
    res.render("Images.ejs",{roomInfo});
};

module.exports.CreateEvent = async(req,res)=>{
    let NewRoom=new Room(req.body.room);
    NewRoom.owner=req.user._id;
    NewRoom.save();
    req.flash("success","New Event Created");
    res.redirect("/Rooms");
};

module.exports.EditEventInfoForm = async(req,res)=>{
    let{id}=req.params;
    const roomInfo=await Room.findById(id);
    res.render("EditRoomInfo",{roomInfo});
};

module.exports.UpdateEvent = async(req,res)=>{
    let{id}=req.params;
    await Room.findByIdAndUpdate(id,{...req.body.room}); 
    req.flash("success","Event details updated successfully!");
    res.redirect(`/Rooms/${id}`);
};

module.exports.DeleteEvent = async(req,res)=>{
    let{id}=req.params;
    await Room.findByIdAndDelete(id);
    req.flash("success","Event deleted successfullly");
    res.redirect("/Rooms");
};