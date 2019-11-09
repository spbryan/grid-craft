const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const materialSchema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  materialUsed: { type: String, required: true },
  purchasedFrom: { type: String, required: true },
  purchasedUrl: { type: String },
  quantity: { type: Number, required: true },
  pricePerUnit: { type: Number, required: true},
  image: { type: String}
});

const Material = mongoose.model("Material", materialSchema);

module.exports = Material;
