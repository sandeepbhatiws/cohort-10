const express = require('express');
const { register, login } = require('../../controllers/website/user.controller');

const route = express.Router();

module.exports = server => {

    route.post('/register', register)

    route.post('/login', login)

    server.use('/api/website/user', route);
}
