const mongoose = require('mongoose');


const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        
    },
    bio: {
        type: String,
        default: ""
    },
    skillsAndExpertise: {
        type: [String],
        default: []
    },
    role: {
        type: String,
        default: "employee"
    },
    profilepicture: {
        type: String,
        default: ""
    },
    avatarcolor: {
        type: String,
        default: ""
    }
});

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;