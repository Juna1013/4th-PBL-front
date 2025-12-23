'use client';

import { useSensorStore } from '@/lib/store';

export default function Header() {
    const connectionStatus = useSensorStore((state) => state.connectionStatus);

    return (
        <header className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white shadow-2xl">
            <div className="container mx-auto px-4 sm:px-6 py-6 max-w-7xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm ring-1 ring-white/20 transition-transform hover:scale-110 duration-300">
                            <svg
                                className="w-7 h-7"
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
                            <h1 className="text-3xl font-extrabold relative inline-block">
                                ライントレースカー
                                <span className="absolute -bottom-1 left-0 w-20 h-1 bg-indigo-400 rounded-full"></span>
                            </h1>
                            <p className="text-sm text-indigo-200 mt-1">デジタルツイン システム v1.0</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full ring-1 ring-white/20">
                            <div
                                className={`w-3 h-3 rounded-full ${connectionStatus.connected
                                        ? 'bg-green-400 animate-pulse shadow-lg shadow-green-400/50'
                                        : 'bg-red-400 shadow-lg shadow-red-400/50'
                                    }`}
                            />
                            <span className="text-sm font-bold">
                                {connectionStatus.connected ? '接続中' : '切断'}
                            </span>
                        </div>
                        {connectionStatus.connected && (
                            <div className="hidden md:block text-xs text-indigo-200 backdrop-blur-sm bg-white/5 px-3 py-1.5 rounded-full">
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
