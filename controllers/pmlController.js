/********************************
 * Controller directing data manipulation for PML 
 * (Product Material Link) Model
 * 
 * @author Sean Bryan
 * 
 * 2019-11-22
 ********************************/
const db = require("../models");

// Defining methods for the Controller
module.exports = {
  findByProductId: function (req, res) {
    db.PML.find({ userId: req.params.id })
      .then(dbPML => res.json(dbPML))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.PML.create(req.body)
      .then(dbPML => res.json(dbPML))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.PML.findById(req.params.id)
      .then(dbPML => dbProduct.remove())
      .then(dbPML => res.json(dbPML))
      .catch(err => res.status(422).json(err));
  }
};