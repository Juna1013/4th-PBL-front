'use client';

import { useSensorStore } from '@/lib/store';

export default function SensorDisplay() {
    const currentData = useSensorStore((state) => state.currentData);

    if (!currentData) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4">センサー値</h2>
                <div className="text-center text-gray-400 py-8">
                    データを待機中...
                </div>
            </div>
        );
    }

    const { sensors } = currentData;
    const maxValue = 1023;

    const getSensorColor = (value: number) => {
        const percentage = (value / maxValue) * 100;
        if (percentage > 70) return 'bg-green-500';
        if (percentage > 40) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const SensorBar = ({ label, value }: { label: string; value: number }) => {
        const percentage = (value / maxValue) * 100;
        return (
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">{label}</span>
                    <span className="text-sm font-bold text-gray-900">{value}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                        className={`h-full ${getSensorColor(value)} transition-all duration-300 rounded-full`}
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">センサー値</h2>
                <div
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${sensors.lineDetected
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                >
                    {sensors.lineDetected ? 'ライン検出' : 'ライン未検出'}
                </div>
            </div>

            <div className="space-y-4">
                <SensorBar label="左センサー" value={sensors.left} />
                <SensorBar label="中央センサー" value={sensors.center} />
                <SensorBar label="右センサー" value={sensors.right} />
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <div className="text-2xl font-bold text-gray-800">{sensors.left}</div>
                        <div className="text-xs text-gray-500">LEFT</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-800">{sensors.center}</div>
                        <div className="text-xs text-gray-500">CENTER</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-gray-800">{sensors.right}</div>
                        <div className="text-xs text-gray-500">RIGHT</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
