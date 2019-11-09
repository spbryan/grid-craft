/********************************
 * Routes for Products resources
 * 
 * @author Sean Bryan
 * 
 * 2019-11-09
 ********************************/

const router = require("express").Router();
const productController = require("../../controllers/productController");

// Matches with "/api/products"
router.route("/")
  .get(productController.findAll)
  .post(productController.create);

// Matches with "/api/products/:id"
router.route("/:id")
  .get(productController.findById)
  .put(productController.update)
  .delete(productController.remove);

// Matches with "/api/products/user/:id"
router.route("/user/:id")
  .get(productController.findByUserId)

module.exports = router;
