const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const materialSchema = new Schema({
  materialNumber: {type: Number, required: true, unique: true},
  activeIndicator: {type: String, required: true},
  userId: { type: String, required: true },
  name: { type: String, required: true },
  skuNumber: { type: String },
  type: { type: String, required: true },
  gauge: { type: String },
  length: { type: String },
  notes: {type: String},
  purchasedFrom: { type: String, required: true },
  purchasedLink: { type: String },
  totalQuantity: { type: Number, required: true },
  currentQuantity: { type: Number, required: true },
  price: { type: Number, required: true },
  pricePerUnit: { type: Number, required: true},
  imageLink: { type: String}
});

const Material = mongoose.model("Material", materialSchema);

module.exports = Material;
