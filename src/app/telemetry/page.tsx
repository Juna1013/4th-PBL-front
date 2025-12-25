'use client';

import { useTelemetry } from '@/hooks/useTelemetry';
import { useEffect, useState } from 'react';
import Card from '@/components/telemetry/Card';
import SensorGrid from '@/components/telemetry/SensorGrid';
import MotorBar from '@/components/telemetry/MotorBar';
import DataRow from '@/components/telemetry/DataRow';

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
        <div className="min-h-screen bg-gradient-to-br from-purple-500 via-purple-600 to-purple-800 p-5">
            <div className="max-w-7xl mx-auto">
                {/* ヘッダー */}
                <header className="bg-white/95 rounded-2xl p-6 shadow-lg mb-5 backdrop-blur-sm">
                    <h1 className="text-3xl font-bold text-gray-800 mb-3">
                        🚗 ライントレーサー テレメトリダッシュボード
                    </h1>
                    <div className="flex gap-5 flex-wrap items-center text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                            <span>サーバー稼働中</span>
                        </div>
                        <div>
                            📡 最終更新: <strong>{new Date().toLocaleTimeString('ja-JP')}</strong>
                        </div>
                        <div>
                            📊 受信データ数: <strong>{dataCount}</strong>
                        </div>
                    </div>
                    {error && (
                        <div className="mt-3 p-3 bg-yellow-100 text-yellow-800 rounded-lg">
                            {error}
                        </div>
                    )}
                </header>

                {/* メイングリッド */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* センサー表示 */}
                    <Card title="ラインセンサー (8ch)" icon="📍">
                        <SensorGrid sensors={sensors} />
                        <div className="mt-4">
                            <DataRow label="黒線検出数" value={blackCount} />
                            <DataRow label="センサーパターン" value={sensorBinary} />
                        </div>
                    </Card>

                    {/* モーター表示 */}
                    <Card title="モーター速度" icon="⚙️">
                        <div className="flex gap-5 mb-5">
                            <MotorBar
                                label="左モーター"
                                speed={data?.motor?.left_speed || 0}
                            />
                            <MotorBar
                                label="右モーター"
                                speed={data?.motor?.right_speed || 0}
                            />
                        </div>
                        <div>
                            <DataRow
                                label="エラー値"
                                value={data?.control?.error?.toFixed(2) || '-'}
                            />
                            <DataRow label="ターン値" value={data?.control?.turn || '-'} />
                            <DataRow
                                label="ベース速度"
                                value={data?.control?.base_speed || '-'}
                            />
                        </div>
                    </Card>

                    {/* WiFi情報 */}
                    <Card title="WiFi情報" icon="📶">
                        <DataRow label="IPアドレス" value={data?.wifi?.ip || '-'} />
                        <DataRow
                            label="信号強度 (RSSI)"
                            value={data?.wifi?.rssi ? `${data.wifi.rssi} dBm` : '-'}
                        />
                        <DataRow label="タイムスタンプ" value={data?.timestamp || '-'} />
                    </Card>

                    {/* 統計情報 */}
                    <Card title="統計情報" icon="📈">
                        <DataRow
                            label="平均エラー値"
                            value={dataCount > 0 ? (stats.errorSum / dataCount).toFixed(2) : '-'}
                        />
                        <DataRow label="最大左モーター速度" value={stats.maxLeft} />
                        <DataRow label="最大右モーター速度" value={stats.maxRight} />
                        <DataRow label="稼働時間" value={`${uptime}秒`} />
                    </Card>
                </div>
            </div>
        </div>
    );
}
