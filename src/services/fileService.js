const fs = require('fs').promises;
const path = require('path');

const uploadDir = path.join(__dirname, '../../icons');

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

// Inicializar el directorio de uploads
initializeUploadDir();

module.exports = {
    uploadFile
}; 