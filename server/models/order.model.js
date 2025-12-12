import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          min: 1,
          required: true,
        },
        price: {
          type: Number,
          min: 0,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      min: 0,
      required: true,
    },
    stripeSessionId: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Order", OrderSchema);

export default OrderModel;
