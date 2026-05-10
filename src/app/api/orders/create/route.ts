import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users, orders } from "@/lib/db-schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "请先登录" }, { status: 401 });
  }

  const { plan } = await request.json();
  if (!plan || !["monthly", "yearly"].includes(plan)) {
    return NextResponse.json({ error: "无效的套餐" }, { status: 400 });
  }

  const amount = plan === "monthly" ? 29 : 199;

  // Check user
  const userList = await db
    .select()
    .from(users)
    .where(eq(users.email, session.user.email))
    .limit(1);

  if (userList.length === 0) {
    return NextResponse.json({ error: "用户不存在" }, { status: 404 });
  }

  const user = userList[0];

  if (user.isPremium) {
    return NextResponse.json({ error: "你已经是高级会员了" }, { status: 400 });
  }

  // Generate order number
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
  const orderNo = `ORD-${dateStr}-${rand}`;

  // Create order
  await db.insert(orders).values({
    orderNo,
    userId: user.id,
    amount,
    plan,
    status: "pending",
  });

  return NextResponse.json({ orderNo, amount, plan });
}
