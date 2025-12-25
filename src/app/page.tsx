'use client';

import { useTelemetry } from '@/hooks/useTelemetry';
import { useEffect, useState } from 'react';

export default function Home() {
  const { data, dataCount, error } = useTelemetry(500);
  const [startTime] = useState(Date.now());
  const [uptime, setUptime] = useState(0);

  // 稼働時間を更新
  useEffect(() => {
    const interval = setInterval(() => {
      setUptime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const sensors = data?.sensors || data?.sensor_values || Array(8).fill(1);
  const blackCount = data?.black_detected || sensors.filter((v) => v === 0).length;
  const sensorBinary = data?.sensor_binary || sensors.join('');

  return (
    <div className="min-h-screen p-6 text-slate-200 font-sans" style={{
      background: 'radial-gradient(circle at top right, #1e293b 0%, #0f172a 100%)',
      fontFamily: "'Segoe UI', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif", // 日本語フォントを追加
    }}>
      {/* 背景の装飾的な光 */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* ヘッダー */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-light tracking-tight text-white mb-2">
              テレメトリ <span className="font-bold text-amber-400">ダッシュボード</span>
            </h1>
            <p className="text-slate-400 text-xs tracking-wider uppercase">リアルタイム・ライントレース解析システム</p>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col items-end">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">システム状態</span>
              <div className="flex items-center gap-2 text-emerald-400 font-medium bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
                <span className="text-sm">稼働中</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-slate-500 uppercase tracking-wider font-bold">受信データ数</span>
              <span className="text-lg font-mono text-white tabular-nums">{dataCount.toLocaleString()}</span>
            </div>
          </div>
        </header>

        {/* メインカード */}
        <div className="grid gap-6">
          {/* センサーカード */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-800/40 backdrop-blur-xl shadow-2xl">
            {/* カードヘッダー */}
            <div className="px-8 py-6 border-b border-slate-700/50 flex justify-between items-center bg-gradient-to-r from-slate-800/50 to-transparent">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-400/10 rounded-lg">
                  <span className="text-xl">📍</span>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">センサーアレイ</h2>
                  <p className="text-xs text-slate-400">8チャンネル 光学ライン検出</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 block font-bold">最終更新</span>
                <span className="text-sm font-mono text-amber-400">{new Date().toLocaleTimeString('ja-JP')}</span>
              </div>
            </div>

            <div className="p-8">
              {/* センサー可視化 - 高級なインジケーター風 */}
              <div className="flex justify-center mb-12">
                <div className="flex gap-3 md:gap-4 p-6 rounded-2xl bg-[#0a0f1c] border border-slate-800 shadow-inner inline-flex">
                  {sensors.map((value, index) => (
                    <div key={index} className="flex flex-col items-center gap-3 group">
                      {/* インジケーターライト */}
                      <div className="relative">
                        <div
                          className={`
                            w-8 h-12 md:w-10 md:h-16 rounded-md transition-all duration-300 border
                            ${value === 0
                              ? 'bg-gradient-to-t from-amber-600 to-amber-300 border-amber-200 shadow-[0_0_20px_rgba(251,191,36,0.4)] scale-105'
                              : 'bg-slate-800/50 border-slate-700 shadow-none opacity-40'
                            }
                          `}
                        ></div>
                        {/* 反射光エフェクト */}
                        {value === 0 && (
                          <div className="absolute top-1 left-1 right-1 h-[1px] bg-white/50 rounded-full"></div>
                        )}
                      </div>

                      {/* ラベル */}
                      <span className={`
                        text-[10px] uppercase font-bold tracking-wider transition-colors duration-300
                        ${value === 0 ? 'text-amber-400' : 'text-slate-600'}
                      `}>CH.{index}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* データメトリクス */}
              <div className="grid grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-700/50 flex items-center justify-between group hover:border-amber-500/30 transition-colors">
                  <div>
                    <span className="text-xs text-slate-400 uppercase tracking-widest block mb-1 font-bold">検出ライン数</span>
                    <span className="text-3xl font-light text-white">{blackCount}</span>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${blackCount > 0 ? 'bg-amber-400/20 text-amber-400' : 'bg-slate-800 text-slate-600'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-700/50 flex items-center justify-between group hover:border-amber-500/30 transition-colors">
                  <div>
                    <span className="text-xs text-slate-400 uppercase tracking-widest block mb-1 font-bold">バイナリパターン</span>
                    <span className="text-3xl font-light text-white font-mono tracking-widest">{sensorBinary}</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                  </div>
                </div>
              </div>
            </div>

            {/* 装飾的なフッターライン */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-50"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
