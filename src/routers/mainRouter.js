const express = require('express');
const mainRouter = require('express').Router();


mainRouter.get('/', (req, res)=>{
    try {
        res.render('home/index.html.twig')
    } catch (error) {
        res.send(error);
    }
});

module.exports = mainRouter;
