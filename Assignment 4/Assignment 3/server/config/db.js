require('dotenv').config({})
const mongoose = require('mongoose')

const url = process.env.MONGO_URL
const connectDB = async()=>{
    mongoose.connect(url)
    const con = mongoose.connection
    con.on('open', function(){
        console.log("connected to Mongo...")
    })
}

module.exports = connectDB;