const express = require('express')
const app = express()
const mongoClient = require('mongodb').MongoClient
const cors = require('cors');
var db = require('./config/db_connection');
const path = require('path')
const PORT = process.env.PORT || 5000;

db.connect((err)=>{
    if(err) console.log("External File Database Connection Error"+err);
    else console.log("External File Database Connected Successfully");
})

// const url = "mongodb+srv://praveen_772:praveen_772@cluster0.clivr.mongodb.net/MERN?retryWrites=true&w=majority"
    
app.use(cors());
app.use(express.json());

app.get("/",async(req,res)=>{
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

if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,'client','build','index.html'));
    })
}

// app.use(express.static(path.join(__dirname,'../build')))
// app.get('*',(req,res)=>{
//     res.sendFile(path.join(__dirname,'../build'))
// })

app.listen(PORT,async ()=>{
    // const client = new mongoClient(url);
    // await client.connect();
    // const database = client.db("MERN")
    // const users = await db.get().collection('users').find({}).toArray()
    console.log("Node JS Server Started on Port "+PORT);
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