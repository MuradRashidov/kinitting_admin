import Order from "@/lib/models/order";
import Customer from "@/lib/models/customer";
import { connectDB } from "@/lib/mongoDB";
import { format } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    await connectDB()

    const orders = await Order.find().sort({ createdAt: "desc" })

    const orderDetails = await Promise.all(orders.map(async (order) => {
      const customer = await Customer.findOne({ clerkId: order.customerClerkId })
      return {
        _id: order._id,
        customer: customer.name,
        products: order.products.length,
        totalAmount: order.totalAmount,
        createdAt: format(order.createdAt, "MMM dd, yyyy")
      }
    }))

    return NextResponse.json(orderDetails, { status: 200 });
  } catch (err) {
    console.log("[orders_GET]", err)
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export const dynamic = "force-dynamic";