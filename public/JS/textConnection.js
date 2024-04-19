const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const User = require("/JS/userSchema"); // Importarea modelului User

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

// Hardcodează URL-ul de conexiune la baza de date MongoDB în cloud
const uri = "mongodb+srv://marioviman:<password>@webdev.cewyhzf.mongodb.net/?retryWrites=true&w=majority&appName=WebDev";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"));

app.post("/sign_up", (req, res) => {
    const { name, email, phno, password } = req.body;

    const newUser = new User({
        name,
        email,
        phno,
        password
    });

    newUser.save((err) => {
        if (err) {
            console.error("Error saving user:", err);
            return res.status(500).send("Error saving user");
        }
        console.log("Record Inserted Successfully");
        return res.redirect('/HTML/signup_success.html');
    });
});

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    });
    return res.redirect('/HTML/authentication.html');
});

const PORT = process.env.PORT || 3029;
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});
