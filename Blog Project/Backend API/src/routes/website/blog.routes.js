const express = require('express');
const { view, details } = require('../../controllers/website/blog.controller');
const auth = require('../../middleware/auth.middleware');

const route = express.Router();

module.exports = server => {

    route.post('/view', view)

    route.post('/details/:slug', details)

    server.use('/api/website/blog', route);
}
