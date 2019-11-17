/********************************
 * Controller directing data manipulation for Material Model
 * 
 * @author Sean Bryan
 * 
 * 2019-11-09
 ********************************/
const db = require("../models");

// Defining methods for the Controller
module.exports = {
  findAll: function (req, res) {
    db.Material.find(req.query)
      .then(dbMaterial => res.json(dbMaterial))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Material.findById(req.params.id)
      .then(dbMaterial => res.json(dbMaterial))
      .catch(err => res.status(422).json(err));
  },
  findByUserId: function (req, res) {
    db.Material.find({ userId: req.params.id })
      .then(dbMaterial => res.json(dbMaterial))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Material.create(req.body)
      .then(dbMaterial => res.json(dbMaterial))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Material.updateOne(
      { "_id": req.params.id },
      {
        $set:
        {
          "name": req.body.name,
          "type": req.body.type,
          "materialUsed": req.body.materialUsed,
          "purchasedFrom": req.body.purchasedFrom,
          "purchasedLink": req.body.purchasedLink,
          "quantity": req.body.quantity,
          "pricePerUnit": req.body.pricePerUnit,
          "imageLink": req.body.imageLink
        }
      })
      .then(dbMaterial => res.json(dbMaterial))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Material.findById(req.params.id)
      .then(dbMaterial => dbMaterial.remove())
      .then(dbMaterial => res.json(dbMaterial))
      .catch(err => res.status(422).json(err));
  }
};