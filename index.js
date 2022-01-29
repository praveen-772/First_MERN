require("dotenv").config({path:"./config.env"});
const express = require('express')
const app = express()
const mongoClient = require('mongodb').MongoClient
const cors = require('cors');
var db = require('./config/db_connection');
const PORT = process.env.PORT;
const path = require('path');


db.connect((err)=>{
    if(err) console.log("External File Database Connection Error"+err);
    else console.log("External File Database Connected Successfully");
})

// const url = "mongodb+srv://praveen_772:praveen_772@cluster0.clivr.mongodb.net/MERN?retryWrites=true&w=majority"
    
app.use(cors());
app.use(express.json());

app.get("/getUsers",async(req,res)=>{
    // const client = new mongoClient(url);
    // await client.connect();
    // const database = client.db("MERN");
    const users = await db.get().collection('users').find({}).toArray()
    res.json(users)
})

app.post("/createUser",async(req,res)=>{
    const user = req.body;
    // const client = new mongoClient(url);
    // await client.connect();
    // const database = client.db("MERN");
    const users = await db.get().collection('users').insertOne(user);
    console.log(user);
})

app.post("/deleteUser",async(req,res)=>{
    const usertoDelete = req.body.DeleteUser;
    console.log(usertoDelete);
    // const client = new mongoClient(url);
    // await client.connect();
    // const database = client.db("MERN");
    await db.get().collection('users').deleteOne({name:usertoDelete})
    console.log("User deleted Successfully");
})

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,'/client/build')));
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'client','build','index.html'));        
    })
}
else{
    app.get('/',(req,res)=>{
        res.send("Else part of - if process.env.NODE_ENV === production ");
    })
}

app.listen(PORT, (err)=>{
    if(err){ return console.log("Error due to : "+err);}
    // const client = new mongoClient(url);
    // await client.connect();
    // const database = client.db("MERN")
    // const users = await db.get().collection('users').find({}).toArray()
    console.log(`Node JS Server Started on Port NO: ${PORT}`);
    console.log("Mongodb Cloud Database Connected Successfully");
    console.log("----------------------------------------------------------");
    // console.log(users);
    console.log("----------------------------------------------------------");
    // const user = await db.get().collection('users').findOne({name:"Praveen"})
    console.log("----------------------------------------------------------");
    // console.log(user);
    console.log("----------------------------------------------------------");
    // await client.close();
});