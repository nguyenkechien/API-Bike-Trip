const mongoose = require('mongoose');
const config   = require('./../config');

const connectDB = async () => {
  mongoose.Promise = global.Promise;
  try {
    mongoose.set("useCreateIndex", true);

    await mongoose.connect(config.DB, {
      useNewUrlParser   : true,
      useUnifiedTopology: true,
      reconnectTries    : 100,
      reconnectInterval : 500,
      autoReconnect     : true,
      useFindAndModify  : true,
      dbName            : "bike-trip-2"
    });

    console.log('Database is connected....');

  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }

}

module.exports = connectDB;