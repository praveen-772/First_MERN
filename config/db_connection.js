const mongoClient = require('mongodb').MongoClient
const state = {db:null}

// For the Database connection

module.exports.connect = function(callback){
    const MONGO_URI = 'mongodb+srv://praveen_772:praveen_772@cluster0.clivr.mongodb.net/MERN?retryWrites=true&w=majority';
    const dbname = 'MERN';

    mongoClient.connect(MONGO_URI,(err,data)=>{
        if(err) return callback(err)

        state.db = data.db(dbname);
        callback();
    })
}

// For getting the Database

module.exports.get = function(){
    return state.db
}