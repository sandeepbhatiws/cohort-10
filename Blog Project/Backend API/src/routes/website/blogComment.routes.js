const express = require('express');
const { create, view, destroy } = require('../../controllers/website/blogComment.controller');
const auth = require('../../middleware/auth.middleware');

const route = express.Router();

module.exports = server => {

    route.post('/create/:id', auth, create)

    route.post('/view/:id', view)

    route.delete('/delete/:id', auth, destroy)

    server.use('/api/website/blog-comment', route);
}
