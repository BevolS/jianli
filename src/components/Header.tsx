import Link from "next/link";
import { auth } from "@/lib/auth";

export default async function Header() {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  const isAdmin =
    isLoggedIn && session?.user?.email === process.env.ADMIN_EMAIL;

  return (
    <header className="border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              简
            </div>
            <span className="text-xl font-bold text-gray-900">简历</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  控制台
                </Link>
                <Link
                  href="/dashboard/upgrade"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  升级
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin/orders"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    管理
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link
                  href="/#features"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  功能
                </Link>
                <Link
                  href="/#pricing"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  价格
                </Link>
                <Link
                  href="/#how-it-works"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  如何使用
                </Link>
              </>
            )}
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <form action="/api/auth/signout" method="POST">
                <button
                  type="submit"
                  className="text-gray-500 hover:text-gray-700 transition-colors text-sm cursor-pointer"
                >
                  退出
                </button>
              </form>
            ) : (
              <>
                <Link
                  href="/auth"
                  className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
                >
                  登录
                </Link>
                <Link
                  href="/auth"
                  className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors"
                >
                  免费开始
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
