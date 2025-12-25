'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-24 px-6 pb-20">
        {/* ヒーローセクション */}
        <section className="max-w-7xl mx-auto py-10 text-center">


          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            次世代の <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
              ライントレース解析
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-slate-400 mb-0 leading-relaxed">
            リアルタイムテレメトリ、高度なセンサー可視化、そして詳細なログ分析。<br />
            教育と研究のために設計された、完全なデジタルツインプラットフォーム。
          </p>


        </section>

        {/* ナビゲーショングリッド */}
        <section className="max-w-7xl mx-auto py-10 grid md:grid-cols-3 gap-8">
          <Link href="/features" className="block p-8 rounded-3xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm hover:border-blue-500/50 hover:bg-slate-800/80 transition-all group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10">
              <span className="text-2xl">🌐</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3 relative z-10 flex items-center gap-2">
              デジタルツインとは？
              <svg className="w-4 h-4 text-blue-500 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </h3>
            <p className="text-slate-400 leading-relaxed relative z-10">
              物理的なライントレースカーをデジタル空間で再現する仕組みとその機能を紹介します。
            </p>
          </Link>

          <Link href="/dashboard" className="block p-8 rounded-3xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm hover:border-amber-500/50 hover:bg-slate-800/80 transition-all group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3 relative z-10 flex items-center gap-2">
              ダッシュボードへ飛ぶ
              <svg className="w-4 h-4 text-amber-500 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </h3>
            <p className="text-slate-400 leading-relaxed relative z-10">
              リアルタイムのセンサーデータを確認し、ライントレースカーの状態を監視します。
            </p>
          </Link>

          <Link href="/about" className="block p-8 rounded-3xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm hover:border-emerald-500/50 hover:bg-slate-800/80 transition-all group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10">
              <span className="text-2xl">🛠️</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3 relative z-10 flex items-center gap-2">
              技術解説
              <svg className="w-4 h-4 text-emerald-500 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </h3>
            <p className="text-slate-400 leading-relaxed relative z-10">
              Next.js APIとRaspberry Pi Pico Wの連携アーキテクチャやシステム構成を解説します。
            </p>
          </Link>
        </section>
      </main>
    </div>
  );
}
