const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config()
const http = require('http');
const { Server } = require('socket.io');
const { initSocket } = require('./src/socket.js');

// Make Executable Function
const server = express();

const socketServer = http.createServer(server);
initSocket(socketServer);

server.use(express.json())
server.use(express.urlencoded({ extended : true }))

server.use(bodyParser.json());
server.use(cors());

server.get('/', (request, response) => {
    response.end('Server is working fine !!');
})

server.use('/uploads', express.static('uploads'));

// Admin Panel
require('./src/routes/admin/color.routes.js')(server)
require('./src/routes/admin/material.routes.js')(server)
require('./src/routes/admin/user.routes.js')(server)
require('./src/routes/admin/blogCategory.routes.js')(server)
require('./src/routes/admin/blog.routes.js')(server)

// Website
require('./src/routes/website/user.routes.js')(server)
require('./src/routes/website/blog.routes.js')(server)
require('./src/routes/website/blogLike.routes.js')(server)
require('./src/routes/website/blogComment.routes.js')(server)

// Application



socketServer.listen(5000, () => {
    mongoose.connect('mongodb://127.0.0.1:27017/cohort-10')
    .then(() => console.log('Connected!'));
    console.log('Server is working fine !')
})