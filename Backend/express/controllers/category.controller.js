const { categories } = require("../data.js");

exports.create = () => {

}

exports.view = (request, response) => {

    if(categories.length > 0){
        const data = {
            _status : true,
            _message : 'Record Found.',
            _data : categories
        }

        return response.send(data);
    } else {
        const data = {
            _status : false,
            _message : 'No Record Found.',
            _data : []
        }

        return response.send(data);
    }
}

exports.viewDetails = (request, response) => {

    var categoryDetails = categories.filter((v) => {
        if(v.id == request.params.id){
            return v;
        }
    })

    if(categoryDetails.length > 0){
        const data = {
            _status : true,
            _message : 'Record Found.',
            _data : categoryDetails[0]
        }

        return response.send(data);
    } else {
        const data = {
            _status : false,
            _message : 'No Record Found.',
            _data : null
        }

        return response.send(data);
    }
}