'use client';

import ChatInterface from '@/components/ChatInterface';
import CommandStatus from '@/components/CommandStatus';
import LogViewer from '@/components/LogViewer';
import SystemStatus from '@/components/SystemStatus';
import ManualControl from '@/components/ManualControl';
import ThemeToggle from '@/components/ThemeToggle';
import { CommandType } from '@/types';
import { useState } from 'react';

export default function DashboardPage() {
  const [lastCommandSent, setLastCommandSent] = useState<CommandType | null>(null);

  const handleCommandSent = (command: CommandType) => {
    setLastCommandSent(command);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors">
      {/* ヘッダー */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="text-2xl grayscale">🛸</div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                AI制御システム - ダッシュボード
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <div className="text-sm text-gray-600 dark:text-gray-500">
                v1.0.0
              </div>
              <div className="w-3 h-3 bg-green-400 dark:bg-gray-400 rounded-full animate-pulse shadow-lg" title="システム稼働中"></div>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 上段: システム状態 */}
        <div className="mb-8">
          <SystemStatus />
        </div>

        {/* 中段: メイン制御パネル */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          {/* 左側: チャット制御 */}
          <div className="xl:col-span-1">
            <ChatInterface onCommandSent={handleCommandSent} />
          </div>

          {/* 中央: 手動制御 */}
          <div className="xl:col-span-1">
            <ManualControl onCommandSent={handleCommandSent} />
          </div>

          {/* 右側: 現在のコマンド */}
          <div className="xl:col-span-1">
            <CommandStatus />
          </div>
        </div>

        {/* 下段: ログビューア */}
        <div>
          <LogViewer />
        </div>
      </main>
    </div>
  );
}
