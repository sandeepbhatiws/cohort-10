const express = require('express');
const { create, view } = require('../../controllers/admin/color.controller');

const route = express.Router();

module.exports = server => {

    route.post('/create', create)

    route.post('/view', view)


    server.use('/api/admin-panel/color', route);
}
