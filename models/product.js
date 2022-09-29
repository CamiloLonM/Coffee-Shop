const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  //La relación con user  .... La ref (colección)
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  //La relación con category
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  description: {
    type: String,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
  },
});

ProductSchema.methods.toJSON = function () {
  const { __v, status, ...data } = this.toObject(); // lo que No retorno,
  return data;
};
module.exports = model("Product", ProductSchema);
