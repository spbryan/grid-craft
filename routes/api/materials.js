/********************************
 * Routes for Materials resources
 * 
 * @author Sean Bryan
 * 
 * 2019-11-09
 ********************************/

const router = require("express").Router();
const materialController = require("../../controllers/materialController");

// Matches with "/api/materials"
router.route("/")
  .get(materialController.findAll)
  .post(materialController.create);

// Matches with "/api/materials/:id"
router.route("/:id")
  .get(materialController.findById)
  .put(materialController.update)
  .delete(materialController.remove);

// Matches with "/api/materials/user/:id"
router.route("/user/:id")
  .get(materialController.findByUserId)

module.exports = router;
