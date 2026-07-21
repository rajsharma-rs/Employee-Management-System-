const express = require('express');
const authRoutes = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateUser } = require('../utils/validation');
const User = require('../utils/db');
const auth = require('../middlewares/auth');
const Profile = require('../utils/profileschema');

authRoutes.post('/signup', async (req, res) => { 
    try {
        const validate = validateUser(req);
        const { fullName, age, email } = req.body;
        const password = req.body.password;

        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            fullName,
            age,
            email,
            password: passwordHash
        });

        await user.save();

        const profile = new Profile({
            userId: user._id,
            bio: '',
            skillsAndExpertise: [],
            role: '',
            profilepicture: '',
            avatarcolor: ''
        });
        await profile.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

authRoutes.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error('User not found');
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {  

            const token = jwt.sign({ _id: user._id }, 'ems$6020');
            console.log(token);
            res.cookie('token', token , { httpOnly: true , secure: false});
            
            res.send('cookies set!!!!!!');
            
        } else {
            throw new Error('Invalid password');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

authRoutes.get('/employee', auth, async (req, res) => {

    try { const user = req.user;
        if (!user) {
            throw new Error('User not found');
        }
        res.send(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

authRoutes.post('/logout',async  (req, res) => {
    try {
        res.clearCookie('token', null,{
            expires: new Date((Date.now() )),
            httpOnly: true,
            secure: false
        });
        res.send('Logged out successfully');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = authRoutes;

