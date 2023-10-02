const express = require('express');
const videoController = require('../controllers/videoController');
const router = express.Router();

// Initialize stream by creating a new session Id
router.get('/initialize-recording', videoController.initializeRecording);

// Start streaming video
router.post('/stream-video/:sessionId', videoController.upload.single('videoDataChunk'), videoController.streamVideo);

// Stop streaming video and save video locally
router.post('/stop-recording/:sessionId', videoController.stopRecording);

// Get video stream
router.get('/video-stream/:sessionId', videoController.getVideoStream);

module.exports = router;
