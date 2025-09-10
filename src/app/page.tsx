import Link from 'next/link';
import { ArrowRight, Mic, MessageSquare, Activity, Play, Zap, Shield } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-gray-100 dark:bg-grid-gray-800 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(17,17,17,1),rgba(17,17,17,0.6))]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 mb-6">
                <Zap className="w-4 h-4 mr-2" />
                <span>AI駆動ロボット制御</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                次世代
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent"> AI制御</span>
                <br />ロボットシステム
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 font-light leading-relaxed max-w-3xl mx-auto">
                音声認識とAIチャットによる直感的なロボット制御。
                <br />高精度な動作と簡単な操作を両立させた革新的なシステム。
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                href="/dashboard"
                className="group inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>制御システム起動</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#features"
                className="inline-flex items-center space-x-2 px-8 py-4 rounded-2xl text-lg font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300"
              >
                <span>詳細を見る</span>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">99.9%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">制御精度</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">&lt;100ms</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">応答速度</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">24/7</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">稼働時間</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              革新的な機能
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              最新のAI技術と音声認識を活用した、直感的で高精度なロボット制御システム
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Mic className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">高精度音声制御</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  CNNベースの音声認識により、自然な話し言葉でロボットを直感的に制御できます。
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">AIチャット制御</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Gemini APIを活用した自然言語処理により、会話形式でロボットに指示を出せます。
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">リアルタイム監視</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  高度なテレメトリーシステムでロボットの状態をリアルタイムで監視・制御できます。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              システム構成
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              エッジデバイスからクラウドまで、堅牢で拡張性の高いアーキテクチャ
            </p>
          </div>
          
          <div className="relative">
            <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-12">
              {/* Raspberry Pi Pico W */}
              <div className="flex-1 max-w-sm">
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl">🎙️</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">Raspberry Pi Pico W</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center text-sm mb-4">エッジデバイス</p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• 音声録音</li>
                    <li>• モーター制御</li>
                    <li>• センサーデータ取得</li>
                  </ul>
                </div>
              </div>
              
              {/* Arrow */}
              <div className="hidden lg:block">
                <ArrowRight className="w-8 h-8 text-gray-400 dark:text-gray-600" />
              </div>
              <div className="lg:hidden">
                <div className="w-8 h-8 text-gray-400 dark:text-gray-600 rotate-90">
                  <ArrowRight className="w-full h-full" />
                </div>
              </div>

              {/* Google Colab */}
              <div className="flex-1 max-w-sm">
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl">🧠</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">Google Colab</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center text-sm mb-4">AI処理基盤</p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• CNN音声認識</li>
                    <li>• 機械学習推論</li>
                    <li>• データ分析</li>
                  </ul>
                </div>
              </div>
              
              {/* Arrow */}
              <div className="hidden lg:block">
                <ArrowRight className="w-8 h-8 text-gray-400 dark:text-gray-600" />
              </div>
              <div className="lg:hidden">
                <div className="w-8 h-8 text-gray-400 dark:text-gray-600 rotate-90">
                  <ArrowRight className="w-full h-full" />
                </div>
              </div>

              {/* Next.js Web App */}
              <div className="flex-1 max-w-sm">
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl">💻</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">Next.js Web App</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-center text-sm mb-4">ユーザーインターフェース</p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• AIチャット</li>
                    <li>• リアルタイム監視</li>
                    <li>• データ可視化</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            今すぐ体験してみませんか？
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            革新的なAIロボット制御システムで、未来の技術を体験してください
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center space-x-3 bg-white text-blue-600 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            <Play className="w-5 h-5" />
            <span>ダッシュボードを開く</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}