'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <div className="min-h-screen text-slate-200 font-sans" style={{
      background: 'radial-gradient(circle at top right, #1e293b 0%, #0f172a 100%)',
      fontFamily: "'Segoe UI', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif",
    }}>
      <Navigation />

      <main className="pt-24 px-6 pb-20">
        {/* ヒーローセクション */}
        <section className="max-w-7xl mx-auto py-20 text-center">
          <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 text-amber-400 text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            New Ver. 2.0 リリース
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            次世代の <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
              ライントレース解析
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-slate-400 mb-10 leading-relaxed">
            リアルタイムテレメトリ、高度なセンサー可視化、そして詳細なログ分析。<br />
            教育と研究のために設計された、完全なデジタルツインプラットフォーム。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="px-8 py-4 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
            >
              ダッシュボードを開く
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-medium border border-slate-700 transition-all"
            >
              システム解説を見る
            </Link>
          </div>
        </section>

        {/* 機能グリッド */}
        <section className="max-w-7xl mx-auto py-20 grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm hover:border-amber-500/30 transition-all group">
            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">リアルタイム可視化</h3>
            <p className="text-slate-400 leading-relaxed">
              500ms間隔で更新されるセンサーデータを瞬時にグラフ化。肉眼では捉えられない微細な挙動を可視化します。
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm hover:border-amber-500/30 transition-all group">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="text-2xl">⚡️</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Next.js ネイティブ</h3>
            <p className="text-slate-400 leading-relaxed">
              FastAPI等のバックエンドサーバーは不要。Next.js API Routesのみで完結する、シンプルで堅牢なアーキテクチャ。
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm hover:border-amber-500/30 transition-all group">
            <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">レスポンシブデザイン</h3>
            <p className="text-slate-400 leading-relaxed">
              PC、タブレット、スマートフォン。あらゆるデバイスで最適化された美しいUIを提供します。
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
