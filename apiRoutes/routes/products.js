const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('./../model/productModel');

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET requests to /products go to /orders'
  });
});

router.post('/', (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });
  product
    .save()
    .then(result => {
      console.log(result);
    })
    .catch(err => console.log(err));

  res.status(201).json({
    message: 'Handling POST requests to /products to /orders',
    createProduct: product
  });
});

router.get('/:prodID', (req, res, next) => {
  const id = req.params.prodID;
  if (id === 'rocket' || id === 'bella' || id === 'ripper') {
    res.status(200).json({
      message: `Your special  id is :-${id} to /orders`
    });
  } else {
    res.status(200).json({
      message: `This is for specific situations`
    });
  }
  console.log(id);
});
module.exports = router;
