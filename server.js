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
const config = require("config");
const multer = require("multer");

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
app.use(express.static("public"));

app.use("/api/users", usersRoutes);
app.use("/api/catalog", catalogRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/products", productsRoutes);

// Defined
// app.post('/api/uploadimage', upload.single('photo'), (req, res) => {
//   if(req.file) {
//       res.json(req.file);
//   }
//   else throw 'error';
// });

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

// var upload = multer({ storage: storage }).single("images");
const upload = multer({ dest: __dirname + "/uploads/images" }).single("images");

app.post("/api/uploadimage", function(req, res) {
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
  // console.log(`pass DB ${process.env.MONGO_ATLAT}`)
});
