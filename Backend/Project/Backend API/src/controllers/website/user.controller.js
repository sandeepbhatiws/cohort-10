const bcrypt = require('bcrypt');
const saltRounds = 10;

var jwt = require('jsonwebtoken');
const UserModal = require('../../modal/User');
var secretKey = '1234567890';

exports.register = async(request, response) => {

    try {
        const saveData = request.body;
        saveData.password = await bcrypt.hash(saveData.password, saltRounds);

        UserModal(saveData).save()
        .then(async(result) => {
            var token = await jwt.sign({ userData : result }, secretKey);

            const data = {
                _status : true,
                _message : "Account register succussfully.",
                _token : token,
                _data : result
            }

            return response.send(data);
        })
        .catch((error) => {

            var errorMessages = {};

            for(var key in error.errors){
                errorMessages[key] = error.errors[key].message
            }

            const data = {
                _status : false,
                _message : "Something went wrong.",
                _error : errorMessages,
                _data : ''
            }

            return response.send(data);
        })
    } catch (error) {
        const data = {
            _status : false,
            _message : 'Something wrong with the server',
            _error : error,
            _data : null
        }

        return response.send(data);
    }
}

exports.login = async(request, response) => {

    var checkUser = await UserModal.findOne({ email  : request.body.email, role_type : 'user' });

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