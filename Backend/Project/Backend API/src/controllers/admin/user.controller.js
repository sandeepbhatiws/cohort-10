const bcrypt = require('bcrypt');
const saltRounds = 10;

var jwt = require('jsonwebtoken');
const UserModal = require('../../modal/User');
var secretKey = process.env.secret_key;

exports.login = async(request, response) => {

    console.log(secretKey);

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

exports.viewProfile = async(request, response) => {

    try {
        var userData = await UserModal.findOne({ _id : request.userId, role_type : 'admin' }).select('-password');

        if(!userData){
            const data = {
                _status : false,
                _message : "Account doesn't exist.",
                _data : ''
            }

            return response.send(data);
        }

        const data = {
            _status : true,
            _message : "Record found.",
            _data : userData
        }

        return response.send(data);
    } catch (error) {
        const data = {
            _status : false,
            _message : 'Something wrong with the server',
            _error : error.message,
            _data : null
        }

        return response.send(data);
    }
}

exports.updateProfile = async(request, response) => {

    try {
        var userData = await UserModal.findOne({ _id : request.userId, role_type : 'admin' });

        if(!userData){
            const data = {
                _status : false,
                _message : "Account doesn't exist.",
                _data : ''
            }

            return response.send(data);
        }

        // Only these fields can be changed from profile
        var body = request.body || {};

        ['name', 'email', 'mobile_number', 'address', 'age', 'gender'].forEach((key) => {
            if(body[key] !== undefined){
                // Empty field is saved as null (enum / min / max validators allow null but not '')
                userData[key] = body[key] === '' ? null : body[key];
            }
        });

        userData.updated_at = Date.now();

        // validateModifiedOnly : otherwise the unique email validator finds this same user and fails
        await userData.save({ validateModifiedOnly : true });

        var result = userData.toObject();
        delete result.password;

        const data = {
            _status : true,
            _message : "Profile updated succussfully.",
            _data : result
        }

        return response.send(data);
    } catch (error) {
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
    }
}

exports.changePassword = async(request, response) => {

    try {
        var { current_password, new_password, confirm_password } = request.body || {};

        if(!current_password || !new_password || !confirm_password){
            const data = {
                _status : false,
                _message : "Current password, new password and confirm password are required.",
                _data : ''
            }

            return response.send(data);
        }

        if(new_password != confirm_password){
            const data = {
                _status : false,
                _message : "New password and confirm password do not match.",
                _data : ''
            }

            return response.send(data);
        }

        var userData = await UserModal.findOne({ _id : request.userId, role_type : 'admin' });

        if(!userData){
            const data = {
                _status : false,
                _message : "Account doesn't exist.",
                _data : ''
            }

            return response.send(data);
        }

        var checkPassword = await bcrypt.compare(current_password, userData.password);

        if(!checkPassword){
            const data = {
                _status : false,
                _message : "Current password is incorrect.",
                _data : ''
            }

            return response.send(data);
        }

        if(current_password == new_password){
            const data = {
                _status : false,
                _message : "New password must be different from current password.",
                _data : ''
            }

            return response.send(data);
        }

        userData.password = await bcrypt.hash(new_password, saltRounds);
        userData.updated_at = Date.now();

        await userData.save({ validateModifiedOnly : true });

        const data = {
            _status : true,
            _message : "Password changed succussfully.",
            _data : ''
        }

        return response.send(data);
    } catch (error) {
        const data = {
            _status : false,
            _message : 'Something wrong with the server',
            _error : error.message,
            _data : null
        }

        return response.send(data);
    }
}