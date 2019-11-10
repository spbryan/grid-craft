const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  currentCount: { type: Number, default: 0 },
  pricePerUnit: { type: Number, default: 0},
  netCostPerUnit: { type: Number, default: 0},
  image: { type: String},
  materials: [
    {
      type: Schema.Types.ObjectId,
      ref: "Material"
    }
  ],
  sales: [
    {
      type: Schema.Types.ObjectId,
      ref: "Sale"
    }
  ]
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
