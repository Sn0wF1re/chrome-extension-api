const express = require('express');
const videoController = require('../controllers/videoController');
const router = express.Router();

/**
 * @swagger
 * /api/initialize-recording:
 *   get:
 *     summary: Get data from the API
 *     description: Initialize stream by creating a new session id.
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal server error
 */
router.get('/initialize-recording', videoController.initializeRecording);

/**
 * @swagger
 * /api/stream-video/{sessionId}:
 *   post:
 *     summary: post data to the API
 *     description: Start streaming video to the API.
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         description: The session ID parameter in the path.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success receiving chunk
 *       404:
 *         description: Session not found
 *       500:
 *         description: Stream failed
 */
router.post('/stream-video/:sessionId', videoController.upload.single('videoDataChunk'), videoController.streamVideo);

/**
 * @swagger
 * /api/stop-recording/{sessionId}:
 *   post:
 *     summary: post data to the API
 *     description: stop the stream and save the video locally
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         description: The session ID parameter in the path.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Video saved
 *       404:
 *          description: Session not found or no video chunks found
 *       500:
 *         description: Stop and save recording failed
 */
router.post('/stop-recording/:sessionId', videoController.stopRecording);

/**
 * @swagger
 * /api/video-stream/{sessionId}:
 *   get:
 *     summary: Get data from the API
 *     description: Retrieve data from the API.
 *     parameters:
 *       - in: path
 *         name: sessionId
 *         required: true
 *         description: The session ID parameter in the path.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal server error
 */
router.get('/video-stream/:sessionId', videoController.getVideoStream);

module.exports = router;
