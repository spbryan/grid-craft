/********************************
 * Routes for Sales resources
 * 
 * @author Sean Bryan
 * 
 * 2019-11-10
 ********************************/

const router = require("express").Router();
const saleController = require("../../controllers/saleController");

// Matches with "/api/sales"
router.route("/")
  .get(saleController.findAll)
  .post(saleController.create);

// Matches with "/api/sales/:id"
router.route("/:id")
  .get(saleController.findById)
  .put(saleController.update)
  .delete(saleController.remove);

// Matches with "/api/sales/user/:id"
router.route("/user/:id")
  .get(saleController.findByUserId);

// Matches with "/api/sales/product/:id"
router.route("/product/:id")
  .get(saleController.findByProductId);

module.exports = router;
