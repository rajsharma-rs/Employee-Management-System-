const  mongoose = require("mongoose");


mongoose.connect("mongodb+srv://RAJSHARMA:sarmaa3109@cluster0.m6lkti4.mongodb.net/?appName=Cluster0")
.then(() => console.log("connected"))
.catch(err => console.log("error;" , err.message));

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        default: null
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true, 
        
    }
}); 

const User = mongoose.model("User", userSchema);
 
module.exports = User; 
   