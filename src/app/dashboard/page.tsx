import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { users } from "@/lib/db-schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import ResumeUpload from "@/components/ResumeUpload";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/auth");
  }

  const userList = await db
    .select()
    .from(users)
    .where(eq(users.email, session.user.email))
    .limit(1);

  const user = userList[0];
  const credits = user.isPremium ? "∞" : String(user.credits);
  const isAdmin = session.user.email === process.env.ADMIN_EMAIL;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Welcome */}
      <div className="mb-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              你好，{user.name || "用户"} 👋
            </h1>
            <p className="text-gray-500 mt-2">
              {user.isPremium
                ? "感谢你的支持！尽情使用全部功能吧 🎉"
                : "上传你的简历，AI 将在 30 秒内完成分析和优化"}
            </p>
          </div>
          {!user.isPremium && (
            <Link
              href="/dashboard/upgrade"
              className="hidden sm:inline-flex bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-full font-medium hover:opacity-90 transition-all shadow-lg shadow-blue-200"
            >
              ⭐ 升级高级版
            </Link>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="p-5 bg-white rounded-xl border border-gray-100">
          <p className="text-sm text-gray-500">剩余优化次数</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{credits}</p>
        </div>
        <div className="p-5 bg-white rounded-xl border border-gray-100">
          <p className="text-sm text-gray-500">已优化简历</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">0</p>
        </div>
        <div className="p-5 bg-white rounded-xl border border-gray-100">
          <p className="text-sm text-gray-500">账户状态</p>
          <p
            className={`text-2xl font-bold mt-1 ${
              user.isPremium ? "text-purple-600" : "text-green-600"
            }`}
          >
            {user.isPremium ? "✨ 高级版" : "免费版"}
          </p>
        </div>
      </div>

      {/* Premium upgrade banner (mobile) */}
      {!user.isPremium && (
        <Link
          href="/dashboard/upgrade"
          className="sm:hidden block mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-xl p-4 text-center"
        >
          <p className="text-blue-700 font-medium">⭐ 升级高级版，解锁无限次优化</p>
        </Link>
      )}

      {/* Upload & Analysis */}
      {user.isPremium || (user.credits ?? 0) > 0 ? (
        <ResumeUpload />
      ) : (
        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            优化次数已用完
          </h2>
          <p className="text-gray-500 mb-6">
            升级高级版可获得无限次 AI 简历优化
          </p>
          <Link
            href="/dashboard/upgrade"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
          >
            ⭐ 升级高级版
          </Link>
        </div>
      )}

      {/* Admin link */}
      {isAdmin && (
        <div className="mt-8 pt-8 border-t border-gray-100">
          <Link
            href="/admin/orders"
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            管理后台 →
          </Link>
        </div>
      )}
    </div>
  );
}
