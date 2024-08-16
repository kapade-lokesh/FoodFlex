import mongoose from "mongoose";

const { Schema, model } = mongoose;

const productSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "product name  must required"],
    },

    description: {
      type: String,
      required: [true, "description must required"],
      minlength: [6, "discription should be above 6 character"],
    },

    image: {
      type: String,
    },

    price: {
      type: String,
      required: [true, "price must required"],
    },

    stock: {
      type: Number,
      required: [true, "stock must required"],
      default: 5,
    },

    publicid: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Product = model("Product", productSchema);
