/********************************
 * Routes for PML (Product Material Link) resources
 * 
 * @author Sean Bryan
 * 
 * 2019-11-22
 ********************************/

const router = require("express").Router();
const pmlController = require("../../controllers/pmlController");

// Matches with "/api/pml"
router.route("/")
  .post(pmlController.create);

// Matches with "/api/pml/:id"
router.route("/:id")
  .get(pmlController.findByProductId)
  .delete(pmlController.remove);

module.exports = router;
