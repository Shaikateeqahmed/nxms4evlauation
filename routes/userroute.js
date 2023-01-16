const express = require("express");
const {UserModel} = require("../models/usersmodel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const user = express.Router();

user.post("/register",async(req,res)=>{
    let {name,email,gender,password}=req.body;
    try{
        bcrypt.hash(password,5,async(err,hash)=>{
            if(hash){
                let user = new UserModel({name,email,gender,password:hash});
                await user.save();
                res.json("signup succesfully ")
            }
        })
    }catch(err){console.log(err.massage)};
})

user.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try{
        let user = await UserModel.find({email});
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(err){
                    res.json("Invalid email or password");
                }else{
                    let token = jwt.sign({userID:user[0]._id},process.env.key);
                    res.json(token);
                }
            })
        }
    }catch(err){console.log(err.massage)};
})

module.exports={user};