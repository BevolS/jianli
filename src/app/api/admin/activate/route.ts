import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users, orders } from "@/lib/db-schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  const session = await auth();
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail || session?.user?.email !== adminEmail) {
    return NextResponse.json({ error: "无权操作" }, { status: 403 });
  }

  const { orderNo } = await request.json();
  if (!orderNo) {
    return NextResponse.json({ error: "缺少订单号" }, { status: 400 });
  }

  // Find order
  const orderList = await db
    .select()
    .from(orders)
    .where(eq(orders.orderNo, orderNo))
    .limit(1);

  if (orderList.length === 0) {
    return NextResponse.json({ error: "订单不存在" }, { status: 404 });
  }

  const order = orderList[0];
  if (order.status !== "pending") {
    return NextResponse.json({ error: "订单已处理" }, { status: 400 });
  }

  const now = new Date().toISOString();

  // Update order
  await db
    .update(orders)
    .set({ status: "activated", paidAt: now, activatedAt: now })
    .where(eq(orders.id, order.id));

  // Upgrade user to premium
  await db
    .update(users)
    .set({ isPremium: true, premiumSince: now, credits: 999 })
    .where(eq(users.id, order.userId));

  return NextResponse.json({ success: true });
}
