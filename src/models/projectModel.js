const mongoose = require('mongoose');
const userModel = require('./userModel');

const projectSchema = mongoose.Schema({
    _user: {
        type: String,
    },
    title: {
        type: String,
        required: [true, "Le titre est requis"],
    },
    description: {
        type: String,
        required: [true, "Une description est requise"],
    },
    github: {
        type: String,
        required: [true, "Un lien github est requis"],
    },
    urlProject: {
        type: String,
        required: [true, "URL du projet requise"],
    },
    urlPicture: {
        type: String,
        required: [true, "URL de la miniature requise"],
    }
})
// a tester je ne sais pas si la fonction est dans le bon fichier
projectSchema.pre('save', async function (next) {
    await userModel.updateOne(
        { _id: this._user },
        { $addToSet: { projectCollection: this._id }}
    );
    next();
})

const projectModel = mongoose.model('projects', projectSchema);
module.exports = projectModel;