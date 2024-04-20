const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');

const port = process.env.PORT || 3029;

const User = require("./public/userSchema");
const { db } = require("./public/textConnection");

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Setarea directorului static
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/sign_up", (req, res) => {
    const { name, email, phno, password } = req.body;

    const newUser = new User({
        name,
        email,
        phno,
        password
    });

    newUser.save().then(() => {
        console.log("Record Inserted Successfully");
        return res.redirect('/signup_succes.html');
    }).catch((err) => {
        console.error("Error saving user:", err);
        return res.status(500).send("Error saving user");
    });
});

app.get("/signup_succes.html", (req, res) => {
    return res.sendFile(path.join(__dirname, 'public', 'signup_succes.html'));
});

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    });
    return res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const server = app.listen(port, () => {
    console.log(`Serverul rulează la adresa http://localhost:${port}/`);
});
