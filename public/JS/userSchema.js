const mongoose = require("mongoose");

// Definirea schemei pentru modelul utilizatorului
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Adaugă această opțiune pentru a asigura că fiecare email este unic în baza de date
    },
    phno: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Definirea modelului utilizatorului folosind schema definită mai sus
const User = mongoose.model("User", userSchema);

module.exports = User;
