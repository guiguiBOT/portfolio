const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const mainRouter = require("./src/routers/mainRouter");
const userRouter = require('./src/routers/userRouter');
const projectRouter = require('./src/routers/projectRouter');
require('dotenv').config();
const app = express();
app.use(express.static("./assets"));
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'ma_cle_secrete',
    resave: true,
    saveUninitialized: true,
}));
app.use(mainRouter);
app.use(userRouter);
app.use(projectRouter);
app.listen(process.env.PORT, (err)=>{
    if(err) {
        console.log(err);
    } else {
        console.log("Connecté au serveur !");
    }
});

mongoose.connect(process.env.URIBDD);

