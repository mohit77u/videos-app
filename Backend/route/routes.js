const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userController = require("../controller/userController");
const orderController = require("../controller/orderController");
const videoController = require("../controller/videoController");

router.post("/add-user", userController.registerNewUser);
router.post("/login-user", userController.loginUser);
router.put("/update-user/:userId", userController.updateUserDetails);
router.get("/me", auth, userController.getUserDetails);
router.post("/add-order", auth, orderController.addOrder);
router.get("/get-order/:userId", auth, orderController.getOrder);
router.get("/user-videos", auth, videoController.getUserVideos);
router.get("/videos", videoController.getAllVideos);
router.use("/", require('./videoUpload'));

module.exports = router;