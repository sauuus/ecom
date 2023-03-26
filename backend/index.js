//what is express.js
// using middleware
// working with req and res
// routing
//return html file


//what and why
// server logic is complex
// you want to focus on bussiness logic not on the nitty-gritty details
// use framework for nitty-gritty details


//alternative to express.js
// vanilla nodejs
// adonis.js
//koa
//sails.js

// const http = require('http');
const express = require('express');
var cors = require("cors");

const app = express();
const adminRoutes = require('./src/routes/admin');
const shopRoutes = require('./src/routes/cart');
//parse the request body
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(adminRoutes);
app.use(shopRoutes);
app.use((req,res,next) => {
  res.status(404).send("<h1>Page Not Found!</h1>")
});
app.use(cors());
// app.use((req, res, next) => {
//   console.log('in middlewares');
//   next(); //Allows the request to continue to the next middlewares
// });
/*

app.use('/product', (req, res, next) => {
  // console.log('in another middlewares');
  //Send response
  res.send('Hello From Server product page') // can send type any
});


app.use('/', (req, res, next) => {
  // console.log('in another middlewares');
  //Send response
  res.send('Hello From Server') // can send type any
});
 */
//Adding middleware => express js is all about middlewares  req => middleware (next) => middleware => response

// const server = http.createServer(app);
// server.listen(8080)

app.listen(8080, () => {
  // console.log(`app is running on 8080`)
});

