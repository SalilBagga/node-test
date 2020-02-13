const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Orders were fetched'
  });
});

router.post('/', (req, res, next) => {
  const order = {
    prodID: req.body.prodID,
    qty: req.body.qty
  };
  res.status(201).json({
    message: 'Order was created',
    createOrder: order
  });
});

router.get('/:orderID', (req, res, next) => {
  const id = req.params.orderID;
  if (id === 'rocket' || id === 'bella' || id === 'ripper') {
    res.status(200).json({
      message: `Your special id is :-${id}`
    });
  } else {
    res.status(200).json({
      message: `This is for specific situations`
    });
  }
  console.log(id);
});

module.exports = router;
