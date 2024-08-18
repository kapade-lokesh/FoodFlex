import mongoose from "mongoose";

const { Schema, model } = mongoose;

const cartSchema = Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "user must required for cart"],
    },

    item: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    price: {
      type: Number,
      default:0
    }
  },
  { timestapms: true }
);

export const Cart = model("Cart", cartSchema);
