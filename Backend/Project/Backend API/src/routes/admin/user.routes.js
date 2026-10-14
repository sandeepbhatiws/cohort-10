const express = require('express');
const { login } = require('../../controllers/admin/user.controller');

const route = express.Router();

module.exports = server => {

    route.post('/login', login)

    server.use('/api/admin-panel/user', route);
}
