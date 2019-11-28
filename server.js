const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 4000 || process.env.PORT;
const cors = require("cors");
const mongoose = require("mongoose");
const configDB = require("./config/connection.js");
const productsRoutes = require("./db/route/products.route");
const usersRoutes = require("./db/route/users.route");
const catalogRoutes = require("./db/route/catalog.route");
const contactRoutes = require("./db/route/contact.route");
const uploadRoute = require("./db/route/upload.route");
const config = require("config");
const http = require("http");
const path = require('path');
process.env.Domain = __dirname;

//use config module to get the privatekey, if no private key set, end the application
if (!config.get("privatekey")) {
  console.error("FATAL ERROR: myprivatekey is not defined.");
  process.exit(1);
}

// ES6 Promises
mongoose.Promise = global.Promise;

mongoose.set("useCreateIndex", true);
// Connect to mongodb
mongoose
  .connect(configDB.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    reconnectTries: 100,
    reconnectInterval: 500,
    autoReconnect: true,
    useFindAndModify: true,
    dbName: "bike-trip"
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
app.use(express.static(process.env.Domain + "uploads/images"));
// -------------------------------
app.use("/api/users", usersRoutes);
app.use("/api/catalog", catalogRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/uploadimage", uploadRoute);
app.get("/uploads/images/:img", (req, res, nexr)=>{
  const img = req.params.img;
  console.log(__dirname + `\${img}`)
  res.sendFile(path.join(__dirname + `/uploads/images/${img}`));
})
app.get("*",function (req, res) {
  res.status(404).send('<h1 style="text-align: center; color: red">404 Not found</h1>');
});
// --------------------------------

// const server = http.createServer(app);

// server.listen(PORT, () => {
//   console.log("Server starting on port : " + PORT)
// });

app.listen(PORT, ()=>{
  console.log("Server starting on port : " + PORT)
})