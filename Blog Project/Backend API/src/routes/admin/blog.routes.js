const express = require('express');
const { create, view, details, update, destroy, changeStatus } = require('../../controllers/admin/blog.controller');
const auth = require('../../middleware/auth.middleware');

const route = express.Router();

module.exports = server => {

    route.post('/create', auth, create)

    route.post('/view', auth, view)

    route.post('/details/:id', auth, details)

    route.put('/update/:id', auth, update)

    route.put('/change-status', auth, changeStatus)

    route.delete('/delete', auth, destroy)

    server.use('/api/admin-panel/blog', route);
}
