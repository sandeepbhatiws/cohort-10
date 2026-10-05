const database = require('../../config/dbConnection.js')

exports.create = async(request, response) => {

    const db = await database();
    db.collection('colors').insertOne({
        name : request.body.color_name,
        code : request.body.color_code
    })
    .then((result) => {
        const data = {
            _status : true,
            _message : "Record Created.",
            _data : result
        }

        return response.send(data);
    })
    .catch(() => {
        const data = {
            _status : false,
            _message : "Something went wrong.",
            _data : ''
        }

        return response.send(data);
    })
}

exports.view = async(request, response) => {

    const db = await database();
    db.collection('colors').find().toArray()
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