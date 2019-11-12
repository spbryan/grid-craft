/********************************
 * Controller directing data manipulation for Sale Model
 * 
 * @author Sean Bryan
 * 
 * 2019-11-12
 ********************************/
const db = require("../models");

// Defining methods for the Controller
module.exports = {
  findAll: function (req, res) {
    db.Sale.find(req.query)
      .then(dbSale => res.json(dbSale))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Sale.findById(req.params.id)
      .then(dbSale => res.json(dbSale))
      .catch(err => res.status(422).json(err));
  },
  findByUserId: function (req, res) {
    db.Sale.find({ userId: req.params.id })
      .then(dbSale => res.json(dbSale))
      .catch(err => res.status(422).json(err));
  },
  findByProductId: function (req, res) {
    db.Sale.find({ productId: req.params.id })
      .then(dbSale => res.json(dbSale))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Sale.create(req.body)
      .then(dbSale => res.json(dbSale))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Sale.updateOne(
      { "_id": req.params.id },
      {
        $set:
        {
          "saleDate": req.body.saleDate,
          "saleLocation": req.body.saleLocation,
          "unitsSold": req.body.unitsSold,
          "pricePerUnit": req.body.pricePerUnit
        }
      })
      .then(dbSale => res.json(dbSale))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Sale.findById(req.params.id)
      .then(dbSale => dbSale.remove())
      .then(dbSale => res.json(dbSale))
      .catch(err => res.status(422).json(err));
  }
};