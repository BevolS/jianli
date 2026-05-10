"use client";

import { useState } from "react";

export default function UpgradePage() {
  const [plan, setPlan] = useState<"monthly" | "yearly">("monthly");
  const [order, setOrder] = useState<{
    orderNo: string;
    amount: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState("");

  async function handleCreateOrder() {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "创建订单失败");
      } else {
        setOrder(data);
      }
    } catch {
      setError("网络错误，请稍后重试");
    } finally {
      setLoading(false);
    }
  }

  // If order has been created, show QR code
  if (order) {
    return (
      <div className="max-w-lg mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
          <div className="text-5xl mb-4">📱</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            请扫码付款
          </h2>
          <p className="text-gray-500 mb-6">
            使用支付宝或微信扫描下方二维码完成支付
          </p>

          {/* QR Code */}
          <div className="w-64 h-64 mx-auto bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center mb-4">
            <img
              src="/payment-qr.jpg"
              alt="收款二维码"
              className="w-56 h-56 object-contain"
              onError={(e) => {
                // If QR image doesn't exist, show placeholder
                (e.target as HTMLImageElement).style.display = "none";
                const parent = (e.target as HTMLImageElement).parentElement;
                if (parent) {
                  parent.innerHTML = `
                    <div class="text-center">
                      <p class="text-gray-400 text-sm mb-2">请放置你的收款码</p>
                      <p class="text-gray-300 text-xs">将收款码保存为 public/payment-qr.jpg</p>
                    </div>
                  `;
                }
              }}
            />
          </div>

          {/* Order details */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left text-sm">
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">订单号</span>
              <span className="text-gray-900 font-mono">{order.orderNo}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">套餐</span>
              <span className="text-gray-900">
                {plan === "monthly" ? "月度高级版" : "年度高级版"}
              </span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-2">
              <span className="text-gray-500">金额</span>
              <span className="text-xl font-bold text-gray-900">
                ¥{order.amount}
              </span>
            </div>
          </div>

          {/* Paid button */}
          {paid ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-700">
              ✅ 已提交，管理员验证后会激活你的高级版
            </div>
          ) : (
            <button
              onClick={async () => {
                // Notify admin via order status (admin checks manually)
                setPaid(true);
                // Could also send a notification here
              }}
              className="w-full bg-green-600 text-white py-3 rounded-full font-medium hover:bg-green-700 transition-colors"
            >
              ✅ 我已付款完成
            </button>
          )}

          <p className="text-xs text-gray-400 mt-4">
            付款后点击上方按钮，管理员将在 24 小时内为你激活
          </p>
        </div>
      </div>
    );
  }

  // Plan selection
  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">升级高级版</h1>
        <p className="text-gray-500 mt-2">解锁无限次 AI 简历优化</p>
      </div>

      {/* Plan cards */}
      <div className="space-y-4 mb-8">
        {/* Monthly */}
        <div
          onClick={() => setPlan("monthly")}
          className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
            plan === "monthly"
              ? "border-blue-500 bg-blue-50"
              : "border-gray-100 hover:border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">月度高级版</h3>
              <p className="text-sm text-gray-500">无限次简历优化 + 全部功能</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-gray-900">¥29</span>
              <span className="text-gray-400 text-sm"> /月</span>
            </div>
          </div>
          {plan === "monthly" && (
            <div className="mt-3 text-sm text-blue-600 font-medium">
              ✓ 当前选择
            </div>
          )}
        </div>

        {/* Yearly */}
        <div
          onClick={() => setPlan("yearly")}
          className={`p-6 rounded-xl border-2 cursor-pointer transition-all relative ${
            plan === "yearly"
              ? "border-blue-500 bg-blue-50"
              : "border-gray-100 hover:border-gray-200"
          }`}
        >
          <div className="absolute -top-3 right-6 bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
            省 ¥149
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">年度高级版</h3>
              <p className="text-sm text-gray-500">最划算的选择</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-gray-900">¥199</span>
              <span className="text-gray-400 text-sm"> /年</span>
            </div>
          </div>
          {plan === "yearly" && (
            <div className="mt-3 text-sm text-blue-600 font-medium">
              ✓ 当前选择
            </div>
          )}
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-sm text-center mb-4">{error}</p>
      )}

      <button
        onClick={handleCreateOrder}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3.5 rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 disabled:opacity-50"
      >
        {loading ? "处理中..." : "🚀 确认升级"}
      </button>

      <div className="mt-8 bg-gray-50 rounded-xl p-4">
        <h4 className="font-semibold text-gray-900 mb-2">高级版权益</h4>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>✓ 无限次 AI 简历分析</li>
          <li>✓ 深度内容优化</li>
          <li>✓ ATS 兼容检测</li>
          <li>✓ 岗位匹配定制</li>
          <li>✓ 多模板支持</li>
          <li>✓ 优先客服支持</li>
        </ul>
      </div>
    </div>
  );
}
