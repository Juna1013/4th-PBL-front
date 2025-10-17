import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Car, Github, ExternalLink, AlertTriangle, Info, Activity, List, Volume2, Mic } from 'lucide-react';
import { useHealthCheck, useCommand } from '../hooks/useApi';
import SpeechRecognition from '../components/SpeechRecognition';
import { CommandDisplay } from '../components/CommandDisplay';

export default function DashboardPage() {
  const { isError: healthError } = useHealthCheck();
  const [lastSentCommand, setLastSentCommand] = useState<string | null>(null);
  const { refetch: refetchCommand } = useCommand();

  const handleCommandSent = async (command: string) => {
    setLastSentCommand(command);
    // コマンド送信後に現在のコマンドを再取得
    setTimeout(() => {
      refetchCommand();
    }, 500);
  };

  return (
    <>
      <Head>
        <title>統合ダッシュボード - ライントレースカー制御システム</title>
        <meta name="description" content="全ての機能を統合したダッシュボード" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8">
        {/* ウェルカムセクション */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent mb-4">
            統合ダッシュボード
          </h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto">
            ライントレースカーの全機能をここから制御・監視できます
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左カラム */}
          <div className="lg:col-span-2 space-y-8">
            <SpeechRecognition onCommandSent={handleCommandSent} />
          </div>

          {/* 右カラム */}
          <div className="space-y-8">
            <CommandDisplay />

            {/* コマンド詳細 */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-white/30">
              <h2 className="text-xl font-bold text-slate-800 mb-4">コマンド詳細</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                      <span className="text-white text-sm font-bold">←</span>
                    </div>
                    <span className="font-semibold text-blue-800">LEFT</span>
                  </div>
                  <p className="text-blue-700 text-sm">左方向への移動</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg">
                      <span className="text-white text-sm font-bold">→</span>
                    </div>
                    <span className="font-semibold text-emerald-800">RIGHT</span>
                  </div>
                  <p className="text-emerald-700 text-sm">右方向への移動</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
                      <span className="text-white text-sm font-bold">↑</span>
                    </div>
                    <span className="font-semibold text-purple-800">FORWARD</span>
                  </div>
                  <p className="text-purple-700 text-sm">前進</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg">
                      <span className="text-white text-sm font-bold">↓</span>
                    </div>
                    <span className="font-semibold text-amber-800">BACK</span>
                  </div>
                  <p className="text-amber-700 text-sm">後退</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200 col-span-full">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gradient-to-r from-red-500 to-red-600 rounded-lg">
                      <span className="text-white text-sm font-bold">■</span>
                    </div>
                    <span className="font-semibold text-red-800">STOP</span>
                  </div>
                  <p className="text-red-700 text-sm">停止</p>
                </div>
              </div>
            </div>

            {/* システム概要 */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-white/30">
              <h2 className="text-xl font-bold text-slate-800 mb-4">システム概要</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg"><span className="text-2xl">🎤</span></div>
                  <div>
                    <h3 className="font-semibold text-slate-800">音声認識</h3>
                    <p className="text-slate-600 text-sm">ColabのFastAPIが音声を処理</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-100 rounded-lg"><span className="text-2xl">🌐</span></div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Web API</h3>
                    <p className="text-slate-600 text-sm">RenderでホストされたAPIが中継</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-lg"><span className="text-2xl">🚗</span></div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Pico W</h3>
                    <p className="text-slate-600 text-sm">コマンドを元にカーを制御</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
