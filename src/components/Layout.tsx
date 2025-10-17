import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Car, Volume2 } from 'lucide-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-white/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
                <ArrowLeft size={20} />
                <span>戻る</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Volume2 size={24} className="text-blue-600" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">ライントレースカー</h1>
                  <p className="text-sm text-gray-600">制御システム</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Car size={20} className="text-gray-600" />
              <span className="text-gray-700 font-medium">ライントレースカー</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-slate-800 text-white py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-slate-300 text-sm md:text-base">
              © 2025 ライントレースカー制御システム - FastAPI & Next.js で構築
            </p>
            <div className="mt-3 md:mt-4 flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-slate-400">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                TailwindCSS
              </span>
              <span>React Query</span>
              <span>TypeScript</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
