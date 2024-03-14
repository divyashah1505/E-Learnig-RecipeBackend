const express = require('express');
const router = express.Router();
const videosController = require('../../Customer/Controllers/videosController');

// Route to get videos for a particular category
router.get('/categories/:categoryId/videos', videosController.getCategoryVideos);
// Route to get video file
router.get('/videos/:videoFileName', videosController.getVideo);
// Route to get thumbnail image
router.get('/thumbnails/:thumbnailFileName', videosController.getThumbnailImage);
module.exports = router;
