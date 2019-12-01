const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productMaterialLinkSchema = new Schema({
  productId: { type: String, required: true },
  materialId: { type: String, required: true },
  quantity: { type: Number, default: 0 }
});

const ProductMaterialLink = mongoose.model("ProductMaterialLink", productMaterialLinkSchema);

module.exports = ProductMaterialLink;
