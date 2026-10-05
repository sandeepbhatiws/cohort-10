const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Make Executable Function
const server = express();

server.use(express.json())
server.use(express.urlencoded({ extended : true }))

server.use(bodyParser.json());
server.use(cors());

server.get('/', (request, response) => {
    response.end('Server is working fine !!');
})

// Admin Panel
require('./src/routes/admin/color.routes.js')(server)
require('./src/routes/admin/material.routes.js')(server)


// Website


// Application



server.listen(5000, () => {
    mongoose.connect('mongodb://127.0.0.1:27017/cohort-10')
    .then(() => console.log('Connected!'));
    console.log('Server is working fine !')
})