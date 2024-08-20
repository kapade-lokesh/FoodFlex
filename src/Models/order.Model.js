import mongoose from "mongoose";

const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
    totalprice: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: [
        "ORDERED",
        "CANCELLED",
        "DILIVERED",
        "PENDING",
        "OUT_FOR_DELIVERY",
      ],
      default: "PENDING",
    },

    address: {
      type: String,
      minlength: [10, "address must be min 10 character"],
    },
    pamentmethod: {
      type: String,
      enum: ["CASH", "ONLINE"],
      default: "CASH",
    },
  },
  { timestamps: true }
);

export const Order = model("Order", orderSchema);
