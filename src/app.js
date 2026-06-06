
const express = require ('express')
const app = express();
const validator = require('validator');
const bcrypt = require('bcrypt');
const { validateUser } = require('./utils/validtation');

 const User = require('./db');

const PORT = 3131; 

app.listen( 
    PORT, () => {
        console.log(`server is running on port ${3131}`)
    }
);

app.use(express.json());

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
            res.send('Login successful');
        } else {
            throw new Error('Invalid password');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
 
