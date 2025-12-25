'use client';

interface MotorBarProps {
    label: string;
    speed: number;
    maxSpeed?: number;
}

export default function MotorBar({ label, speed, maxSpeed = 65535 }: MotorBarProps) {
    const percentage = (speed / maxSpeed) * 100;

    return (
        <div className="flex-1">
            <div className="text-sm text-gray-600 mb-2">{label}</div>
            <div className="h-8 bg-gray-100 rounded-lg overflow-hidden relative">
                <div
                    className="h-full bg-gradient-to-r from-purple-500 to-purple-700 transition-all duration-300 flex items-center justify-center text-white font-bold text-sm"
                    style={{ width: `${percentage}%` }}
                >
                    {speed}
                </div>
            </div>
        </div>
    );
}
