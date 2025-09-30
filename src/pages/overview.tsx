import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Car, Github, ExternalLink, AlertTriangle } from 'lucide-react';
import { useHealthCheck } from '../hooks/useApi';

export default function OverviewPage() {
  const { isError: healthError } = useHealthCheck();

  return (
    <>
      <Head>
        <title>システム概要 - ライントレースカー制御システム</title>
        <meta name="description" content="システム構成と各コンポーネントの詳細情報" />
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
                    システム概要
                  </h1>
                  <p className="subtitle">
                    ライントレースカー制御システムの詳細
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
            {/* システム概要カード */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 lg:p-10 mb-8 md:mb-10 border border-white/30 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 left-0 w-32 md:w-48 h-32 md:h-48 bg-gradient-to-br from-blue-400/15 to-transparent rounded-full -ml-16 md:-ml-24 -mt-16 md:-mt-24"></div>
              <div className="absolute bottom-0 right-0 w-24 md:w-36 h-24 md:h-36 bg-gradient-to-tl from-purple-400/15 to-transparent rounded-full -mr-12 md:-mr-18 -mb-12 md:-mb-18"></div>

              <div className="relative z-10">
                <div className="text-center mb-6 md:mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent mb-3">
                    システム概要
                  </h2>
                  <p className="text-slate-600 text-sm md:text-base">音声認識によるライントレースカー制御システム</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                  <div className="group bg-gradient-to-br from-blue-50/80 to-indigo-100/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 border border-blue-200/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:scale-105">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-4 md:p-5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl md:rounded-3xl shadow-xl mb-4 md:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                        <span className="text-3xl md:text-4xl">🎤</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2 md:mb-3">音声認識</h3>
                      <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                        Colab の FastAPI が音声を処理し、リアルタイムでコマンドを認識
                      </p>
                    </div>
                  </div>

                  <div className="group bg-gradient-to-br from-emerald-50/80 to-teal-100/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 border border-emerald-200/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:scale-105">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-4 md:p-5 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl md:rounded-3xl shadow-xl mb-4 md:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                        <span className="text-3xl md:text-4xl">🌐</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2 md:mb-3">Web API</h3>
                      <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                        Render でホストされた API サーバーが処理を中継
                      </p>
                    </div>
                  </div>

                  <div className="group bg-gradient-to-br from-purple-50/80 to-violet-100/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 border border-purple-200/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 hover:scale-105">
                    <div className="flex flex-col items-center text-center">
                      <div className="p-4 md:p-5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl md:rounded-3xl shadow-xl mb-4 md:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                        <span className="text-3xl md:text-4xl">🚗</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2 md:mb-3">Pico W</h3>
                      <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                        最新コマンドを取得してライントレースカーを制御
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 詳細情報カード */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 lg:p-10 border border-white/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-400/15 to-transparent rounded-full -mr-16 -mt-16"></div>

              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">技術構成</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-700 mb-4">フロントエンド</h3>
                    <ul className="space-y-2 text-slate-600">
                      <li>• Next.js 15.5.4</li>
                      <li>• React with TypeScript</li>
                      <li>• TailwindCSS</li>
                      <li>• React Query</li>
                      <li>• Lucide React Icons</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-slate-700 mb-4">バックエンド</h3>
                    <ul className="space-y-2 text-slate-600">
                      <li>• FastAPI</li>
                      <li>• Python 3.9+</li>
                      <li>• Uvicorn ASGI Server</li>
                      <li>• CORS ミドルウェア</li>
                      <li>• RESTful API 設計</li>
                    </ul>
                  </div>
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