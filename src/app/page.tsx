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

            {/* GitHub Octocat Icon with Gradient */}
            <svg viewBox="0 0 15 15" className="w-24 h-24" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="cat-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
              </defs>
              <path
                d="M7.5 0C3.358 0 0 3.358 0 7.5c0 3.314 2.15 6.126 5.126 7.116.375.069.512-.163.512-.362 0-.178-.006-.65-.01-1.192-1.897.356-2.414-.506-2.534-1.013-.069-.172-.357-.7-.61-.841-.212-.116-.513-.4-.005-.407.475-.006.812.438.925.619.538.919 1.414.656 1.76.5.056-.39.21-.656.381-.806-1.514-.172-3.106-.757-3.106-3.371 0-.744.266-1.35.7-1.825-.069-.172-.303-.863.066-1.8 0 0 .572-.181 1.875.7.544-.15 1.128-.225 1.709-.228.581.003 1.166.078 1.709.228 1.303-.884 1.875-.7 1.875-.7.372.938.138 1.628.069 1.8.438.475.7 1.081.7 1.825 0 2.622-1.597 3.197-3.116 3.366.216.184.409.553.409 1.116 0 .806-.006 1.456-.006 1.653 0 .2.134.434.516.363A7.502 7.502 0 0 0 15 7.5C15 3.358 11.642 0 7.5 0Z"
                fill="url(#cat-gradient)"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>

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
