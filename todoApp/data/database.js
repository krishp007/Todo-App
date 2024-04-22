const mongoose = require('mongoose');

const connectDB = ()=>{
    mongoose
    .connect("mongodb://127.0.0.1:27017",{
        dbName: "todoApp",
    })
    .then(()=> console.log("Database connected"))
    .catch((e)=> console.log(e));
}

module.exports = connectDB;