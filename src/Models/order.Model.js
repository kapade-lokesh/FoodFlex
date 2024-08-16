import mongoose from "mongoose";

const { Schema, model } = mongoose;

const orderSchema = Schema({
  user: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "user must required"],
  },
  product: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "product must required"],
  },

  item: [
    {
      product: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "product",
      },

      quantity: {
        type: Number,
      },
    },
  ],

  status: {
    type: String,
    enum: ["ORDERED", "CANCLE", "DELIVERD", "PENDING", "OUT_FOR_DELIVERY"],
    default: "ORDERED",
  },

  totalprice: {
    type: Number,
    default: 0,
  },
});

export const Order = model("Order", orderSchema);
