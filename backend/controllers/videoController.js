const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');
const multer = require('multer');

const VideoStream = require('../models/Video');

const videoChunks = {};

const generateId = () => {
  return uuid();
};

const deleteFile = (filepath) => {
  fs.unlink(filepath, (err) => {
    if (err) {
      console.log(err);
    }
    console.log('File deleted', filepath);
  });
};

const sessionExists = async (sessionId) => {
  return await VideoStream.exists({ sessionId });
};

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const initializeRecording = async (req, res) => {
  try {
    const sessionId = generateId();
    await VideoStream.create({ sessionId });

    videoChunks[sessionId] = { data: [], timeout: null };
    res.status(201).json({ sessionId });
  } catch (err) {
    res.status(500).json({ err });
  }
};

const streamVideo = async (req, res) => {
  try {
    const { sessionId } = req.params;

    if (!sessionExists(sessionId)) {
      return res.status(404).json({ err: 'Session not found' });
    }
    console.log('Received chunk, session exists: ', sessionId);

    const videoDataChunk = req.file.buffer; // Use req.file.buffer to access the uploaded file data
    videoChunks[sessionId].data.push(videoDataChunk);
    console.log('videoChunks: ', videoChunks[sessionId].data[0]);

    if (videoChunks[sessionId].timeout) {
      clearTimeout(videoChunks[sessionId].timeout);
    }

    videoChunks[sessionId].timeout = setTimeout(async () => {
      deleteFile(sessionId);
    }, 5 * 60 * 1000);
    res.status(200).json({ msg: 'success receiving chunk' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: 'Stream failed' });
  }
};

const stopRecording = async (req, res) => {
  try {
    const { sessionId } = req.params;
    if (!sessionExists(sessionId)) {
      return res.status(404).json({ Error: 'Session not found' });
    }

    if (!videoChunks[sessionId] || !videoChunks[sessionId].data) {
      return res.status(404).json({ Error: 'No video chunks found' });
    }

    const videoData = Buffer.concat(videoChunks[sessionId].data);
    const filename = `${sessionId}-video.mp4`; // Use .mp4 as the file extension
    const dirPath = path.join(__dirname, '../uploads');

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    const videoPath = path.join(dirPath, filename);

    fs.writeFileSync(videoPath, videoData);

    clearTimeout(videoChunks[sessionId].timeout);
    delete videoChunks[sessionId];

    const streamUrl = `/stream/${sessionId}`;
    setTimeout(() => {
      deleteFile(videoPath);
    }, 5 * 60 * 1000);

    res.status(200).json({ streamUrl, Success: 'Video saved', videoPath });
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: 'Stop and save recording failed' });
  }
};

const getVideoStream = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const videoPath = path.join(__dirname, `../uploads/${sessionId}-video.mp4`);

    if (!fs.existsSync(videoPath)) {
      return res.status(404).json({ Error: 'Video not found' });
    }

    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const { range } = req.headers;

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(videoPath, { start, end });
      const headers = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      };

      res.writeHead(206, headers);
      file.pipe(res);
    } else {
      const headers = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(200, headers);
      fs.createReadStream(videoPath).pipe(res);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: 'Failed to fetch video stream' });
  }
};

module.exports = {
  initializeRecording,
  streamVideo,
  stopRecording,
  getVideoStream,
  upload, // Export the multer upload middleware for route handling
};
