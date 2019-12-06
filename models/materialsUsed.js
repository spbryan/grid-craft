const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const materialsUsedSchema = new Schema({
  userId: { type: String, required: true },
  materialId: {type: Number, required: true},
  productId: {type: String, required: true},
  quantity: { type: Number, required: true }
});

const MaterialsUsed = mongoose.model("MaterialsUsed", materialsUsedSchema);

module.exports = MaterialsUsed;
