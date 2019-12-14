const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const saleSchema = new Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  productNumber: {type: Number, required: true},
  saleDate: { 
    type: Date, 
    default: Date.now },
  saleLocation: {type: String},
  unitsSold: { type: Number, default: 0 },
  netCostPerUnit: { type: Number, default: 0 },
  pricePerUnit: { type: Number, default: 0 },
  totalProfit: { type: Number, default: 0 }
});

const Sale = mongoose.model("Sale", saleSchema);

module.exports = Sale;
