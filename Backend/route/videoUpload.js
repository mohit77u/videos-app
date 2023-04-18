const express = require("express");
const fileUpload = require("express-fileupload");
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const app = express();;
const fs = require('fs');
const VideoModel = require("../model/Video");
const auth = require("../middleware/auth");

app.use(fileUpload({
    useTempFiles: true,
    limits: {fileSize: 50 * 2024 * 1024},
}))

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

var filePath = './uploads/';

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file) {
            cb(null, filePath);
        }
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname;
        cb(null, fileName)
    }
});

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 2048576780, // 10 Mb
    },
    fileFilter: (req, file, cb) => {
        const fileSize = parseInt(req.headers['content-length']);
        console.log(fileSize)
        // if ((file.mimetype !== 'image/png' || file.mimetype !== 'image/jpg' || file.mimetype !== 'image/jpeg') && (fileSize >= 1048576)) {
        //     return cb(new Error('Only .png, .jpg and .jpeg format allowed! '));
        // } else {
        // }
        cb(null, true)
    }
});

router.post('/upload-video',auth, upload.single('file'), async (req, res) => {
    try {

        const body = req.body
        const file = req.file
        console.log(req.body)
        console.log(req.file)

        const path = filePath + file.originalname;

        await cloudinary.uploader.upload(path, { 
            public_id: file.originalname + '_' + Date.now(),
            resource_type: 'auto',
            folder: 'uploads',
        }, (error, result) => {
            if (error) {

                res.status(500).send({
                    status: false,
                    message: 'Error on uploading video',
                })

            } else {

                const NewVideo = new VideoModel({
                    'user_id'       : req.userData._id,
                    'title'         : body.title,
                    'description'   : body.description,
                    'category'      : body.category,
                    'video_url'     : result.secure_url,
                });
            
                let video = NewVideo.save();

                // Function to delete a file from a given path
                fs.unlink(path,(err) => {
                    if (err) {
                      console.log(err)
                    }
                });
  
                res.status(200).send({
                    status    : true,
                    data      : NewVideo,
                    message   : 'Video uploaded successfully',
                });
            }
        });

    }  
    catch (error) {

        res.status(500).json({
            status: false,
            error: error,
            message: 'Failed to upload file',
        });

    }
});

module.exports = router;