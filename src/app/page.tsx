import Link from 'next/link';
import { ArrowRight, Mic, MessageSquare, Activity } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* ヘッダー */}
        <div className="text-center mb-16">
          <div className="text-6xl mb-4 filter drop-shadow-lg">🛸</div>
          <h1 className="text-4xl font-bold text-white mb-4 tracking-wide">
            AIロボット制御システム
          </h1>
          <p className="text-xl text-slate-300 mb-8 font-light">
            音声コマンドとAIチャットで高精度制御
          </p>
          
          <Link
            href="/dashboard"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <span>制御システム起動</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* 機能紹介 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-xl p-6 text-center hover:bg-slate-800/70 transition-all duration-300">
            <Mic className="w-12 h-12 text-cyan-400 mx-auto mb-4 drop-shadow-md" />
            <h3 className="text-xl font-semibold mb-2 text-white">音声制御</h3>
            <p className="text-slate-300">
              高精度音声認識でロボットを直感操作
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-xl p-6 text-center hover:bg-slate-800/70 transition-all duration-300">
            <MessageSquare className="w-12 h-12 text-emerald-400 mx-auto mb-4 drop-shadow-md" />
            <h3 className="text-xl font-semibold mb-2 text-white">AIチャット</h3>
            <p className="text-slate-300">
              自然言語処理による知的制御システム
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-xl p-6 text-center hover:bg-slate-800/70 transition-all duration-300">
            <Activity className="w-12 h-12 text-violet-400 mx-auto mb-4 drop-shadow-md" />
            <h3 className="text-xl font-semibold mb-2 text-white">リアルタイム監視</h3>
            <p className="text-slate-300">
              高度なテレメトリーシステム搭載
            </p>
          </div>
        </div>

        {/* システム構成 */}
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-center mb-8 text-white">システム構成</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                <span className="text-2xl">🎙️</span>
              </div>
              <div className="font-semibold text-white">Raspberry Pi Pico W</div>
              <div className="text-sm text-slate-400">音声録音・モーター制御</div>
            </div>

            <ArrowRight className="w-6 h-6 text-slate-500" />

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                <span className="text-2xl">🧠</span>
              </div>
              <div className="font-semibold text-white">Google Colab</div>
              <div className="text-sm text-slate-400">CNNによる音声認識</div>
            </div>

            <ArrowRight className="w-6 h-6 text-slate-500" />

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                <span className="text-2xl">💻</span>
              </div>
              <div className="font-semibold text-white">Next.js Web App</div>
              <div className="text-sm text-slate-400">AIチャット・可視化</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
