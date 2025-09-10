'use client';

import ChatInterface from '@/components/ChatInterface';
import CommandStatus from '@/components/CommandStatus';
import LogViewer from '@/components/LogViewer';
import SystemStatus from '@/components/SystemStatus';
import ManualControl from '@/components/ManualControl';
import { CommandType } from '@/types';
import { useState } from 'react';

export default function DashboardPage() {
  const [lastCommandSent, setLastCommandSent] = useState<CommandType | null>(null);

  const handleCommandSent = (command: CommandType) => {
    setLastCommandSent(command);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* ヘッダー */}
      <header className="bg-slate-800/80 backdrop-blur-sm border-b border-slate-700/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🛸</div>
              <h1 className="text-xl font-bold text-white">
                AI制御システム - ダッシュボード
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-slate-400">
                v1.0.0
              </div>
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg" title="システム稼働中"></div>
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
