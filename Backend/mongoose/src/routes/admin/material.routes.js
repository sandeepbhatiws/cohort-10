const express = require('express');
const { create, view, details, update, destroy, changeStatus } = require('../../controllers/admin/material.controller');

const route = express.Router();

module.exports = server => {

    route.post('/create', create)

    route.post('/view', view)

    route.post('/details/:id', details)

    route.put('/update/:id', update)

    route.put('/change-status/:id', changeStatus)

    route.delete('/delete', destroy)

    server.use('/api/admin-panel/material', route);
}
