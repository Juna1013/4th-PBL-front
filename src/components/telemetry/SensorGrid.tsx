'use client';

interface SensorGridProps {
    sensors: number[];
}

export default function SensorGrid({ sensors }: SensorGridProps) {
    return (
        <div className="grid grid-cols-8 gap-2">
            {sensors.map((value, index) => (
                <div
                    key={index}
                    className={`
            aspect-square rounded-lg flex items-center justify-center
            font-bold text-sm transition-all duration-300
            ${value === 0
                            ? 'bg-gray-800 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-400'
                        }
          `}
                >
                    {index}
                </div>
            ))}
        </div>
    );
}
