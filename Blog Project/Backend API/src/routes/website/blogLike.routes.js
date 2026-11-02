const express = require('express');
const { toggle, status } = require('../../controllers/website/blogLike.controller');
const auth = require('../../middleware/auth.middleware');

const route = express.Router();

module.exports = server => {

    route.post('/toggle/:id', auth, toggle)

    route.post('/status/:id', auth, status)

    server.use('/api/website/blog-like', route);
}
