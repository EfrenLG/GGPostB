const fs = require('fs').promises;
const Post = require('../models/postModel');
const path = require('path');

const uploadDir = path.join(__dirname, '../../post');

async function initializeUploadDir() {
    try {
        await fs.access(uploadDir);
    } catch {
        await fs.mkdir(uploadDir, { recursive: true });
    }
};

async function uploadFile(file) {

    const filePath = path.join(uploadDir, file.originalname);
    await fs.writeFile(filePath, file.buffer);
    return file.originalname;
};

async function updateUserPost(id, tittle, description, categories) {
    try {

        const res = await Post.findByIdAndUpdate(id, { tittle: tittle, description: description, categories: categories });
        console.log('Post actualizado:', res);
    } catch (err) {
        console.error('Error al actualizar Post:', err);
    }
};

async function updatePostView(id) {
    try {

        const res = await Post.findById(id);

        const val = res.views + 1;

        const reschange = await Post.findByIdAndUpdate(id, { views: val });

        console.log('Post actualizado:', res);
    } catch (err) {
        console.error('Error al actualizar Post:', err);
    }
};

async function updatePostLike(id, userId) {
    try {
        const post = await Post.findById(id);

        const hasLiked = post.likes.includes(userId);

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            hasLiked
                ? { $pull: { likes: userId } }
                : { $addToSet: { likes: userId } },
            { new: true }
        );

        console.log('Post actualizado:', updatedPost);
        return updatedPost;
    } catch (err) {
        console.error('Error al actualizar Post:', err);
    };
};


// Inicializar el directorio de uploads
initializeUploadDir();

module.exports = {
    uploadFile, updateUserPost, updatePostView, updatePostLike
}; 