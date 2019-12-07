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
  findByMaterialId: function (req, res) {
    db.Material.find({ materialId: req.params.id })
      .then(dbMaterial => res.json(dbMaterial))
      .catch(err => res.status(422).json(err));
  },
  findByMaterialNumber: function (req, res) {
    db.Material.find({ materialNumber: req.params.id })
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
          "gauge": req.body.gauge,
          "length": req.body.length,
          "notes": req.body.notes,
          "purchasedFrom": req.body.purchasedFrom,
          "purchasedLink": req.body.purchasedLink,
          "quantity": req.body.quantity,
          "price": req.body.price,
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