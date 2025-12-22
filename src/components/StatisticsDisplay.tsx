'use client';

import { useSensorStore } from '@/lib/store';

export default function StatisticsDisplay() {
    const statistics = useSensorStore((state) => state.statistics);
    const currentData = useSensorStore((state) => state.currentData);

    const formatTime = (ms: number) => {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);

        if (hours > 0) {
            return `${hours}:${(minutes % 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
        }
        return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
    };

    const StatCard = ({
        icon,
        label,
        value,
        unit,
        color,
    }: {
        icon: React.ReactNode;
        label: string;
        value: string | number;
        unit?: string;
        color: string;
    }) => (
        <div className={`${color} rounded-lg p-4 text-white`}>
            <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    {icon}
                </div>
            </div>
            <div className="text-2xl font-bold">
                {value}
                {unit && <span className="text-sm ml-1 opacity-80">{unit}</span>}
            </div>
            <div className="text-sm opacity-90 mt-1">{label}</div>
        </div>
    );

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-6">統計情報</h2>

            <div className="grid grid-cols-2 gap-4">
                <StatCard
                    icon={
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                clipRule="evenodd"
                            />
                        </svg>
                    }
                    label="走行時間"
                    value={formatTime(statistics.runningTime)}
                    color="bg-gradient-to-br from-blue-500 to-blue-600"
                />

                <StatCard
                    icon={
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                        </svg>
                    }
                    label="平均速度"
                    value={statistics.averageSpeed.toFixed(1)}
                    unit="PWM"
                    color="bg-gradient-to-br from-green-500 to-green-600"
                />

                <StatCard
                    icon={
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path
                                fillRule="evenodd"
                                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                            />
                        </svg>
                    }
                    label="センサー反応"
                    value={statistics.sensorReactions}
                    unit="回"
                    color="bg-gradient-to-br from-purple-500 to-purple-600"
                />

                <StatCard
                    icon={
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                    }
                    label="エラー回数"
                    value={statistics.errorCount}
                    unit="回"
                    color="bg-gradient-to-br from-red-500 to-red-600"
                />
            </div>

            {currentData?.battery !== undefined && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">バッテリー残量</span>
                        <span className="text-sm font-bold text-gray-900">
                            {currentData.battery.toFixed(0)}%
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                            className={`h-full transition-all duration-300 rounded-full ${currentData.battery > 50
                                    ? 'bg-green-500'
                                    : currentData.battery > 20
                                        ? 'bg-yellow-500'
                                        : 'bg-red-500'
                                }`}
                            style={{ width: `${currentData.battery}%` }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
