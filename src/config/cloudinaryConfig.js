const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: 'dpf3ly5ux',
  api_key: '512682476614917',
  api_secret: 'TC2c1I0Um8Z7rBuALZ0J7iSC3Qac',
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => ({
    folder: 'ggpost-icons',
    allowed_formats: ['jpg', 'png', 'webp'],
    public_id: `${Date.now()}-${file.originalname.replace(/\.[^/.]+$/, '')}`,
  }),
});

module.exports = {
  cloudinary,
  storage,
};
