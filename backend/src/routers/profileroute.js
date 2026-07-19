const express = require('express');
const profileroute = express.Router();
const bcrypt = require('bcrypt');
const { validatePassword } = require('../utils/validation'); 
const auth = require('../middlewares/auth');
const Profile = require('../utils/profileschema');
const User = require('../utils/db');

profileroute.get('/profile', auth, async (req, res) => {
    try {
        console.log('Authenticated user:', req.user);
        console.log('User ID:', req.user._id);
        
        const user = await User.findById(req.user._id);
        const profile = await Profile.findOne({ userId: user._id });
        if (!profile || !user) {
            return res.status(404).json({ error: 'User or profile not found' });
        } 
        else {
        res.status(200).json({ ...user._doc, ...profile._doc });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }   
});

profileroute.put('/editprofile', auth, async (req, res) => {
    try {
        const { firstName, lastName, bio, age, skillsAndExpertise, role, profilepicture, avatarcolor } = req.body;
        const userId = req.user._id;
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const profile = await Profile.findOne({ userId: userId });
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.age = age || user.age; 
        profile.bio = bio || profile.bio;
        profile.skillsAndExpertise = skillsAndExpertise || profile.skillsAndExpertise;
        profile.role = role || profile.role;
        profile.profilepicture = profilepicture || profile.profilepicture;
        profile.avatarcolor = avatarcolor || profile.avatarcolor;

        await user.save();
        await profile.save();
        res.status(200).json({ message: 'Profile updated successfully', ...user._doc, ...profile._doc });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

profileroute.put('/security', auth, async (req, res) => {
    try {
        const userId = req.user._id;
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        const { oldPassword, newPassword } = req.body;
        console.log('newPassword:', newPassword);
        
        try {
            if (!validatePassword(newPassword)) {
                return res.status(400).json({ error: 'New password is invalid' });
            }
        } catch (error) {
            return res.status(400).json({ error: 'New password is invalid' });
        }
        
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Old password is incorrect' });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        
        await user.save();
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = profileroute;