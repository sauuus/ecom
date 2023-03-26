const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const url = 'mongodb://localhost/ecommerce';
require('./utils/upload');
var cors = require('cors')

const app = express();
app.use(cors())
app.use(express.static('uploads'))

//connect to the mongodb
mongoose.connect(url, {useNewUrlParser: true});
const con = mongoose.connection;

con.on('open', () => {
  console.log('connected')
});

// const adminRoutes = require('./routes/admin');
const cartRoutes = require('./routes/cart');
const productRoutes = require('./routes/products');
const uploadRoutes = require('./routes/upload');
//parse the request body
app.use(bodyParser.json());

// app.use('/admin', adminRoutes);
app.use('/product', productRoutes);
app.use('/cart',cartRoutes);
app.use('/upload', uploadRoutes);

app.use((req,res,next) => {
  res.status(404).send("<h1>Page Not Found!</h1>")
});

app.listen(8000, () => {
  console.log(`app is running on 8000`)
});

