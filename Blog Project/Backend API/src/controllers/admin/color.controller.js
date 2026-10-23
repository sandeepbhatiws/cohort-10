const ColorModal = require('../../modal/Color.js');

exports.create = async(request, response) => {

    ColorModal({
        name : request.body.color_name,
        code : request.body.color_code,
        order : request.body.order,
        mobile_number : request.body.mobile_number 
    })
    .save()
    .then((result) => {
        const data = {
            _status : true,
            _message : "Record Created.",
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
}

exports.view = async(request, response) => {

    ColorModal.find()
    .then((result) => {
        if(result.length != 0){
            const data = {
                _status : true,
                _message : "Record Created.",
                _data : result
            }

            return response.send(data);
        } else {
            const data = {
                _status : false,
                _message : "No Record Found.",
                _data : []
            }

            return response.send(data);
        }
    })
    .catch(() => {
        const data = {
            _status : false,
            _message : "Something went wrong.",
            _data : []
        }

        return response.send(data);
    })
}

exports.details = (request, response) => {


}

exports.update = (request, response) => {


}

exports.delete = (request, response) => {


}

exports.changeStatus = (request, response) => {


}