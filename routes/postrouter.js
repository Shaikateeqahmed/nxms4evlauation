const express = require("express");
const {PostModel} = require("../models/postmodel.js");
const post = express.Router();

post.get("/get",async(req,res)=>{
   let userID= req.body.userID;
   try{
    let user = await PostModel.find({userID:userID});
    res.json(user);
   }catch(err){console.log(er.massage)};
})

post.post("/",async(req,res)=>{
    let data = req.body;
    try{
     let post = new PostModel(data);
     await post.save();
     res.json('post added');
    }catch(err){console.log(err.massage)};
})
post.patch("/update/:id",async(req,res)=>{
    let payload = req.body;
    let ID = req.params.id;
    try{
        let post = await PostModel.find({_id:ID});
        console.log(post);
        let userID_in_post = post[0].userID;
        let userID_in_req = req.body.userID;
        console.log(userID_in_req);
        if(userID_in_post!=userID_in_req){
            res.json("You are not authorizased");
        }else{
            await PostModel.findByIdAndUpdate({_id:ID},payload);
            res.json(`post having ID ${ID} is updated`);
        }
    }catch(err){
        console.log(err);
    }
})

post.delete("/delete/:id",async(req,res)=>{
   
    let ID = req.params.id;
    try{
        let post = await PostModel.find({_id:ID});
        console.log(post);
        let userID_in_post = post[0].userID;
        let userID_in_req = req.body.userID;
        if(userID_in_post!=userID_in_req){
            res.json("You are not authorizased");
        }else{
            await PostModel.findByIdAndDelete({_id:ID});
            res.json(`post having ID ${ID} is Deleted`);
        }
    }catch(err){
        console.log(err.massage);
    }
})
module.exports={post};