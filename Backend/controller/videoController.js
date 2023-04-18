const VideoModel = require("../model/Video");

// upload video
exports.getUserVideos = async(req, res) => {
  try {
      const userId = req.userData._id;
      VideoModel.find({user_id: userId})
      .then((data) => {
        if (!data) {
          return res.status(404).send({
            status: false,
            message: "Videos not found ",
          });
        } else {
          res.status(200).send({
            status: true,
            data: data,
            message: "Videos found successfully.",
          });
        }
      })
  } catch (err) { 
      return res.status(500).send({
          message: "Error on getting videos",
          err: err,
      });
  }
};

// get all videos
exports.getAllVideos = async(req, res) => {
  try {
      VideoModel.find()
      .then((data) => {
        if (!data) {
          return res.status(404).send({
            status: false,
            message: "Videos not found ",
          });
        } else {
          res.status(200).send({
            status: true,
            data: data,
            message: "Videos found successfully.",
          });
        }
      })
  } catch (err) { 
      return res.status(500).send({
          message: "Error on getting videos",
          err: err,
      });
  }
};