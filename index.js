const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

//Require route files
const userRoute = require('./Routes/User');
const postRoute = require('./Routes/Dashboard');

//dotenv middleware
dotenv.config();
//Connect to database
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true}, () => console.log('connected to database'));

//middleware for bodyparser
app.use(express.json());

app.use('/api/user', userRoute);


const PORT = 3000;

app.listen(PORT, console.log(`App started at ${PORT}`));