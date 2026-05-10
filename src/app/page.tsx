import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* ===== Hero Section ===== */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
        <div className="absolute top-0 -left-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-40 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="flex flex-col items-center text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              AI 驱动的智能简历优化
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 max-w-3xl leading-[1.1]">
              让 AI 帮你写出
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> 面试官无法拒绝 </span>
              的简历
            </h1>

            {/* Subtext */}
            <p className="mt-6 text-lg md:text-xl text-gray-500 max-w-2xl leading-relaxed">
              上传你的简历，AI 在 30 秒内分析并给出优化建议。
              针对不同岗位定制优化内容，让你的简历通过率提升 3 倍。
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/auth"
                className="bg-blue-600 text-white text-lg px-8 py-3.5 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300"
              >
                免费优化简历
              </Link>
              <Link
                href="#how-it-works"
                className="text-gray-700 text-lg px-8 py-3.5 rounded-full font-semibold border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
              >
                了解更多
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400">
              <span className="flex items-center gap-1">⭐ 已帮助 1000+ 求职者</span>
              <span className="flex items-center gap-1">📈 简历通过率提升 3 倍</span>
              <span className="flex items-center gap-1">⚡ 平均 30 秒完成优化</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== How It Works Section ===== */}
      <section id="how-it-works" className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              三步搞定
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              不需要任何技巧，上传简历就能用
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "上传简历",
                desc: "支持 PDF、Word 格式，直接拖拽或选择文件上传",
                icon: "📄",
              },
              {
                step: "02",
                title: "AI 智能分析",
                desc: "AI 自动分析你的简历内容，从 HR 视角给出优化建议",
                icon: "🤖",
              },
              {
                step: "03",
                title: "下载优化版",
                desc: "一键下载优化后的简历，可直接用于求职投递",
                icon: "🚀",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative p-8 rounded-2xl border border-gray-100 bg-white hover:border-blue-100 hover:shadow-lg transition-all group"
              >
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <span className="text-sm font-semibold text-blue-600 mb-2 block">
                  {item.step}
                </span>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Features Section ===== */}
      <section id="features" className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              强大的 AI 优化功能
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              不只是改语法，全面提升你的简历质量
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "智能内容优化",
                desc: "AI 分析你的工作经历，用专业词汇和量化成果改写描述",
              },
              {
                title: "岗位匹配定制",
                desc: "根据目标岗位要求，自动调整简历重点和关键词",
              },
              {
                title: "ATS 兼容检测",
                desc: "检查简历是否能通过招聘系统（ATS）的自动筛选",
              },
              {
                title: "语法纠错",
                desc: "自动检测并修正语法错误、拼写问题和标点规范",
              },
              {
                title: "排版优化",
                desc: "优化简历格式和排版，让阅读体验更专业",
              },
              {
                title: "多模板选择",
                desc: "多种专业简历模板，适配不同行业和岗位",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl bg-white border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Pricing Section ===== */}
      <section id="pricing" className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              简单透明的定价
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              先免费试用，满意后再升级
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Free Tier */}
            <div className="p-8 rounded-2xl border border-gray-200 bg-white">
              <h3 className="text-xl font-bold text-gray-900">免费版</h3>
              <p className="mt-2 text-sm text-gray-500">先试试效果</p>
              <p className="mt-6">
                <span className="text-4xl font-bold text-gray-900">¥0</span>
              </p>
              <ul className="mt-6 space-y-3">
                {["1 次简历分析", "基础优化建议", "查看优化预览"].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-green-500">✓</span> {item}
                    </li>
                  )
                )}
              </ul>
              <Link
                href="/auth"
                className="mt-8 block text-center border border-gray-200 text-gray-700 font-semibold py-3 rounded-full hover:bg-gray-50 transition-all"
              >
                免费开始
              </Link>
            </div>

            {/* Premium Tier */}
            <div className="p-8 rounded-2xl border-2 border-blue-500 bg-blue-50/30 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
                最受欢迎
              </div>
              <h3 className="text-xl font-bold text-gray-900">高级版</h3>
              <p className="mt-2 text-sm text-gray-500">无限次数优化</p>
              <p className="mt-6">
                <span className="text-4xl font-bold text-gray-900">¥29</span>
                <span className="text-gray-400 text-sm"> /月</span>
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "无限次简历分析",
                  "深度 AI 优化",
                  "ATS 兼容检测",
                  "岗位匹配定制",
                  "多模板支持",
                  "优先客服支持",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-green-500">✓</span> {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/auth"
                className="mt-8 block text-center bg-blue-600 text-white font-semibold py-3 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
              >
                立即升级
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA Section ===== */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            现在就优化你的简历
          </h2>
          <p className="mt-4 text-lg text-blue-100">
            免费试用，无需信用卡。30 秒内看到 AI 优化效果。
          </p>
          <Link
            href="/auth"
            className="mt-8 inline-block bg-white text-blue-600 text-lg px-10 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all shadow-xl"
          >
            免费开始优化 →
          </Link>
        </div>
      </section>
    </div>
  );
}
