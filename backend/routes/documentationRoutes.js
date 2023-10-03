const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swaggerConfig');

const router = express.Router();

// Serve Swagger documentation
router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerSpec));

module.exports = router;
