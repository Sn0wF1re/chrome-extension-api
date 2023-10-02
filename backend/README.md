# Backend for Chrome Extension Video Recording

This is the backend server for a Chrome extension that allows users to record and share help videos with ease. It provides endpoints for initializing video recording, streaming video data, saving recorded videos, and serving video streams.

## Features

- Initialize a recording session to obtain a session ID.
- Stream video data to the server in chunks during recording.
- Save recorded videos locally on the server.
- Serve recorded video streams for playback.

## Setup

1. **Clone this repository to your local machine:**

   ```bash
   git clone https://github.com/Sn0wF1re/chrome-extension-api.git
   ```

2. **Install the required dependencies:**

   ```bash
   cd chrome-extension-api
   npm install
   ```

3. **Configure the environment variables:**

   Create a `.env` file in the root directory of the project and configure the following variables:

   ```dotenv
   MONGODB_URI=''
   PORT=5000
   ```

4. **Start the server:**

   ```bash
   npm start
   ```

## API Endpoints

- **`GET /api/initialize-stream`**: Initialize a video recording session and obtain a session ID.

- **`POST /api/start-stream/:sessionId`**: Stream video data chunks to the server for the specified session ID.

- **`POST /api/stop-stream/:sessionId`**: Stop recording, save the recorded video, and associate it with the session ID.

- **`GET /api/stream/:sessionId`**: Get the video stream for playback by providing the session ID.

## Technologies Used

- **Node.js**: Backend server runtime.
- **Express.js**: Web application framework.
- **MongoDB**: Database for storing session information.
- **Mongoose**: MongoDB object modeling for Node.js.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```