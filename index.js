const express= require("express");
const cors = require("cors");
require("dotenv").config();
const {connection} = require("./config/db.js");
const {user} = require("./routes/userroute.js");
const {authenticate} = require('./middlewares/authenticate.js');
const {post} = require("./routes/postrouter.js");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/users",user);
app.use(authenticate);
app.use("/posts",post);





app.listen(3500,async()=>{
    await connection;
    console.log(`Server is running on ${process.env.port}`)
})