const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "le nom est requis"],
    },
    firstname: {
        type: String,
        required: [true, "le prénom est requis"],
    },
    email: {
        type: String,
        required: [true, "le mail est requis"],
    },
    password: {
        type: String,
        required: [true, "Un mot de passe est requis"],
    },
    projectCollection: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projects'
    }]
})

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;