export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                简
              </div>
              <span className="text-lg font-bold text-gray-900">简历</span>
            </div>
            <p className="text-gray-500 text-sm max-w-md">
              使用 AI 技术帮你优化简历，让每一个求职机会都不错过。
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">产品</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="/#features" className="hover:text-gray-900 transition-colors">功能</a></li>
              <li><a href="/#pricing" className="hover:text-gray-900 transition-colors">价格</a></li>
              <li><a href="/#how-it-works" className="hover:text-gray-900 transition-colors">如何使用</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">公司</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><span className="cursor-default">jianli.ai</span></li>
              <li><span className="cursor-default">contact@jianli.ai</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} 简历. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
