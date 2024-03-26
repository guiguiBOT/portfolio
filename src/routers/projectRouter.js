const projectRouter = require('express').Router();
const userModel = require('../models/userModel');
const projectModel = require('../models/projectModel');
const authguard = require('../../services/authguard');
const upload = require('../../services/multer');

projectRouter.get('/admin/create', authguard, async (req, res) => {
    // console.log(req.session.user._id);
    res.render('../views/admin/create/create.html.twig',
        {
            user: await userModel.findById(req.session.user._id)
        })
})

// route pour ajouter un projet à la db avec la gestion du nom de fichier image grace au module upload
projectRouter.post('/admin/create', authguard, upload.single("urlPicture"), async (req, res) => {
    try {
        const project = projectModel(req.body);
        project.urlPicture = req.file.filename;
        project.validateSync()
        await project.save();
        res.redirect('/admin')
    } catch (error) {
        res.render('../views/admin/create/create.html.twig',
            {
                user: await userModel.findById(req.session.user._id),
                error: error,
            })
    }
})

//  route pour générer la page admin.html.twig avec la collection de projets dans projectsCollection
projectRouter.get('/admin', authguard, async (req, res) => {
    const projectsCollection = await projectModel.find();
    console.log(projectsCollection);
    res.render('../views/admin/admin.html.twig',
        {
            projectsCollection: projectsCollection
        })
})

// route pour supprimer un projet de la db
projectRouter.get('/admin/delete/:id', authguard, async (req, res) => {
    try {
        await projectModel.findByIdAndDelete(req.params.id);
        res.redirect('/admin');
    } catch (error) {
        res.render('../views/admin/admin.html.twig',
            {
                errorDelete: "Erreur lors de la suppression du projet"
            })

    }
})

// route pour afficher la page de modification d'un projet
projectRouter.get('/admin/update/:id', authguard, async (req, res) => {
    try {
        const project = await projectModel.findById(req.params.id);
        res.render('../views/admin/update/update.html.twig',
            {
                project: project
            })
    } catch (error) {
        res.render('../views/admin/admin.html.twig',
            {
                errorUpdate: "Erreur lors de la modification du projet"
            })
    }
})

// route pour modifier un projet avec la gestion du nom de fichier image grace au module upload
projectRouter.post('/admin/update/:id', authguard, upload.single("changePicture"), async (req, res) => {
    try {
        console.log(req.file);
        if (req.file) {
            req.body.urlPicture = req.file.filename;
        }
        await projectModel.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/admin');
    } catch (error) {
        const project = await projectModel.findById(req.params.id);
        console.log(error);
        res.render('admin/update/update.html.twig',
            {
                project: project,
                error: error
            })
    }
})


// route post pour modifier un projet
// projectRouter.post('/admin/update/:id', authguard, async (req, res) => {
//     try {
//         await projectModel.findByIdAndUpdate(req.params.id, req.body);
//         res.redirect('/admin');
//     } catch (error) {
//         res.render('../views/admin/update/update.html.twig',
//             {
//                 error: error
//             })
//     }
// })

module.exports = projectRouter;