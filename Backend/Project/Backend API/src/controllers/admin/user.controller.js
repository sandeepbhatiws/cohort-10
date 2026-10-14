const bcrypt = require('bcrypt');
const saltRounds = 10;

var jwt = require('jsonwebtoken');
const UserModal = require('../../modal/User');
var secretKey = '1234567890';

exports.login = async(request, response) => {

    var checkUser = await UserModal.findOne({ email  : request.body.email, role_type : 'admin' });

    if(!checkUser){
        const data = {
            _status : false,
            _message : "Account does't exit.",
            _data : ''
        }

        return response.send(data);
    }

    var checkPassword = await bcrypt.compare(request.body.password, checkUser.password);

    if(!checkPassword){
        const data = {
            _status : false,
            _message : "Password is incorrect.",
            _data : ''
        }

        return response.send(data);
    }

    var token = await jwt.sign({ userData : checkUser }, secretKey);

    const data = {
        _status : true,
        _message : "User login succussfully.",
        _token : token,
        _data : checkUser
    }

    return response.send(data);
}