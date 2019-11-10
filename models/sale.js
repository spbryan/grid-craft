const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const saleSchema = new Schema({
  saleDate: { 
    type: Date, 
    default: Date.now },
  saleLocation: {type: String},
  unitsSold: { type: Number, default: 0 },
  pricePerUnit: { type: Number, default: 0 }
});

const Sale = mongoose.model("Sale", saleSchema);

module.exports = Sale;
