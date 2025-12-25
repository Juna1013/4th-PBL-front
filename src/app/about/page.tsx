'use client';

import Navigation from '@/components/Navigation';

export default function About() {
    return (
        <div className="min-h-screen">
            <Navigation />

            <main className="pt-24 px-6 pb-20">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            システム解説
                        </h1>
                        <p className="text-xl text-slate-400">
                            ハードウェアとソフトウェアの連携アーキテクチャ
                        </p>
                    </div>

                    <div className="space-y-16">
                        {/* システム構成図 */}
                        <section className="bg-slate-800/40 border border-slate-700/50 rounded-3xl p-10 backdrop-blur-sm">
                            <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-amber-400 pl-4">アーキテクチャ概要</h2>

                            <div className="grid md:grid-cols-3 gap-6 text-center">
                                {/* Pico W */}
                                <div className="p-6 rounded-xl bg-slate-800 border border-slate-600 shadow-lg relative">
                                    <div className="text-4xl mb-4">🚗</div>
                                    <h3 className="text-lg font-bold text-white mb-2">Raspberry Pi Pico W</h3>
                                    <p className="text-sm text-slate-400">センサーデータ取得<br />WiFi通信</p>

                                    {/* 矢印 */}
                                    <div className="hidden md:block absolute top-1/2 -right-8 transform -translate-y-1/2 text-slate-500 z-10 text-2xl">
                                        →
                                    </div>
                                    <div className="md:hidden my-4 text-slate-500">↓</div>
                                </div>

                                {/* API Server */}
                                <div className="p-6 rounded-xl bg-slate-800 border border-slate-600 shadow-lg relative">
                                    <div className="text-4xl mb-4">☁️</div>
                                    <h3 className="text-lg font-bold text-white mb-2">Next.js API</h3>
                                    <p className="text-sm text-slate-400">データ受信・蓄積<br />インメモリ管理</p>

                                    {/* 矢印 */}
                                    <div className="hidden md:block absolute top-1/2 -right-8 transform -translate-y-1/2 text-slate-500 z-10 text-2xl">
                                        →
                                    </div>
                                    <div className="md:hidden my-4 text-slate-500">↓</div>
                                </div>

                                {/* Client */}
                                <div className="p-6 rounded-xl bg-slate-800 border border-slate-600 shadow-lg">
                                    <div className="text-4xl mb-4">🖥️</div>
                                    <h3 className="text-lg font-bold text-white mb-2">Web Dashboard</h3>
                                    <p className="text-sm text-slate-400">リアルタイム表示<br />React (SWR/Polling)</p>
                                </div>
                            </div>
                        </section>

                        {/* API仕様 */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-amber-400 pl-4">通信プロトコル</h2>

                            <div className="space-y-6">
                                <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 font-mono text-sm overflow-x-auto">
                                    <div className="text-amber-400 mb-2">// エンドポイント: POST /api/telemetry</div>
                                    <pre className="text-slate-300">
                                        {`{
  "sensors": [0, 1, 1, 1, 1, 1, 1, 0], // 0:黒, 1:白
  "timestamp": "2024-03-20T10:00:00.000Z"
}`}
                                    </pre>
                                </div>

                                <p className="text-slate-400 leading-relaxed">
                                    Raspberry Pi Pico Wは、500ms（デフォルト）ごとに上記のJSONデータをAPIエンドポイントへ送信します。
                                    サーバー側では常に最新のN件のデータを保持し、クライアントからのポーリングリクエストに対して最新状態を返却します。
                                </p>
                            </div>
                        </section>

                        {/* 開発環境 */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-amber-400 pl-4">技術スタック</h2>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="px-4 py-3 bg-slate-800 rounded-lg text-center text-slate-300 border border-slate-700">Next.js 14</div>
                                <div className="px-4 py-3 bg-slate-800 rounded-lg text-center text-slate-300 border border-slate-700">TypeScript</div>
                                <div className="px-4 py-3 bg-slate-800 rounded-lg text-center text-slate-300 border border-slate-700">Tailwind CSS</div>
                                <div className="px-4 py-3 bg-slate-800 rounded-lg text-center text-slate-300 border border-slate-700">MicroPython</div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
