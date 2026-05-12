import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { orders, users } from "@/lib/db-schema";
import { eq, desc } from "drizzle-orm";
import AdminOrderList from "./AdminOrderList";

export default async function AdminOrdersPage() {
  const session = await auth();
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail || session?.user?.email !== adminEmail) {
    redirect("/");
  }

  // Fetch all orders with user info
  const allOrders = await db
    .select({
      id: orders.id,
      orderNo: orders.orderNo,
      amount: orders.amount,
      plan: orders.plan,
      status: orders.status,
      createdAt: orders.createdAt,
      userEmail: users.email,
      userName: users.name,
    })
    .from(orders)
    .leftJoin(users, eq(orders.userId, users.id))
    .orderBy(desc(orders.id));

  const pendingOrders = allOrders.filter((o: { status: string }) => o.status === "pending");

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">订单管理</h1>
        <p className="text-gray-500 mt-2">
          待处理订单: {pendingOrders.length} 个
        </p>
      </div>

      {/* Pending orders */}
      {pendingOrders.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            ⏳ 待处理
          </h2>
          <AdminOrderList orders={pendingOrders} />
        </div>
      )}

      {/* All orders */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          全部订单 ({allOrders.length})
        </h2>
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 text-gray-500 font-medium">
                  订单号
                </th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">
                  用户
                </th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">
                  金额
                </th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">
                  套餐
                </th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">
                  状态
                </th>
                <th className="text-left px-4 py-3 text-gray-500 font-medium">
                  时间
                </th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order: { id: number; orderNo: string; amount: number; plan: string; status: string; createdAt: string; userName: string | null; userEmail: string | null }) => (
                <tr key={order.id} className="border-b border-gray-50">
                  <td className="px-4 py-3 font-mono text-gray-900 text-xs">
                    {order.orderNo}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {order.userName || order.userEmail}
                  </td>
                  <td className="px-4 py-3 font-medium">
                    ¥{order.amount}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {order.plan === "monthly" ? "月度" : "年度"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${
                        order.status === "activated"
                          ? "bg-green-100 text-green-700"
                          : order.status === "paid"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {order.status === "activated"
                        ? "已激活"
                        : order.status === "paid"
                          ? "已付款"
                          : "待付款"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">
                    {new Date(order.createdAt).toLocaleString("zh-CN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
