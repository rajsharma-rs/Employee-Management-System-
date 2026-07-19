const validator = require('validator');

const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

const validateUser = (req) => {
    const { firstName, lastName, age, email, password } = req.body;
    if (!firstName || !lastName || !age || !email || !password) {
        throw new Error('All fields are required');
    }
    if (typeof email !== 'string' || !email.includes('@')) {
        throw new Error('email include @');
    }
    if (!validatePassword(password)) {
        throw new Error('Password is not strong enough');
    }
};

module.exports = { validateUser, validatePassword };