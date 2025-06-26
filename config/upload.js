const multer = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary")

const cloudinary = require("./clodinary")

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "products",
        allowed_formats: ["jpg", "png", "jpeg"],
        transformations: [{ width: 50, height: 500, crop: "limit" }]
    },
})

const parser = multer({ storage: storage })
module.exports = parser;