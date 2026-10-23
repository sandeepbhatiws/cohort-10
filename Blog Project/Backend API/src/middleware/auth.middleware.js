var jwt = require('jsonwebtoken');
require('dotenv').config()
var secretKey = process.env.secret_key;

// Expects header -> Authorization: Bearer <token>
module.exports = (request, response, next) => {

    var authHeader = request.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        const data = {
            _status : false,
            _message : "Token is required.",
            _data : ''
        }

        // 401 lets the admin panel detect an expired / missing login and redirect to login page
        return response.status(401).send(data);
    }

    try {
        var decoded = jwt.verify(authHeader.split(' ')[1], secretKey);
        request.userId = decoded.userData._id;

        next();
    } catch (error) {
        const data = {
            _status : false,
            _message : "Invalid token.",
            _data : ''
        }

        return response.status(401).send(data);
    }
}
