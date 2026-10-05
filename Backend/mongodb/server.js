const express = require('express');

// Make Executable Function
const server = express();

server.use(express.json())

server.use(express.urlencoded({ extended : true }))

server.get('/', (request, response) => {
    response.end('Server is working fine !!');
})


// Admin Panel
require('./src/routes/admin/color.routes.js')(server)
// require('./src/routes/admin/material.routes.js')(server)


// Website


// Application



server.listen(5000, () => {
    console.log('Server is working fine !')
})