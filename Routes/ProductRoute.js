const product = require('express').Router();
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct,getAggregatedProducts } = require('../Controllers/ProductController');


product.post('/add', createProduct);
product.get('/all', getProducts);
product.get('/:name', getProduct);
product.put('/update/:id', updateProduct);
product.delete('/delete/:id', deleteProduct);
product.get('/products/aggregate', getAggregatedProducts);


module.exports = product;