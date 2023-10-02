const express = require('express');
const videoController = require('../controllers/videoController');
const router = express.Router();

// initialize stream by creating a new session Id
router.get('/initialize-stream', videoController.initializeRecording);

// start streaming video
router.post('/start-stream/:sessionId', videoController.streamVideo);

// Stop streaming video and save video locally
router.post('/stop-stream/:sessionId', videoController.stopRecording);

// Get video stream
router.get('/stream/:sessionId', videoController.getVideoStream);

module.exports = router;
