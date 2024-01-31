const mongoose = require('mongoose') ;

mongoose.connect("mongodb://0.0.0.0:27017/ecommerce-api") ;

const db = mongoose.connection;

// on unsuccessfull connection
db.on('error',console.error.bind(console,"Error connecting to MongoDB"));


//on succesfull connection
db.once('open',function(){
    console.log("*** Connected to Database :: MongoDB ***");
});

module.exports = db;


