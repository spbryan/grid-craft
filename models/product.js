const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productNumber: {type: Number, required: true, unique: true},
  userId: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  focalBead: { type: String, required: true },
  findings: { type: String, required: true },
  numberAvailable: { type: Number, default: 0 },
  numberSold: { type: Number, default: 0 },
  suggestedPrice: { type: Number, default: 0},
  netCostPerUnit: { type: Number, default: 0},
  imageLink: { type: String}
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
