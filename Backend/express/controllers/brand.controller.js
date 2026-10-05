const { brands } = require("../data.js");

exports.create = () => {

}

exports.viewBrands = (request, response) => {

    try {
        if(brands.length > 0){
            const data = {
                _status : true,
                _message : 'Record Found.',
                _data : brands
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
    } catch (error) {
        const data = {
            _status : false,
            _message : 'Something went wrong !',
            _error : error,
            _data : []
        }

        return response.status(500).send(data);
    }

    
}