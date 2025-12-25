'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path ? 'text-amber-400 bg-slate-800' : 'text-slate-400 hover:text-white hover:bg-slate-800/50';
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-xl font-light text-white tracking-tight">
                            Telemetry <span className="font-bold text-amber-400">Hub</span>
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link
                                href="/"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/')}`}
                            >
                                ホーム
                            </Link>
                            <Link
                                href="/dashboard"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/dashboard')}`}
                            >
                                ダッシュボード
                            </Link>
                            <Link
                                href="/features"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/features')}`}
                            >
                                機能
                            </Link>
                            <Link
                                href="/about"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/about')}`}
                            >
                                解説
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
