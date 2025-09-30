import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Car, Github, ExternalLink, AlertTriangle, Home } from 'lucide-react';
import { LogsList } from '../components/LogsList';
import { useHealthCheck } from '../hooks/useApi';

export default function LogsPage() {
  const { isError: healthError } = useHealthCheck();

  return (
    <>
      <Head>
        <title>認識ログ - ライントレースカー制御システム</title>
        <meta name="description" content="音声認識履歴とコマンド実行ログの確認" />
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
                    認識ログ
                  </h1>
                  <p className="subtitle">
                    音声認識履歴とコマンド実行ログ
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
            {/* 認識ログ */}
            <LogsList />
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