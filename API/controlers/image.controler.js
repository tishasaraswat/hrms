const multer = require('multer');      //library of express use for uploading image on server
const path = require('path');          //node js ka cor module h, jo ki file se related working krta h
const ImageModel = require("../models/image.model");

const storage = multer.diskStorage({   //function jo ki ek storage h
    destination: function (req, file, cb) {                          //costom code=  destination, filename//cb ek call back function h joki decide krta h ki image kha store hogi
        cb(null, './uploads'); // Destination folder for uploads
    },
    filename: function (req, file, cb) {                                 
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // File naming   , image-2024-04-08.jpg
    }
});

const upload = multer({ storage: storage });
exports.uploadImage = async (req, res) => {
    upload.single('image')(req, res, async (err) => {
        const { title, image_description } = req.body;
        const imagePath = req.file.path;

        // Create a new image document
        const newImage = new ImageModel({
            title,
            image: imagePath,
            image_description
        });
        // Save the image document to the database
        try {
            // Save the image document to the database
            await newImage.save();
            res.send('Image uploaded successfully');
        } catch (err) {
            res.status(500).send(err);
        }
    });
}



