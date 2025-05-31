const Usuario = require('../models/userModel');
const Post = require('../models/postModel');

async function getUser(id) {

    try {

        const usuario = await Usuario.findOne({ id });
        const post = await Post.find({ id });

        if (!post) {
            return res.status(401).json({ error: 'No tiene posts' + user._id });
        };

        const data = [{ usuario, post }];

        const mensaje = !usuario ? false : data;
        return mensaje;

    } catch (err) {

        console.error('Error al obtener usuarios:', err);
        throw err;
    }
};

async function updateUserIcon(id, file) {
    try {

        const res = await Usuario.findByIdAndUpdate(id, { icon: file });
        console.log('Usuario actualizado:', res);
    } catch (err) {
        console.error('Error al actualizar usuario:', err);
    }
};

async function updateUserPost(id, file, tittle, description) {
    try {

        const res = await Usuario.findByIdAndUpdate(id, { icon: file });
        console.log('Usuario actualizado:', res);
    } catch (err) {
        console.error('Error al actualizar usuario:', err);
    }
};

module.exports = { getUser, updateUserIcon, updateUserPost };