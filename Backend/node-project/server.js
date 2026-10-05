const { json } = require('express');
const http = require('http')

const server = http.createServer((req, resp) => {

    const result = {
        _status : true, 
        _message : 'Record Found.',
        _data : []
    }

    resp.end(JSON.stringify(result))
})

server.listen(5000, () => {
    console.log('Server is working Fine.')
});