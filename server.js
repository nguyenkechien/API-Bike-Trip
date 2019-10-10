const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./db/connection.js');
const personsRoute = require('./db/route/products.route');

// ES6 Promises
mongoose.Promise = global.Promise;

// Connect to mongodb
mongoose.connect(config.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  reconnectTries: 100,
  reconnectInterval: 500,
  autoReconnect: true,
  dbName: 'bike-trip'
}).then(() => {
    console.log(`Database is connected`)
  },
  err => {
    console.log(err)
  }
);

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use('/products/api', personsRoute)

app.listen(PORT, function () {
  console.log(`Server is running on Port: ${PORT}`);
  console.log(`pass DB ${process.env.MONGO_ATLAT}`)
}) 