"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Order = {
  id: number;
  orderNo: string;
  amount: number;
  plan: string;
  status: string;
  createdAt: string;
  userEmail: string | null;
  userName: string | null;
};

export default function AdminOrderList({
  orders,
}: {
  orders: Order[];
}) {
  const router = useRouter();
  const [activating, setActivating] = useState<string | null>(null);

  async function handleActivate(orderNo: string) {
    if (!confirm("确认已收到付款，激活该用户的高级版？")) return;

    setActivating(orderNo);
    try {
      const res = await fetch("/api/admin/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNo }),
      });

      const data = await res.json();
      if (res.ok) {
        router.refresh();
      } else {
        alert(data.error || "操作失败");
      }
    } catch {
      alert("网络错误");
    } finally {
      setActivating(null);
    }
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white border border-yellow-200 rounded-xl p-4 flex items-center justify-between"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-xs font-mono text-gray-400">
                {order.orderNo}
              </span>
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                待处理
              </span>
            </div>
            <p className="text-gray-900 font-medium">
              {order.userName || order.userEmail}
            </p>
            <p className="text-sm text-gray-500">
              ¥{order.amount} · {order.plan === "monthly" ? "月度" : "年度"} ·{" "}
              {new Date(order.createdAt).toLocaleString("zh-CN")}
            </p>
          </div>
          <button
            onClick={() => handleActivate(order.orderNo)}
            disabled={activating === order.orderNo}
            className="bg-green-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-1"
          >
            {activating === order.orderNo ? (
              <>
                <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                处理中
              </>
            ) : (
              "✅ 确认收款"
            )}
          </button>
        </div>
      ))}
    </div>
  );
}
