
const express = require ('express')
const app = express();
const cookieParser = require('cookie-parser');
const { HttpProxy } = require('vite');

const PORT = 3131; 

app.listen( 
    PORT, () => {
        console.log(`server is running on port ${3131}`)
    }
);

app.use(express.json());
app.use(cookieParser());

app.use('/auth', require('./src/routers/authentication'));
app.use('/attendance', require('./src/routers/attendanceroute'));
app.use('/task', require('./src/routers/tasksroute'));
app.use('/profile', require('./src/routers/profileroute'));