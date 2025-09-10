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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">

      {/* ダッシュボードヘッダー */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-4xl mb-4">🛸</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              AI制御システム ダッシュボード
            </h1>
            <p className="text-blue-100 text-lg">
              リアルタイムでロボットを制御・監視
            </p>
          </div>
        </div>
      </section>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* システムステータス */}
        <div className="mb-8">
          <SystemStatus />
        </div>

        {/* メイン制御パネル */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1">
            <ChatInterface onCommandSent={handleCommandSent} />
          </div>
          <div className="lg:col-span-1">
            <ManualControl onCommandSent={handleCommandSent} />
          </div>
          <div className="lg:col-span-2 xl:col-span-1">
            <CommandStatus />
          </div>
        </div>

        {/* ログビューアー */}
        <div className="mb-8">
          <LogViewer />
        </div>
      </main>
    </div>
  );
}
