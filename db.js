const mongoose = require('mongoose');
require('dotenv').config();

// Define mongoose connection url
//const mongURL = process.env.MONGODB_URL_LOCAL  // 'hotels' is database name
const mongURL = process.env.MONGODB_URL;

// Setup mongodb connection
mongoose.connect (mongURL, {
    useNewUrlParser: true,
    useunifiedTopology: true
})

// Get the default connection
// Mongoose maintain a default connection object representing mongodb connections

const db = mongoose.connection;

// Define event listener for database connection
db.on('connected', () => {
    console.log('Connected to MongoDB server')
});

db.on('Error', (err) => {
    console.error('MongoDB connection error:',err)
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected')
});

//Export the database connection
module.exports = db;