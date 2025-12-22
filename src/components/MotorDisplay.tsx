'use client';

import { useSensorStore } from '@/lib/store';

export default function MotorDisplay() {
    const currentData = useSensorStore((state) => state.currentData);

    if (!currentData) {
        return (
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4">モーター出力</h2>
                <div className="text-center text-gray-400 py-8">
                    データを待機中...
                </div>
            </div>
        );
    }

    const { motors } = currentData;
    const maxSpeed = 255;

    const getDirectionIcon = (direction: string) => {
        if (direction === 'forward') {
            return (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            );
        } else if (direction === 'backward') {
            return (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                        clipRule="evenodd"
                    />
                </svg>
            );
        }
        return (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
                    clipRule="evenodd"
                />
            </svg>
        );
    };

    const getDirectionColor = (direction: string) => {
        if (direction === 'forward') return 'text-green-600';
        if (direction === 'backward') return 'text-orange-600';
        return 'text-gray-600';
    };

    const MotorBar = ({
        label,
        speed,
        direction,
    }: {
        label: string;
        speed: number;
        direction: string;
    }) => {
        const percentage = (speed / maxSpeed) * 100;
        return (
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-700">{label}</span>
                        <span className={getDirectionColor(direction)}>
                            {getDirectionIcon(direction)}
                        </span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{speed} PWM</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 rounded-full"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
                <div className="text-xs text-gray-500 capitalize">{direction}</div>
            </div>
        );
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-6">モーター出力</h2>

            <div className="space-y-6">
                <MotorBar
                    label="左モーター"
                    speed={motors.left.speed}
                    direction={motors.left.direction}
                />
                <MotorBar
                    label="右モーター"
                    speed={motors.right.speed}
                    direction={motors.right.direction}
                />
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                            {motors.left.speed}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">左モーター PWM</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                            {motors.right.speed}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">右モーター PWM</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
