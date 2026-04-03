const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const User = require("./models/User");
const Event = require("./models/Event");

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 MongoDB Connection (IMPORTANT: replace with your own)
mongoose.connect("mongodb://127.0.0.1:27017/eventDB")
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err));

// ================= REGISTER =================
app.post("/register", async (req,res)=>{
    try{
        const user = new User(req.body);
        await user.save();
        res.json({message:"Registered successfully"});
    } catch{
        res.status(500).json({message:"Error"});
    }
});

// ================= LOGIN =================
app.post("/login", async (req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email,password});

    if(!user){
        return res.status(400).json({message:"Invalid credentials"});
    }

    res.json({name:user.name, role:user.role});
});

// ================= ADD EVENT =================
app.post("/add-event", async (req,res)=>{
    const event = new Event(req.body);
    await event.save();
    res.json({message:"Event added"});
});

// ================= USER EVENTS =================
app.get("/events/:email", async (req,res)=>{
    const events = await Event.find({userEmail:req.params.email});
    res.json(events);
});

// ================= ADMIN ALL EVENTS =================
app.get("/events/admin/all", async (req,res)=>{
    const events = await Event.find();
    res.json(events);
});

// ================= START =================
app.listen(5000, ()=> console.log("Server running on 5000"));