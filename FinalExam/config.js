const mongoose = require('mongoose')

const url = 'mongodb+srv://babarranjha444:babar@mern.pzkl2ng.mongodb.net/mern'
const connectDB = async()=>{
    // mongoose.connect(url, {useNewUrlParser:true})
    mongoose.connect(url)
    const con = mongoose.connection
    con.on('open', function(){
        console.log("connected to Mongo...")
    })
}

module.exports = connectDB;