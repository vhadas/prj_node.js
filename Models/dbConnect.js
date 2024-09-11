const mongoose = require('mongoose')
// Replace the uri string with your connection string.
const uri ="mongodb+srv://avitalsty:325937381@cluster0.cyvez.mongodb.net/"
//const uriLocal = "mongodb://127.0.0.1:27017/toysAvital";

const connectDB = async () => {
    await mongoose.connect(uri);
};
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
})
database.once('connected', () => {
    console.log('Database Connected');
})
module.exports=connectDB;