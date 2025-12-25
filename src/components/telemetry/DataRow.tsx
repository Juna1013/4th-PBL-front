'use client';

interface DataRowProps {
    label: string;
    value: string | number;
}

export default function DataRow({ label, value }: DataRowProps) {
    return (
        <div className="flex justify-between py-3 border-b border-gray-200 last:border-b-0">
            <span className="text-gray-600 font-medium">{label}</span>
            <span className="text-gray-900 font-bold">{value}</span>
        </div>
    );
}
