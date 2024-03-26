const userRouter = require('express').Router();
const userModel = require('../models/userModel');
const authguard = require('../../services/authguard');
const bcrypt = require('bcrypt');
const projectModel = require('../models/projectModel');
const { Collection } = require('mongoose');

//  route pour générer la page de login.html.twig
userRouter.get('/login', (req, res) => {
    res.render('login/login.html.twig',
        {
            title: "connexion Portfolio"
        })
})

// //  route pour générer la page admin.html.twig
// userRouter.get('/admin', authguard, async(req, res) => {
//     res.render('../views/admin/admin.html.twig')
// })

// route pour l'authentification de l'administrateur
userRouter.post('/login', async (req, res) => {
    try {
        // console.log(req.body);
        let user = await userModel.findOne({ email: req.body.email });
        if (user) {
            // console.log(user);
            if ( bcrypt.compareSync(req.body.password, user.password)) {
                req.session.user = user;
                res.redirect('/admin');
            } else {
                throw { password: "Mauvais mot de passe" };
            }
        } else {
            throw { email: "Cet utilisateur n'est pas enregistré" };
        }
    } catch (error) {
        // console.log(error)
        res.render('../views/login/login.html.twig',
            {
                title: "Page de login",
                error: error
            })
    }
})



module.exports = userRouter;