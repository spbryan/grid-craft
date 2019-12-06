/********************************
 * Routes for Materials Used resources
 * 
 * @author Sean Bryan
 * 
 * 2019-11-09
 ********************************/

const router = require("express").Router();
const materialsUsedController = require("../../controllers/materialsUsedController");

// Matches with "/api/materials/used"
router.route("/")
  .get(materialsUsedController.findAll)
  .post(materialsUsedController.create);

// Matches with "/api/materials/used/:id"
router.route("/:id")
  .get(materialsUsedController.findById)
  .delete(materialsUsedController.remove);

// Matches with "/api/materials/used/product/:id"
router.route("/product/:id")
  .get(materialsUsedController.findByProductId)

module.exports = router;
