import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Car, Github, ExternalLink, AlertTriangle, Info, Activity, List, Volume2 } from 'lucide-react';
import { useHealthCheck } from '../hooks/useApi';

export default function HomePage() {
  const { isError: healthError } = useHealthCheck();

  return (
    <>
      <Head>
        <title>ライントレースカー制御システム</title>
        <meta name="description" content="FastAPI + React による音声認識制御システム" />
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
              <div className="logo">
                <div className="logo-icon">
                  <Car size={24} />
                </div>
                <div>
                  <h1 className="title">
                    ライントレースカー制御システム
                  </h1>
                  <p className="subtitle">
                    FastAPI + React による音声認識制御システム
                  </p>
                </div>
              </div>

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
            {/* ウェルカムセクション */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent mb-4">
                ライントレースカー制御システム
              </h1>
              <p className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto">
                FastAPI + React による音声認識制御システムのダッシュボード
              </p>
            </div>

            {/* ナビゲーションタイル */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {/* 音声認識制御ページへのリンク */}
              <Link href="/speech" className="group">
                <div className="bg-white/50 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/30 relative overflow-hidden transition-all duration-300 hover:shadow-3xl hover:-translate-y-2 hover:scale-105">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-red-400/15 to-transparent rounded-full -ml-16 -mt-16"></div>

                  <div className="relative z-10 text-center">
                    <div className="p-6 bg-gradient-to-r from-red-500 to-red-600 rounded-3xl shadow-xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 mx-auto w-fit">
                      <Volume2 className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">音声認識制御</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      音声コマンドでライントレースカーを直接制御
                    </p>
                  </div>
                </div>
              </Link>

              {/* システム概要ページへのリンク */}
              <Link href="/overview" className="group">
                <div className="bg-white/50 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/30 relative overflow-hidden transition-all duration-300 hover:shadow-3xl hover:-translate-y-2 hover:scale-105">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400/15 to-transparent rounded-full -ml-16 -mt-16"></div>

                  <div className="relative z-10 text-center">
                    <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl shadow-xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 mx-auto w-fit">
                      <Info className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">システム概要</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      システム構成と各コンポーネントの詳細情報を確認
                    </p>
                  </div>
                </div>
              </Link>

              {/* コマンド・モニタリングページへのリンク */}
              <Link href="/monitor" className="group">
                <div className="bg-white/50 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/30 relative overflow-hidden transition-all duration-300 hover:shadow-3xl hover:-translate-y-2 hover:scale-105">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-emerald-400/15 to-transparent rounded-full -ml-16 -mt-16"></div>

                  <div className="relative z-10 text-center">
                    <div className="p-6 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-3xl shadow-xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 mx-auto w-fit">
                      <Activity className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">コマンド監視</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      リアルタイムコマンド表示と制御状況の監視
                    </p>
                  </div>
                </div>
              </Link>

              {/* ログページへのリンク */}
              <Link href="/logs" className="group">
                <div className="bg-white/50 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/30 relative overflow-hidden transition-all duration-300 hover:shadow-3xl hover:-translate-y-2 hover:scale-105">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-400/15 to-transparent rounded-full -ml-16 -mt-16"></div>

                  <div className="relative z-10 text-center">
                    <div className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 rounded-3xl shadow-xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 mx-auto w-fit">
                      <List className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">認識ログ</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      音声認識履歴とコマンド実行ログの確認
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            {/* ステータス表示 */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/30">
                <div className={`w-3 h-3 rounded-full ${healthError ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400 animate-pulse'}`}></div>
                <span className="text-slate-700 font-medium">
                  {healthError ? 'デモモード' : 'システム稼働中'}
                </span>
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