const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const listenToPort = 3000;
const databaseURL= 'mongodb+srv://tharaka:11027@veg-zpjwl.mongodb.net/veg?retryWrites=true&w=majority';

const suggestedListRoute = require('./Routers/suggestedList');
const favouriteListRoute = require('./Routers/favouriteList');

//Use Body Parser
app.use(bodyparser.json());

app.use('/suggestedlist', suggestedListRoute);
app.use('/favouritelist', favouriteListRoute);



app.get('/', (req,res)=> {
    res.send('This is home');
});


mongoose.connect(
    databaseURL,{ useNewUrlParser: true ,useUnifiedTopology: true },()=> {
    console.log('Connected to DB');
});

//Listening to the request
app.listen(listenToPort);
