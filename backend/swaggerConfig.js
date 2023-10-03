const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Chrome Extension API",
      version: "1.0.0",
      description: "API for chrome extension that streams videos to the server and back",
    },
  },
  servers: {
    url: "localhost:5000",
  },
  apis: ["./routes/videoRoutes.js"],
};

module.exports = swaggerJsdoc(options);
