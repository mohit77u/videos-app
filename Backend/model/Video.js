const mongoose = require("mongoose");
const videoSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "The title field is required"]
    },
    description: {
        type: String,
        required: [true, "The description field is required"]
    },
    user_id: {
        type: String,
        required: [true, "The name field is required"]
    },
    video_url: {
        type: String,
        unique: true,
        required: true,
    },
    category: {
        type: String,
        required: [true, "The sub total field is required"]
    },
}, { timestamps: true });


const Video = mongoose.model("videos", videoSchema);
module.exports = Video;