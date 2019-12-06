/********************************
 * Controller directing data manipulation for Product Model
 * 
 * @author Sean Bryan
 * 
 * 2019-11-09
 ********************************/
const db = require("../models");

// Defining methods for the Controller
module.exports = {
  findAll: function (req, res) {
    db.Product.find(req.query)
      .then(dbProduct => res.json(dbProduct))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Product.findById(req.params.id)
      .then(dbProduct => res.json(dbProduct))
      .catch(err => res.status(422).json(err));
  },
  findByUserId: function (req, res) {
    db.Product.find({ userId: req.params.id })
      .then(dbProduct => res.json(dbProduct))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Product.create(req.body)
      .then(dbProduct => res.json(dbProduct))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Product.updateOne(
      { "_id": req.params.id },
      {
        $set:
        {
          "type": req.body.type,
          "description": req.body.description,
          "focalBead": req.body.focalBead,
          "findings": req.body.findings,
          "numberAvailable": req.body.numberAvailable,
          "numberSold": req.body.numberSold,
          "pricePerUnit": req.body.pricePerUnit,
          "netCostPerUnit": req.body.netCostPerUnit,
          "imageLink": req.body.imageLink
        }
      })
      .then(dbProduct => res.json(dbProduct))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Product.findById(req.params.id)
      .then(dbProduct => dbProduct.remove())
      .then(dbProduct => res.json(dbProduct))
      .catch(err => res.status(422).json(err));
  }
};