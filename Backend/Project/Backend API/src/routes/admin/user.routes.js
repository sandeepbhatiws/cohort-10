const express = require('express');
const { login, viewProfile, updateProfile, changePassword } = require('../../controllers/admin/user.controller');
const auth = require('../../middleware/auth.middleware');

const route = express.Router();

module.exports = server => {

    route.post('/login', login)

    route.post('/view-profile', auth, viewProfile)

    route.put('/update-profile', auth, updateProfile)

    route.put('/change-password', auth, changePassword)

    server.use('/api/admin-panel/user', route);
}
