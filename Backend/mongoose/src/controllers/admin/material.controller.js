const MaterialModal = require('../../modal/Material.js');

exports.create = async(request, response) => {

    MaterialModal(request.body)
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

    var page = 1;
    var limit = 15;

    if(request.body){
        if(request.body.limit){
            limit = request.body.limit
        }

        if(request.body.page){
            page = request.body.page
        }
    }

    var skip = (page - 1) * limit;

    var condition = {
        deleted_at : null
    }

    if(request.body.name){
        condition.name = request.body.name;
    }


    var totalRecords = await MaterialModal.find(condition).countDocuments();

    MaterialModal.find(condition).select('name order status')
    .sort({
        order : 'asc',
        _id : 'desc'
    })
    .limit(limit)
    .skip(skip)
    .then((result) => {
        if(result.length != 0){
            const data = {
                _status : true,
                _message : "Record Created.",
                _paginate : {
                    current_page: page,
                    limit: limit,
                    total_pages: Math.ceil(totalRecords/limit),
                    total_records: totalRecords
                },
                _data : result
            }

            return response.send(data);
        } else {
            const data = {
                _status : false,
                _message : "No Record Found.",
                _paginate : {
                    current_page: page,
                    limit: limit,
                    total_pages: Math.ceil(totalRecords/limit),
                    total_records: totalRecords
                },
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

    MaterialModal.findOne({
        _id : request.params.id
    })
    .then((result) => {
        if(result){
            const data = {
                _status : true,
                _message : "Record Found.",
                _data : result
            }

            return response.send(data);
        } else {
            const data = {
                _status : false,
                _message : "No Record Found.",
                _data : null
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

exports.update = (request, response) => {

    var dataUpdate = request.body;
    dataUpdate.updated_at = Date.now()

    MaterialModal.updateOne({
        _id : request.params.id
    }, dataUpdate)
    .then((result) => {
        const data = {
            _status : true,
            _message : "Record Updated.",
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

exports.destroy = (request, response) => {

    // var dataUpdate = request.body;
    // dataUpdate.updated_at = Date.now()

    // MaterialModal.updateOne({
    //     _id : request.params.id
    // }, dataUpdate)

    MaterialModal.updateOne({
        _id : request.body.id
    }, {
        deleted_at : Date.now()
    })
    .then((result) => {
        const data = {
            _status : true,
            _message : "Record Deleted.",
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

exports.changeStatus = async(request, response) => {

    var getData = await MaterialModal.findOne({ _id : request.params.id });

    if(getData.status == true){
        var dataUpdate = {
            status : false,
            updated_at : Date.now()
        }
    } else {
        var dataUpdate = {
            status : true,
            updated_at : Date.now()
        }
    }

    MaterialModal.updateOne({
        _id : request.params.id
    }, dataUpdate)
    .then((result) => {
        const data = {
            _status : true,
            _message : "Change Status Succussfully.",
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