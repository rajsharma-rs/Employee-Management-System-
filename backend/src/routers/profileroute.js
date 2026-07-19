const express = require('express');
const profileroute = express.Router();
const auth = require('../middlewares/auth');
const Profile = require('../utils/profileschema');
const User = require('../utils/db');

profileroute.get('/profile', auth, async (req, res) => {
    try {
        console.log('Authenticated user:', req.user);
        console.log('User ID:', req.user._id);
        
        const user = await User.findById(req.user._id);
        const profile = await Profile.findOne({ userId: user._id });
        res.status(200).json({ user, profile });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }   
});

module.exports = profileroute;