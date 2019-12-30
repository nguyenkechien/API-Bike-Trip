const express    = require("express");
const app        = express();
const bodyParser = require("body-parser");
const cors       = require("cors");
const path       = require('path');

const connectDB = require("./Db/connection");
const config    = require("./config");


app.listen(config.PORT, () => {
  console.log(`Server running ${config.NODE_ENV} at ${config.DOMAIN_API}`)
});

console.log(`------------`);
console.log(config.NODE_ENV);
console.log(`------------`);

if (!config.PRIVATEKEY) {
  console.error("FATAL ERROR: myprivatekey is not defined.");
  process.exit(1);
}

connectDB();
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
app.use("/api/users", require("./app/router/users.route"));
app.use("/api/catalog", require("./app/router/catalog.route"));
app.use("/api/contact", require("./app/router/contact.route"));
app.use("/api/products", require("./app/router/products.route"));
app.use("/api/cart", require("./app/router/carts.route"));
app.use("/api/promocode", require("./app/router/promoCode.route"));
app.use("/api/uploadimage", require("./app/router/upload.route"));
app.use("/api/gallery", require("./app/router/gallery.route"));

app.get("/images/:img", (req, res, nexr) => {
  const img = req.params.img;
  res.sendFile(path.join(__dirname + `/uploads/images/${img}`));
})
app.get("*", function (req, res) {
  res.status(404).send('<h1 style="text-align: center; color: red">404 Not found</h1>');
});

// --------------------------------