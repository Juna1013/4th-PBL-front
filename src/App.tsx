import React from 'react';
import { Car, Github, ExternalLink } from 'lucide-react';
import { CommandDisplay } from './components/CommandDisplay';
import { TestControls } from './components/TestControls';
import { LogsList } from './components/LogsList';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500 p-2 rounded-lg">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  ライントレースカー制御システム
                </h1>
                <p className="text-sm text-gray-600">
                  FastAPI + React による音声認識制御システム
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              
                href={import.meta.env.VITE_API_URL?.replace('/api', '/docs') || 'http://localhost:8000/docs'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                API Docs
              </a>
              
                href="https://github.com/your-username/line-tracer-control"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* システム概要カード */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎤</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">音声認識</h3>
              <p className="text-sm text-gray-600">
                Colab の FastAPI が音声を処理
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🌐</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Web API</h3>
              <p className="text-sm text-gray-600">
                Render でホストされた API サーバー
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🚗</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Pico W</h3>
              <p className="text-sm text-gray-600">
                最新コマンドを取得して制御
              </p>
            </div>
          </div>
        </div>

        {/* 最新コマンド表示 */}
        <CommandDisplay />

        {/* テストコントロール */}
        <TestControls />

        {/* ログと統計 */}
        <LogsList />
      </main>

      {/* フッター */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-600">
            © 2025 Line Tracer Control System - Built with FastAPI & React
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
