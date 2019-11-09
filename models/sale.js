const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const saleSchema = new Schema({
  saleDate: { 
    type: Date, 
    default: Date.now },
  quantity: { type: Number, default: 0 },
});

const Sale = mongoose.model("Sale", saleSchema);

module.exports = Sale;
