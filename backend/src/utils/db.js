const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/test";

mongoose.connect(MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        default: null
    },
    role: {
        type: String,
        default: "employee"
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;