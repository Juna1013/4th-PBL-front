'use client';

import { useSensorStore } from '@/lib/store';

export default function Header() {
    const connectionStatus = useSensorStore((state) => state.connectionStatus);

    return (
        <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">ライントレースカー</h1>
                            <p className="text-sm text-blue-100">デジタルツイン システム</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <div
                                className={`w-3 h-3 rounded-full ${connectionStatus.connected
                                        ? 'bg-green-400 animate-pulse'
                                        : 'bg-red-400'
                                    }`}
                            />
                            <span className="text-sm font-medium">
                                {connectionStatus.connected ? '接続中' : '切断'}
                            </span>
                        </div>
                        {connectionStatus.connected && (
                            <div className="text-xs text-blue-100">
                                最終更新:{' '}
                                {new Date(connectionStatus.lastUpdate).toLocaleTimeString('ja-JP')}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
