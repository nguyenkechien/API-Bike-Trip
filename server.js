const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const configDB = require('./config/connection.js');
const personsRoute = require('./db/route/products.route');
const usersRoute = require('./db/route/users.route');
const config = require("config");

//use config module to get the privatekey, if no private key set, end the application
if (!config.get("privatekey")) {
  console.error("FATAL ERROR: myprivatekey is not defined.");
  process.exit(1);
}


// ES6 Promises
mongoose.Promise = global.Promise;

mongoose.set('useCreateIndex', true);
// Connect to mongodb
mongoose.connect(configDB.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  reconnectTries: 100,
  reconnectInterval: 500,
  autoReconnect: true,
  useFindAndModify: true,
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
// app.use(express.json());

app.use('/api/products', personsRoute)
app.use('/api/users', usersRoute)

app.listen(PORT, function () {
  console.log(`Server is running on Port: ${PORT}`);
  console.log(`pass DB ${process.env.MONGO_ATLAT}`)
}) 