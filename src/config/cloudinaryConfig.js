const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: 'dpf3ly5ux',
  api_key: '512682476614917',
  api_secret: 'TC2c1I0Um8Z7rBuALZ0J7iSC3Qac',
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'ggpost-icons',
    allowed_formats: ['jpg', 'png', 'webp'],
    public_id: (req, file) => file.originalname,
  },
});

module.exports = {
  cloudinary,
  storage,
};
