'use client';

import { useSensorStore } from '@/lib/store';
import { useEffect, useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

interface ChartDataPoint {
    time: string;
    leftMotor: number;
    rightMotor: number;
    leftSensor: number;
    centerSensor: number;
    rightSensor: number;
}

export default function RealtimeChart() {
    const currentData = useSensorStore((state) => state.currentData);
    const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
    const [maxDataPoints, setMaxDataPoints] = useState(30);
    const [chartType, setChartType] = useState<'motor' | 'sensor'>('motor');

    useEffect(() => {
        if (!currentData) return;

        const newDataPoint: ChartDataPoint = {
            time: new Date(currentData.timestamp).toLocaleTimeString('ja-JP', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            }),
            leftMotor: currentData.motors.left.speed,
            rightMotor: currentData.motors.right.speed,
            leftSensor: currentData.sensors.left,
            centerSensor: currentData.sensors.center,
            rightSensor: currentData.sensors.right,
        };

        setChartData((prev) => {
            const updated = [...prev, newDataPoint];
            // 最大データポイント数を超えたら古いものから削除
            if (updated.length > maxDataPoints) {
                return updated.slice(updated.length - maxDataPoints);
            }
            return updated;
        });
    }, [currentData, maxDataPoints]);

    const clearChart = () => {
        setChartData([]);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">リアルタイムチャート</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {chartData.length} / {maxDataPoints} データポイント
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        {/* チャートタイプ切り替え */}
                        <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setChartType('motor')}
                                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                                    chartType === 'motor'
                                        ? 'bg-white text-blue-600 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-800'
                                }`}
                            >
                                モーター
                            </button>
                            <button
                                onClick={() => setChartType('sensor')}
                                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                                    chartType === 'sensor'
                                        ? 'bg-white text-blue-600 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-800'
                                }`}
                            >
                                センサー
                            </button>
                        </div>

                        {/* データポイント数調整 */}
                        <select
                            value={maxDataPoints}
                            onChange={(e) => setMaxDataPoints(Number(e.target.value))}
                            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value={20}>20点</option>
                            <option value={30}>30点</option>
                            <option value={50}>50点</option>
                            <option value={100}>100点</option>
                        </select>

                        {/* クリアボタン */}
                        <button
                            onClick={clearChart}
                            disabled={chartData.length === 0}
                            className="px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                            クリア
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-6">
                {chartData.length === 0 ? (
                    <div className="h-80 flex items-center justify-center text-gray-400">
                        データがありません
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height={320}>
                        {chartType === 'motor' ? (
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis
                                    dataKey="time"
                                    stroke="#6b7280"
                                    style={{ fontSize: '12px' }}
                                />
                                <YAxis
                                    stroke="#6b7280"
                                    style={{ fontSize: '12px' }}
                                    domain={[0, 255]}
                                    label={{
                                        value: 'PWM値',
                                        angle: -90,
                                        position: 'insideLeft',
                                        style: { fontSize: '12px' },
                                    }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        fontSize: '12px',
                                    }}
                                />
                                <Legend
                                    wrapperStyle={{ fontSize: '12px' }}
                                    iconType="line"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="leftMotor"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    dot={false}
                                    name="左モーター"
                                    isAnimationActive={false}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="rightMotor"
                                    stroke="#ef4444"
                                    strokeWidth={2}
                                    dot={false}
                                    name="右モーター"
                                    isAnimationActive={false}
                                />
                            </LineChart>
                        ) : (
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis
                                    dataKey="time"
                                    stroke="#6b7280"
                                    style={{ fontSize: '12px' }}
                                />
                                <YAxis
                                    stroke="#6b7280"
                                    style={{ fontSize: '12px' }}
                                    domain={[0, 1023]}
                                    label={{
                                        value: 'センサー値',
                                        angle: -90,
                                        position: 'insideLeft',
                                        style: { fontSize: '12px' },
                                    }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        fontSize: '12px',
                                    }}
                                />
                                <Legend
                                    wrapperStyle={{ fontSize: '12px' }}
                                    iconType="line"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="leftSensor"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    dot={false}
                                    name="左センサー"
                                    isAnimationActive={false}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="centerSensor"
                                    stroke="#10b981"
                                    strokeWidth={2}
                                    dot={false}
                                    name="中央センサー"
                                    isAnimationActive={false}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="rightSensor"
                                    stroke="#ef4444"
                                    strokeWidth={2}
                                    dot={false}
                                    name="右センサー"
                                    isAnimationActive={false}
                                />
                            </LineChart>
                        )}
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}
