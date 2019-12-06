/********************************
 * Controller directing data manipulation for Material Used Model
 * 
 * @author Sean Bryan
 * 
 * 2019-11-09
 ********************************/
const db = require("../models");

// Defining methods for the Controller
module.exports = {
  findAll: function (req, res) {
    db.MaterialsUsed.find(req.query)
      .then(dbMaterialsUsed => res.json(dbMaterialsUsed))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.MaterialsUsed.findById(req.params.id)
      .then(dbMaterialsUsed => res.json(dbMaterialsUsed))
      .catch(err => res.status(422).json(err));
  },
  findByProductId: function (req, res) {
    db.MaterialsUsed.find({ productId: req.params.id })
      .then(dbMaterialsUsed => res.json(dbMaterialsUsed))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.MaterialsUsed.create(req.body)
      .then(dbMaterialsUsed => res.json(dbMaterialsUsed))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.MaterialsUsed.findById(req.params.id)
      .then(dbMaterialsUsed => dbMaterialsUsed.remove())
      .then(dbMaterialsUsed => res.json(dbMaterialsUsed))
      .catch(err => res.status(422).json(err));
  }
};