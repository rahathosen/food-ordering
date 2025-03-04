import { Order } from "@/app/models/Order";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  await mongoose.connect(process.env.MONGODB_URI!);
  const authSession = await getServerSession(authOptions);
  const userEmail = authSession?.user?.email;
  const { cartProducts, address } = await req.json();

  if (!cartProducts || cartProducts.length === 0) {
    return NextResponse.json(
      { success: false, message: "Cart is empty" },
      { status: 400 }
    );
  }

  // Create order in the database
  const order = await Order.create({
    userEmail,
    ...address,
    cartProducts,
    paid: false, // Mark as unpaid
    orderStatus: "pending", // Status of the order
    createdAt: new Date(),
  });

  return NextResponse.json({
    success: true,
    message: "Order placed successfully!",
    orderId: order._id,
  });
}
