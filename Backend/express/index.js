const http = require('http');
const categories = require('./data.js');

http.createServer((request, response) => {

    if(request.url == '/'){
        response.end('Server is working fine')
    } else if(request.url == '/categories' && request.method == 'POST'){
        if(categories.length > 0){
            const data = {
                _status : true,
                _message : 'Record Found.',
                _data : categories
            }

            response.end(JSON.stringify(data));
        } else {
            const data = {
                _status : false,
                _message : 'No Record Found.',
                _data : []
            }

            response.end(JSON.stringify(data));
        }
        
    } else {
        response.end('No Routing match')
    }

}).listen(5000, () => {
    console.log('Server is working fine.')
});