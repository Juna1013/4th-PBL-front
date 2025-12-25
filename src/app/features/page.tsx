'use client';

import Navigation from '@/components/Navigation';

export default function Features() {
    return (
        <div className="min-h-screen text-slate-200 font-sans" style={{
            background: 'radial-gradient(circle at top right, #1e293b 0%, #0f172a 100%)',
            fontFamily: "'Segoe UI', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif",
        }}>
            <Navigation />

            <main className="pt-24 px-6 pb-20">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            システム機能
                        </h1>
                        <p className="text-xl text-slate-400">
                            ライントレースカーの制御と分析に必要な全ての機能を提供
                        </p>
                    </div>

                    <div className="space-y-24">
                        {/* 1. センサー可視化 */}
                        <div className="flex flex-col md:flex-row items-center gap-12">
                            <div className="flex-1 space-y-6">
                                <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-2xl text-amber-500">
                                    📍
                                </div>
                                <h2 className="text-3xl font-bold text-white">8チャンネル・センサーアレイ</h2>
                                <p className="text-lg text-slate-400 leading-relaxed">
                                    8つの赤外線センサーの状態をリアルタイムで追跡。各センサーの検出状態（白/黒）を視覚的に表現し、ライントレースの精度を詳細に分析します。
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-slate-300">
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                        各チャンネルの個別状態表示
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-300">
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                        検出ライン数のリアルタイムカウント
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-300">
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                        バイナリパターンの即時解析
                                    </li>
                                </ul>
                            </div>
                            <div className="flex-1 relative">
                                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-transparent rounded-3xl blur-2xl" />
                                <div className="relative bg-slate-800/80 border border-slate-700/50 rounded-3xl p-8 backdrop-blur-xl">
                                    {/* モックUI */}
                                    <div className="flex gap-2 justify-center">
                                        {[0, 1, 0, 0, 1, 1, 1, 0].map((v, i) => (
                                            <div key={i} className={`w-8 h-12 rounded ${v ? 'bg-slate-700' : 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]'}`} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. サーバーサイド統合 */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-12">
                            <div className="flex-1 space-y-6">
                                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-2xl text-blue-500">
                                    🚀
                                </div>
                                <h2 className="text-3xl font-bold text-white">Next.js API統合</h2>
                                <p className="text-lg text-slate-400 leading-relaxed">
                                    従来のPythonバックエンドサーバーを完全に置き換え、Next.jsのAPI Routes機能のみでデータの受信、処理、配信を行います。
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-slate-300">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                        サーバーレスアーキテクチャ対応
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-300">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                        WebSocket不要の軽量通信
                                    </li>
                                    <li className="flex items-center gap-3 text-slate-300">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                        シングルトンパターンによる状態管理
                                    </li>
                                </ul>
                            </div>
                            <div className="flex-1 relative">
                                <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/20 to-transparent rounded-3xl blur-2xl" />
                                <div className="relative bg-slate-800/80 border border-slate-700/50 rounded-3xl p-8 backdrop-blur-xl font-mono text-sm text-slate-300">
                                    <div className="mb-2 text-emerald-400">POST /api/telemetry</div>
                                    <div className="pl-4 border-l-2 border-slate-700 space-y-1">
                                        <div>{`{`}</div>
                                        <div className="pl-4">"sensors": [0, 1, 1, 0...],</div>
                                        <div className="pl-4">"timestamp": 1234567890</div>
                                        <div>{`}`}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
