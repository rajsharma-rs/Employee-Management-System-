const validator = require('validator');
const validateUser = (req) => {
    const { firstName, lastName, age, email, password } = req.body;
    if (!firstName || !lastName || !age || !email || !password) {
        throw new Error('All fields are required');
    }
     else if (typeof email !== 'string' || !email.includes('@')) {
        throw new Error('email include @');

    } 
     
    else if (!validator.isStrongPassword(password)) {
        throw new Error('Password is not strong enough');
    }
};

module.exports = { validateUser };