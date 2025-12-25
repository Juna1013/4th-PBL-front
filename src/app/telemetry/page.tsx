'use client';

import { useTelemetry } from '@/hooks/useTelemetry';
import { useEffect, useState } from 'react';

export default function TelemetryDashboard() {
    const { data, dataCount, error } = useTelemetry(500);
    const [startTime] = useState(Date.now());
    const [uptime, setUptime] = useState(0);
    const [stats, setStats] = useState({
        errorSum: 0,
        maxLeft: 0,
        maxRight: 0,
    });

    // 稼働時間を更新
    useEffect(() => {
        const interval = setInterval(() => {
            setUptime(Math.floor((Date.now() - startTime) / 1000));
        }, 1000);
        return () => clearInterval(interval);
    }, [startTime]);

    // 統計情報を更新
    useEffect(() => {
        if (data?.control && data?.motor) {
            setStats((prev) => ({
                errorSum: prev.errorSum + Math.abs(data.control!.error),
                maxLeft: Math.max(prev.maxLeft, data.motor!.left_speed),
                maxRight: Math.max(prev.maxRight, data.motor!.right_speed),
            }));
        }
    }, [data]);

    const sensors = data?.sensors || data?.sensor_values || Array(8).fill(1);
    const blackCount = data?.black_detected || sensors.filter((v) => v === 0).length;
    const sensorBinary = data?.sensor_binary || sensors.join('');

    return (
        <div className="min-h-screen p-5" style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }}>
            <div className="max-w-[1400px] mx-auto">
                {/* ヘッダー */}
                <header className="bg-white/95 rounded-[15px] p-[20px_30px] shadow-[0_8px_32px_rgba(0,0,0,0.1)] mb-5">
                    <h1 className="text-[#333] text-[2em] mb-[10px] font-normal">
                        🚗 ライントレーサー テレメトリダッシュボード
                    </h1>
                    <div className="flex gap-5 items-center flex-wrap">
                        <div className="flex items-center gap-2 text-[0.9em] text-[#666]">
                            <div className="w-3 h-3 rounded-full bg-[#10b981] animate-pulse"></div>
                            <span>サーバー稼働中</span>
                        </div>
                        <div className="flex items-center gap-2 text-[0.9em] text-[#666]">
                            <span>📡 最終更新: <strong>{new Date().toLocaleTimeString('ja-JP')}</strong></span>
                        </div>
                        <div className="flex items-center gap-2 text-[0.9em] text-[#666]">
                            <span>📊 受信データ数: <strong>{dataCount}</strong></span>
                        </div>
                    </div>
                </header>

                {/* グリッド */}
                <div className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-5 mb-5">
                    {/* センサー表示 */}
                    <div className="bg-white/95 rounded-[15px] p-[25px] shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
                        <h2 className="text-[#333] text-[1.3em] mb-5 pb-[10px] border-b-2 border-[#667eea]">
                            📍 ラインセンサー (8ch)
                        </h2>
                        <div className="grid grid-cols-8 gap-2 mt-[15px]">
                            {sensors.map((value, index) => (
                                <div
                                    key={index}
                                    className={`
                    aspect-square rounded-lg flex items-center justify-center
                    font-bold text-[0.8em] transition-all duration-300
                    ${value === 0
                                            ? 'bg-[#1f2937] text-white shadow-[0_4px_12px_rgba(0,0,0,0.3)]'
                                            : 'bg-[#f3f4f6] text-[#9ca3af]'
                                        }
                  `}
                                >
                                    {index}
                                </div>
                            ))}
                        </div>
                        <div className="mt-[15px]">
                            <div className="flex justify-between py-3 border-b border-[#e5e7eb]">
                                <span className="text-[#666] font-medium">黒線検出数</span>
                                <span className="text-[#333] font-bold">{blackCount}</span>
                            </div>
                            <div className="flex justify-between py-3">
                                <span className="text-[#666] font-medium">センサーパターン</span>
                                <span className="text-[#333] font-bold">{sensorBinary}</span>
                            </div>
                        </div>
                    </div>

                    {/* モーター表示 */}
                    <div className="bg-white/95 rounded-[15px] p-[25px] shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
                        <h2 className="text-[#333] text-[1.3em] mb-5 pb-[10px] border-b-2 border-[#667eea]">
                            ⚙️ モーター速度
                        </h2>
                        <div className="flex gap-5 mt-[15px]">
                            <div className="flex-1">
                                <div className="text-[0.9em] text-[#666] mb-2">左モーター</div>
                                <div className="h-[30px] bg-[#f3f4f6] rounded-lg overflow-hidden relative">
                                    <div
                                        className="h-full bg-gradient-to-r from-[#667eea] to-[#764ba2] transition-all duration-300 flex items-center justify-center text-white font-bold text-[0.85em]"
                                        style={{ width: `${((data?.motor?.left_speed || 0) / 65535 * 100).toFixed(1)}%` }}
                                    >
                                        {data?.motor?.left_speed || 0}
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="text-[0.9em] text-[#666] mb-2">右モーター</div>
                                <div className="h-[30px] bg-[#f3f4f6] rounded-lg overflow-hidden relative">
                                    <div
                                        className="h-full bg-gradient-to-r from-[#667eea] to-[#764ba2] transition-all duration-300 flex items-center justify-center text-white font-bold text-[0.85em]"
                                        style={{ width: `${((data?.motor?.right_speed || 0) / 65535 * 100).toFixed(1)}%` }}
                                    >
                                        {data?.motor?.right_speed || 0}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5">
                            <div className="flex justify-between py-3 border-b border-[#e5e7eb]">
                                <span className="text-[#666] font-medium">エラー値</span>
                                <span className="text-[#333] font-bold">{data?.control?.error?.toFixed(2) || '-'}</span>
                            </div>
                            <div className="flex justify-between py-3 border-b border-[#e5e7eb]">
                                <span className="text-[#666] font-medium">ターン値</span>
                                <span className="text-[#333] font-bold">{data?.control?.turn || '-'}</span>
                            </div>
                            <div className="flex justify-between py-3">
                                <span className="text-[#666] font-medium">ベース速度</span>
                                <span className="text-[#333] font-bold">{data?.control?.base_speed || '-'}</span>
                            </div>
                        </div>
                    </div>

                    {/* WiFi情報 */}
                    <div className="bg-white/95 rounded-[15px] p-[25px] shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
                        <h2 className="text-[#333] text-[1.3em] mb-5 pb-[10px] border-b-2 border-[#667eea]">
                            📶 WiFi情報
                        </h2>
                        <div className="flex justify-between py-3 border-b border-[#e5e7eb]">
                            <span className="text-[#666] font-medium">IPアドレス</span>
                            <span className="text-[#333] font-bold">{data?.wifi?.ip || '-'}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-[#e5e7eb]">
                            <span className="text-[#666] font-medium">信号強度 (RSSI)</span>
                            <span className="text-[#333] font-bold">
                                {data?.wifi?.rssi ? `${data.wifi.rssi} dBm` : '-'}
                            </span>
                        </div>
                        <div className="flex justify-between py-3">
                            <span className="text-[#666] font-medium">タイムスタンプ</span>
                            <span className="text-[#333] font-bold">{data?.timestamp || '-'}</span>
                        </div>
                    </div>

                    {/* 統計情報 */}
                    <div className="bg-white/95 rounded-[15px] p-[25px] shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
                        <h2 className="text-[#333] text-[1.3em] mb-5 pb-[10px] border-b-2 border-[#667eea]">
                            📈 統計情報
                        </h2>
                        <div className="flex justify-between py-3 border-b border-[#e5e7eb]">
                            <span className="text-[#666] font-medium">平均エラー値</span>
                            <span className="text-[#333] font-bold">
                                {dataCount > 0 ? (stats.errorSum / dataCount).toFixed(2) : '-'}
                            </span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-[#e5e7eb]">
                            <span className="text-[#666] font-medium">最大左モーター速度</span>
                            <span className="text-[#333] font-bold">{stats.maxLeft}</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-[#e5e7eb]">
                            <span className="text-[#666] font-medium">最大右モーター速度</span>
                            <span className="text-[#333] font-bold">{stats.maxRight}</span>
                        </div>
                        <div className="flex justify-between py-3">
                            <span className="text-[#666] font-medium">稼働時間</span>
                            <span className="text-[#333] font-bold">{uptime}秒</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
