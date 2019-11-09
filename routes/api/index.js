const path = require("path");
const router = require("express").Router();
const materialRoutes = require("./materials");
const productRoutes = require("./products");
const userRoutes = require("./users");

// User routes
router.use("/users", userRoutes);

// Material Routes
router.use("/materials", materialRoutes);

// Product Routes
router.use("/products", productRoutes);

// For anything else, render the html page
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;
