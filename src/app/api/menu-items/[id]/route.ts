import { MenuItem } from "@/app/models/MenuItem";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI!);
  }
}

// Fetch a single menu item by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const menuItem = await MenuItem.findById(id);
    if (!menuItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(menuItem);
  } catch (err) {
    return NextResponse.json({ error: "Internal Server Error", details: err.message }, { status: 500 });
  }
}
