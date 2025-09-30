import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Car, Github, ExternalLink, AlertTriangle, Home } from 'lucide-react';
import { CommandDisplay } from '../components/CommandDisplay';
import { useHealthCheck } from '../hooks/useApi';

export default function MonitorPage() {
  const { isError: healthError } = useHealthCheck();

  return (
    <>
      <Head>
        <title>コマンド監視 - ライントレースカー制御システム</title>
        <meta name="description" content="リアルタイムコマンド表示と制御状況の監視" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col">
        {/* API接続エラー時のグローバル通知 */}
        {healthError && (
          <div className="notification-bar">
            <AlertTriangle size={16} />
            <span className="text-sm md:text-base">
              デモモード: APIサーバーに接続できません（本番環境では正常動作）
            </span>
          </div>
        )}

        {/* ヘッダー */}
        <header className="header">
          <div className="container">
            <div className="flex items-center justify-between w-full">
              <Link href="/" className="logo">
                <div className="logo-icon">
                  <Car size={24} />
                </div>
                <div>
                  <h1 className="title">
                    コマンド監視
                  </h1>
                  <p className="subtitle">
                    リアルタイム制御状況の監視
                  </p>
                </div>
              </Link>

              <div className="flex items-center gap-3 ml-auto">

                <a
                  href={process.env.NEXT_PUBLIC_API_URL?.replace('/api', '/docs') || 'http://localhost:8000/docs'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                  title="API ドキュメント"
                >
                  <ExternalLink size={16} className="text-white" />
                </a>

                <a
                  href="https://github.com/your-username/line-tracer-control"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                  title="GitHub リポジトリ"
                >
                  <Github size={16} className="text-white" />
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* メインコンテンツ */}
        <main className="flex-1 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            {/* 最新コマンド表示 */}
            <CommandDisplay />

            {/* コマンド説明カード */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 lg:p-10 border border-white/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-emerald-400/15 to-transparent rounded-full -ml-16 -mt-16"></div>

              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">コマンド詳細</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {/* LEFT */}
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                        <span className="text-white text-sm font-bold">←</span>
                      </div>
                      <span className="font-semibold text-blue-800">LEFT</span>
                    </div>
                    <p className="text-blue-700 text-sm">左方向への移動コマンド</p>
                  </div>

                  {/* RIGHT */}
                  <div className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg">
                        <span className="text-white text-sm font-bold">→</span>
                      </div>
                      <span className="font-semibold text-emerald-800">RIGHT</span>
                    </div>
                    <p className="text-emerald-700 text-sm">右方向への移動コマンド</p>
                  </div>

                  {/* FORWARD */}
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
                        <span className="text-white text-sm font-bold">↑</span>
                      </div>
                      <span className="font-semibold text-purple-800">FORWARD</span>
                    </div>
                    <p className="text-purple-700 text-sm">前進コマンド</p>
                  </div>

                  {/* BACK */}
                  <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg">
                        <span className="text-white text-sm font-bold">↓</span>
                      </div>
                      <span className="font-semibold text-amber-800">BACK</span>
                    </div>
                    <p className="text-amber-700 text-sm">後退コマンド</p>
                  </div>

                  {/* STOP */}
                  <div className="p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-gradient-to-r from-red-500 to-red-600 rounded-lg">
                        <span className="text-white text-sm font-bold">■</span>
                      </div>
                      <span className="font-semibold text-red-800">STOP</span>
                    </div>
                    <p className="text-red-700 text-sm">停止コマンド</p>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <h3 className="font-semibold text-slate-800 mb-2">監視情報</h3>
                  <ul className="text-slate-600 text-sm space-y-1">
                    <li>• コマンドは音声認識によりリアルタイムで更新されます</li>
                    <li>• 最新のコマンドが上部に大きく表示されます</li>
                    <li>• デモモード時は接続待機状態として表示されます</li>
                    <li>• 実行中のコマンドはアニメーション効果で強調されます</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* フッター */}
        <footer className="bg-slate-800 text-white py-6 md:py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-slate-300 text-sm md:text-base">
                © 2025 ライントレースカー制御システム - FastAPI & Next.js で構築
              </p>
              <div className="mt-3 md:mt-4 flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-slate-400">
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  TailwindCSS
                </span>
                <span>React Query</span>
                <span>TypeScript</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}