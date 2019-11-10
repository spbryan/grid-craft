/********************************
 * Routes for Sales resources
 * 
 * @author Sean Bryan
 * 
 * 2019-11-10
 ********************************/

const router = require("express").Router();
const salesController = require("../../controllers/salesController");

// Matches with "/api/sales"
router.route("/")
  .get(salesController.findAll);

// Matches with "/api/sales/:id"
router.route("/:id")
  .get(salesController.findById)
  .put(salesController.update)
  .delete(salesController.remove);

// Matches with "/api/sales/product/:id"
router.route("/product/:id")
  .post(salesController.create)

module.exports = router;
