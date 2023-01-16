const jwt = require("jsonwebtoken");
require("dotenv").config();
const authenticate = (req,res,next)=>{
    let token = req.headers.authorization;
    if(token){
        jwt.verify(token,process.env.key,(err,decode)=>{
            if(err){
                res.json("login first");
            }else{
                let userID = decode.userID;
                console.log(userID);
                req.body.userID=userID;
                next();
            }
        })
    }else{
        res.json("Login first");
    }
}

module.exports={authenticate};