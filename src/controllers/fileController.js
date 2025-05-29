const fileService = require('../services/fileService.js');

async function uploadFile(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No se ha proporcionado ningún archivo' });
        }

        const filename = await fileService.uploadFile(req.file);
        res.status(201).json({ message: 'Archivo subido exitosamente', filename });
    } catch (error) {
        console.error('Error al subir archivo:', error);
        res.status(500).json({ error: 'Error al subir el archivo' });
    }
};

module.exports = {
    uploadFile
}; 