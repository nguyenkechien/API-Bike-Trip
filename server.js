const express    = require("express");
const app        = express();
const bodyParser = require("body-parser");
const cors       = require("cors");

const mongoose = require("mongoose");
const config   = require("./config");

const path     = require('path');
const port     = 4000 || process.env.PORT;
const hostname = config.DOMAIN_API;
const http     = require("http");
const https    = require("https");
let server

// if (config.NODE_ENV == 'development' || config.NODE_ENV == 'stg') {
//   server = http.createServer(app);
// } else {
//   server = https.createServer(app);
// }

// server.listen(port, () => {
//   console.log(`Server running ${config.NODE_ENV} at ${hostname}`)
// });
app.listen(port, () => {
  console.log(`Server running ${config.NODE_ENV} at ${hostname}`)
});

console.log(`------------`);
console.log(config.NODE_ENV);
console.log(`------------`);

if (!config.PRIVATEKEY) {
  console.error("FATAL ERROR: myprivatekey is not defined.");
  process.exit(1);
}

// ES6 Promises
mongoose.Promise = global.Promise;

mongoose.set("useCreateIndex", true);
// Connect to mongoDB
mongoose
  .connect(config.DB, {
    useNewUrlParser   : true,
    useUnifiedTopology: true,
    reconnectTries    : 100,
    reconnectInterval : 500,
    autoReconnect     : true,
    useFindAndModify  : true,
    dbName            : "bike-trip"
  })
  .then(() => {
    console.log(`Database is connected`);
  })
  .catch(err => {
    console.log(err);
  });

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(config.DRIVE + "uploads/images"));

// -------------------------------
app.use("/api/users", require("./app/route/users.route"));
app.use("/api/catalog", require("./app/route/catalog.route"));
app.use("/api/contact", require("./app/route/contact.route"));
app.use("/api/products", require("./app/route/products.route"));
app.use("/api/cart", require("./app/route/carts.route"));
app.use("/api/promocode", require("./app/route/promoCode.route"));
app.use("/api/uploadimage", require("./app/route/upload.route"));

app.get("/images/:img", (req, res, nexr) => {
  const img = req.params.img;
  res.sendFile(path.join(__dirname + `/uploads/images/${img}`));
})
app.get("*", function (req, res) {
  res.status(404).send('<h1 style="text-align: center; color: red">404 Not found</h1>');
});

// --------------------------------