const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./apiRoutes/routes/products');
const orderRoutes = require('./apiRoutes/routes/orders');
const mongoConnectionString =
  'mongodb+srv://node-test:node-test@node-test-zcxza.mongodb.net/test?retryWrites=true&w=majority';

//mongodb+srv://node-test:<password>@node-test-zcxza.mongodb.net/test?retryWrites=true&w=majority
mongoose.connect(mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,Authroization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Methods', 'PUT,POST,PATCH,DELETE,GET');
    return res.status(200).json({});
  }
  next();
});

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});
// productRoutes.initialie(app);
// app.use((req, res, next) => {
//   console.log('its working here');
//   res.status(200).json({
//     message: 'IT Works!'
//   });
// });

module.exports = app;
