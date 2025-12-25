'use client';

import { useTelemetry } from '@/hooks/useTelemetry';
import { useEffect, useState, useRef } from 'react';
import Navigation from '@/components/Navigation';
import LineVisualizer from '@/components/dashboard/LineVisualizer';

export default function Dashboard() {
    const { data, dataCount, error } = useTelemetry(500);
    const [startTime] = useState(Date.now());
    const [uptime, setUptime] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);
    const logContainerRef = useRef<HTMLDivElement>(null);
    const lastLogTimeRef = useRef<number>(Date.now());

    // 稼働時間を更新
    useEffect(() => {
        const interval = setInterval(() => {
            setUptime(Math.floor((Date.now() - startTime) / 1000));
        }, 1000);
        return () => clearInterval(interval);
    }, [startTime]);

    const sensors = data?.sensors || data?.sensor_values || Array(8).fill(1);
    const sensorBinary = data?.sensor_binary || sensors.join('');

    // サンプルデータ生成（ランダムなセンサー値）
    const formatData = (s: number[], t: number) => `{
  "sensors": [${s.join(', ')}],
  "timestamp": ${t}
}`;

    // サンプルデータ生成（ランダムなセンサー値）
    const generateSampleSensors = () => {
        // 基本は白(1)で、ランダムに黒(0)を混ぜる
        return Array(8).fill(0).map(() => Math.random() > 0.8 ? 0 : 1);
    };

    // ログ追加のヘルパー関数
    const addLogEntry = (sensorData: number[], timestamp: number) => {
        const logEntry = formatData(sensorData, timestamp);
        setLogs(prev => {
            const newLogs = [...prev, logEntry];
            if (newLogs.length > 50) {
                return newLogs.slice(newLogs.length - 50);
            }
            return newLogs;
        });
        lastLogTimeRef.current = Date.now();
    };

    // 1. データ受信時のログ更新
    useEffect(() => {
        if (data) {
            addLogEntry(sensors, data.timestamp || Date.now());
        }
    }, [data, sensors]);

    // 2. 通信断時のサンプルデータ自動生成 (Keep Alive)
    useEffect(() => {
        const interval = setInterval(() => {
            // 2秒以上更新がなければサンプルデータを流す
            if (Date.now() - lastLogTimeRef.current > 2000) {
                const sampleSensors = generateSampleSensors();
                addLogEntry(sampleSensors, Date.now());
            }
        }, 500); // 0.5秒間隔でチェック・生成

        return () => clearInterval(interval);
    }, []);

    // 自動スクロール
    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="min-h-screen">
            <Navigation />

            {/* ナビゲーションバーの高さ分のパディング */}
            <div className="pt-24 px-6 pb-6">
                {/* 背景の装飾的な光 */}
                <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-sky-200/40 rounded-full blur-[100px] pointer-events-none" />
                <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-5xl mx-auto relative z-10">
                    {/* ヘッダー */}
                    <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                        <div>
                            <h1 className="text-3xl font-light tracking-tight text-slate-800 mb-2">
                                テレメトリ <span className="font-bold text-sky-500">ダッシュボード</span>
                            </h1>
                            <p className="text-slate-500 text-xs tracking-wider uppercase">リアルタイム・ライントレース解析システム</p>
                        </div>
                    </header>

                    {/* メイングリッド */}
                    <div className="grid gap-16">

                        {/* デジタルツイン可視化 */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-sky-100/50 rounded-lg text-xl">🏎️</div>
                                <div>
                                    <h2 className="text-xl font-semibold text-slate-800">Digital Twin Monitor</h2>
                                    <p className="text-xs text-slate-500">Real-time 2D Visualization</p>
                                </div>
                            </div>
                            <div className="flex justify-center py-4">
                                <LineVisualizer
                                    sensors={sensors}
                                    error={data?.control?.error}
                                />
                            </div>
                        </section>

                        {/* センサーアレイ */}
                        <section>
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100/50 rounded-lg text-xl">📍</div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-slate-800">センサーアレイ</h2>
                                        <p className="text-xs text-slate-500">8チャンネル 光学ライン検出</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs text-slate-500 block font-bold">最終更新</span>
                                    <span className="text-sm font-mono text-sky-600">{new Date().toLocaleTimeString('ja-JP')}</span>
                                </div>
                            </div>

                            <div className="space-y-8">
                                {/* センサー可視化 */}
                                <div className="flex justify-center">
                                    <div className="flex gap-3 md:gap-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm inline-flex">
                                        {sensors.map((value, index) => (
                                            <div key={index} className="flex flex-col items-center gap-3 group">
                                                <div className="relative">
                                                    <div
                                                        className={`
                              w-8 h-12 md:w-10 md:h-16 rounded-md transition-all duration-300 border
                              ${value === 0
                                                                ? 'bg-gradient-to-t from-sky-500 to-sky-300 border-sky-200 shadow-[0_0_20px_rgba(14,165,233,0.3)] scale-105'
                                                                : 'bg-slate-100 border-slate-200 shadow-none'
                                                            }
                            `}
                                                    ></div>
                                                    {value === 0 && (
                                                        <div className="absolute top-1 left-1 right-1 h-[1px] bg-white/50 rounded-full"></div>
                                                    )}
                                                </div>

                                                <span className={`
                          text-[10px] uppercase font-bold tracking-wider transition-colors duration-300
                          ${value === 0 ? 'text-sky-600' : 'text-slate-400'}
                        `}>CH.{index}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* データメトリクス */}
                                <div className="flex justify-center mt-6">
                                    <div className="flex items-center gap-6 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                                        <div>
                                            <span className="text-xs text-slate-400 uppercase tracking-widest block mb-1 font-bold">バイナリパターン</span>
                                            <span className="text-3xl font-light text-slate-800 font-mono tracking-widest">{sensorBinary}</span>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-500 flex items-center justify-center">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 強化学習用データセット出力 */}
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-slate-700 font-medium">Reinforcement Learning Set</h3>
                                    <div className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-sky-600 border border-sky-200">
                                        LIVE LOG
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        const text = logs.join('\n');
                                        navigator.clipboard.writeText(text);
                                    }}
                                    className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 px-3 py-1 rounded-full transition-colors flex items-center gap-1"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                                    Copy All
                                </button>
                            </div>
                            <div>
                                <div
                                    ref={logContainerRef}
                                    className="bg-slate-50 p-4 rounded-xl border border-slate-200 h-64 overflow-y-auto font-mono text-xs md:text-sm text-slate-600 scroll-smooth shadow-inner"
                                >
                                    {logs.length === 0 ? (
                                        <div className="text-slate-400 italic">Waiting for telemetry data...</div>
                                    ) : (
                                        logs.map((log, index) => (
                                            <div key={index} className="mb-2 whitespace-pre border-b border-slate-200 pb-2 last:border-0 last:pb-0 last:mb-0">
                                                {log}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
