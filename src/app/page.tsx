'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { GlobeIcon, BarChartIcon, GearIcon, ArrowRightIcon, GitHubLogoIcon } from '@radix-ui/react-icons';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-24 px-6 pb-20">
        {/* ヒーローセクション */}
        <section className="max-w-7xl mx-auto py-10 text-center">

          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-slate-900 mb-6 flex flex-col md:flex-row items-center justify-center gap-6">

            {/* SVGグラデーション定義 */}
            <svg width="0" height="0" className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
              <defs>
                <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
              </defs>
            </svg>

            <GitHubLogoIcon
              className="w-24 h-24"
              style={{ fill: 'url(#icon-gradient)' }}
            />

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600 pb-2">
              Endra Hub
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-slate-500 mb-0 leading-relaxed">
            リアルタイムテレメトリ、高度なセンサー可視化、そして詳細なログ分析。<br />
            教育と研究のために設計された、完全なデジタルツインプラットフォーム。
          </p>

        </section>

        {/* ナビゲーショングリッド */}
        <section className="max-w-7xl mx-auto py-10 grid md:grid-cols-3 gap-8">
          <Link href="/features" className="block p-8 rounded-3xl bg-white border border-slate-200 hover:border-sky-400/50 hover:shadow-lg hover:shadow-sky-100 transition-all group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10">
              <GlobeIcon className="w-6 h-6 text-sky-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3 relative z-10 flex items-center gap-2">
              デジタルツインとは？
              <ArrowRightIcon className="w-4 h-4 text-sky-500 transform group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-slate-500 leading-relaxed relative z-10">
              物理的なライントレースカーをデジタル空間で再現する仕組みとその機能を紹介します。
            </p>
          </Link>

          <Link href="/dashboard" className="block p-8 rounded-3xl bg-white border border-slate-200 hover:border-sky-400/50 hover:shadow-lg hover:shadow-sky-100 transition-all group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10">
              <BarChartIcon className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3 relative z-10 flex items-center gap-2">
              ダッシュボードへ飛ぶ
              <ArrowRightIcon className="w-4 h-4 text-sky-500 transform group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-slate-500 leading-relaxed relative z-10">
              リアルタイムのセンサーデータを確認し、ライントレースカーの状態を監視します。
            </p>
          </Link>

          <Link href="/about" className="block p-8 rounded-3xl bg-white border border-slate-200 hover:border-sky-400/50 hover:shadow-lg hover:shadow-sky-100 transition-all group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-12 h-12 bg-cyan-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10">
              <GearIcon className="w-6 h-6 text-cyan-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3 relative z-10 flex items-center gap-2">
              技術解説
              <ArrowRightIcon className="w-4 h-4 text-sky-500 transform group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-slate-500 leading-relaxed relative z-10">
              Next.js APIとRaspberry Pi Pico Wの連携アーキテクチャやシステム構成を解説します。
            </p>
          </Link>
        </section>
      </main>
    </div>
  );
}
