const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB Local
mongoose.connect("mongodb://127.0.0.1:27017/portfolioDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Create Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

// Create Model
const Contact = mongoose.model("Contact", contactSchema);

// Route
app.post("/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const newContact = new Contact({
            name,
            email,
            message
        });

        await newContact.save();

        res.json({ success: true, message: "Message Saved!" });
    } catch (error) {
        res.status(500).json({ success: false });
    }
});

// Start Server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});