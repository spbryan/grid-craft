const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const materialsUsedSchema = new Schema({
  userId: { type: String, required: true },
  materialNumber: {type: Number, required: true},
  materialId: {type: String, required: true},
  productId: {type: String, required: true},
  quantity: { type: Number, required: true },
  pricePerUnit: { type: Number}
});

const MaterialsUsed = mongoose.model("MaterialsUsed", materialsUsedSchema);

module.exports = MaterialsUsed;
