
const express = require ('express')
const app = express();
const validator = require('validator');
const bcrypt = require('bcrypt');
const { validateUser } = require('../utils/validtation');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
 const User = require('./db');
const { HttpProxy } = require('vite');

const PORT = 3131; 

app.listen( 
    PORT, () => {
        console.log(`server is running on port ${3131}`)
    }
);

app.use(express.json());
app.use(cookieParser());




app.post('/signup', async (req, res) => { 
    try {
        const validate = validateUser(req);
        const { name, age, email } = req.body;
        const password = req.body.password;

        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            age, 
            email,
            password: passwordHash
        });

        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/login', async (req, res) => {
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
 

app.get('/profile', async (req, res) => {
    try {
    const cookie = req.cookies;
    const { token } = cookie;
    console.log("raw token : ", JSON.stringify(token));
    if (!token) { 
        throw new Error('No token found');
    }
console.log("token received is " + token); 
    const decoded = jwt.verify(token, 'ems$6020');
    const {_id} = decoded;
    console.log("logged in user is " + _id);

    const user = await User.findById(_id);
    if (!user) {
        throw new Error('User not found');
    }
    res.json(user);
    } catch (err) {
        res.status(400).send({ "error": err.message });
    }
});
