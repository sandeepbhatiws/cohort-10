const validation = (request, response, next) => {
    if(!request.body || !request.body.token){
        const data = {
            _status : false,
            _message : 'Required field missing.',
            _data : []
        }
        return response.status(401).send(data);
    }

    if(request.body.token != '1234'){
        const data = {
            _status : false,
            _message : 'Token is incorrect.',
            _data : []
        }

        return response.status(403).send(data);
    }

    next()
}

module.exports = {validation}