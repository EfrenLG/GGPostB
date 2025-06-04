const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: 'dpf3ly5ux',
  api_key: '958536579359381',
  api_secret: 'agDaOAY4pYI105OOKi6Yffh3D-A',
});
console.log("Cloudinary configurado correctamente");

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    if (!file.originalname) {
      throw new Error("originalname no está definido en el archivo recibido por Multer");
    };
    const cleanName = file.originalname.replace(/\.[^/.]+$/, '');
    const id = `${Date.now()}-${cleanName}`;
    console.log("Public ID generado para Cloudinary:", id); // 👈 Añadir este log
    return {
      folder: 'ggpost-icons',
      public_id: id,
    };
  }
});

module.exports = {
  cloudinary,
  storage,
};
