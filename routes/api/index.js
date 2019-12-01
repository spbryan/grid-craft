const path = require("path");
const router = require("express").Router();
const materialRoutes = require("./materials");
const productRoutes = require("./products");
const userRoutes = require("./users");
const salesRoutes = require("./sales");
const pmlRoutes = require("./pml");

// User routes
router.use("/users", userRoutes);

// Material Routes
router.use("/materials", materialRoutes);

// Product Routes
router.use("/products", productRoutes);

// Sales Routes
router.use("/sales", salesRoutes);

// PML (Product Material Link) Routes
router.use("/pml", pmlRoutes);

// For anything else, render the html page
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;
  