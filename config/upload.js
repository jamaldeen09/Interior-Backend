const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => ({
        folder: 'products',
        allowed_formats: ['jpg', 'png', 'jpeg'],
        transformation: { width: 500, height: 500, crop: 'limit' }
    })
});

const parser = multer({ storage: storage });
module.exports = parser;