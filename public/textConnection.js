const mongoose = require("mongoose");

// Hardcodează URL-ul de conexiune la baza de date MongoDB în cloud
const uri = "mongodb+srv://marioviman:2JkbbBt@webdev.cewyhzf.mongodb.net/?retryWrites=true&w=majority&appName=WebDev";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"));

module.exports = { db };
