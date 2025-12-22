'use client';

import { useSensorStore } from '@/lib/store';
import { useEffect, useRef, useState } from 'react';

export default function DataLog() {
    const logs = useSensorStore((state) => state.logs);
    const clearLogs = useSensorStore((state) => state.clearLogs);
    const logContainerRef = useRef<HTMLDivElement>(null);
    const [autoScroll, setAutoScroll] = useState(true);

    useEffect(() => {
        if (autoScroll && logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [logs, autoScroll]);

    const getEventTypeColor = (eventType: string) => {
        switch (eventType) {
            case 'error':
                return 'bg-red-50 border-red-200 text-red-700';
            case 'warning':
                return 'bg-yellow-50 border-yellow-200 text-yellow-700';
            default:
                return 'bg-gray-50 border-gray-200 text-gray-700';
        }
    };

    const getEventTypeIcon = (eventType: string) => {
        switch (eventType) {
            case 'error':
                return (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                        />
                    </svg>
                );
            case 'warning':
                return (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                );
            default:
                return (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                        />
                    </svg>
                );
        }
    };

    const exportLogs = () => {
        const dataStr = JSON.stringify(logs, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const exportFileDefaultName = `sensor-logs-${Date.now()}.json`;

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">データログ</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {logs.length} / 1000 エントリ
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <label className="flex items-center space-x-2 text-sm text-gray-600">
                            <input
                                type="checkbox"
                                checked={autoScroll}
                                onChange={(e) => setAutoScroll(e.target.checked)}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span>自動スクロール</span>
                        </label>
                        <button
                            onClick={exportLogs}
                            disabled={logs.length === 0}
                            className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                            エクスポート
                        </button>
                        <button
                            onClick={clearLogs}
                            disabled={logs.length === 0}
                            className="px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                            クリア
                        </button>
                    </div>
                </div>
            </div>

            <div
                ref={logContainerRef}
                className="h-96 overflow-y-auto p-4 space-y-2 bg-gray-50"
            >
                {logs.length === 0 ? (
                    <div className="text-center text-gray-400 py-12">
                        ログエントリがありません
                    </div>
                ) : (
                    logs.map((log) => (
                        <div
                            key={log.id}
                            className={`p-3 rounded-lg border text-xs font-mono ${getEventTypeColor(
                                log.eventType
                            )}`}
                        >
                            <div className="flex items-start space-x-2">
                                <div className="mt-0.5">{getEventTypeIcon(log.eventType)}</div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold">
                                            {new Date(log.timestamp).toLocaleTimeString('ja-JP', {
                                                hour12: false,
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                second: '2-digit',
                                                fractionalSecondDigits: 3,
                                            })}
                                        </span>
                                        <span className="text-xs opacity-75 uppercase">
                                            {log.eventType}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div>
                                            センサー: L={log.data.sensors.left} C=
                                            {log.data.sensors.center} R={log.data.sensors.right}
                                        </div>
                                        <div>
                                            モーター: L={log.data.motors.left.speed} R=
                                            {log.data.motors.right.speed}
                                        </div>
                                    </div>
                                    {log.message && (
                                        <div className="text-xs opacity-90">{log.message}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
