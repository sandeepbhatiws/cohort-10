const express = require('express');
const {categories, brands} = require('./data.js');
const { view, viewDetails } = require('./controllers/category.controller.js');
const { viewBrands } = require('./controllers/brand.controller.js');
const { validation } = require('./middlewares/commonmiddleware.js');

// Make Executable Function
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }))

server.get('/', (request, response) => {
    response.send('Server is working Fine!!')
});

server.post('/categories', validation, view)

server.post('/category-details/:id', validation, viewDetails)

server.post('/brands', validation, viewBrands)

server.listen(5000, () => {
    console.log('Server is working Fine.');
})