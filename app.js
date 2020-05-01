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


app.use((req,res,next)=>{

    const error = new Error();
    error.status=404;
    error.messsage = 'Not Found';
    next(error);
});

app.use ((error,req,res, next)=>{

   res.status(error.status || 500);
    console.log("this is from the second function");
   res.json({
       error: {
           messsage: error.messsage
           
       }
   });
});

app.get('/', (req,res)=> {
    res.send('This is home');
});



mongoose.connect(
    databaseURL,{ useNewUrlParser: true ,useUnifiedTopology: true },()=> {
    console.log('Connected to DB');
});

//Listening to the request
app.listen(listenToPort);
