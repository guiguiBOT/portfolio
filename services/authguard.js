const userModel = require('../src/models/userModel');

const authguard = async (req, res, next) => {
    try {
        if (req.session.user) {
            let user = await userModel.findOne({ email: req.session.user.email });
            if (user) {
                return next();
            }
        }
        throw new Error('Utilisateur non connecté');
    } catch (error) {
        console.error(error.message);
        res.status(401).render('../views/login/login.html.twig',
        {
            title:"Page de login",
            errorAuth: error.message
        });
    }
};

module.exports = authguard;