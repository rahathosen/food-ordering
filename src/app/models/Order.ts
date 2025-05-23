import mongoose, { models } from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userEmail: { type: String },
    phone: { type: String },
    streetAddress: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    postalCode: { type: String },
    cartProducts: { type: Object },
    paid: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["ordered", "cooking", "packaging", "delivering", "delivered", "canceled"],
      default: "ordered",
    },
  },
  { timestamps: true }
);

export const Order = models?.Order || mongoose.model("Order", OrderSchema);