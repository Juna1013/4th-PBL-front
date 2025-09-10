'use client';

import { useState, useEffect } from 'react';
import { Activity, Wifi, WifiOff } from 'lucide-react';
import { Command, CommandType } from '@/types';
import { getCommandDescription } from '@/lib/gemini';

export default function CommandStatus() {
  const [currentCommand, setCurrentCommand] = useState<Command | null>(null);
  const [isConnected, setIsConnected] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // コマンド状態を定期的に取得
  useEffect(() => {
    const fetchCommandStatus = async () => {
      try {
        const response = await fetch('/api/command');
        if (response.ok) {
          const result = await response.json();
          setCurrentCommand(result.data);
          setIsConnected(true);
          setLastUpdate(new Date());
        } else {
          setIsConnected(false);
        }
      } catch (error) {
        console.error('Failed to fetch command status:', error);
        setIsConnected(false);
      }
    };

    // 初回実行
    fetchCommandStatus();

    // 1秒ごとに更新
    const interval = setInterval(fetchCommandStatus, 1000);

    return () => clearInterval(interval);
  }, []);

  const getCommandColor = (command: CommandType): string => {
    const colors = {
      'STOP': 'bg-gradient-to-br from-red-600 to-red-700',
      'GO': 'bg-gradient-to-br from-emerald-600 to-green-700',
      'FORWARD': 'bg-gradient-to-br from-cyan-600 to-blue-700',
      'LEFT': 'bg-gradient-to-br from-amber-500 to-yellow-600',
      'RIGHT': 'bg-gradient-to-br from-violet-600 to-purple-700'
    };
    return colors[command] || 'bg-gradient-to-br from-slate-600 to-slate-700';
  };

  const getCommandIcon = (command: CommandType): string => {
    const icons = {
      'STOP': '⏹️',
      'GO': '▶️',
      'FORWARD': '⬆️',
      'LEFT': '⬅️',
      'RIGHT': '➡️'
    };
    return icons[command] || '❓';
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">
          📡 アクティブコマンド
        </h2>
        <div className="flex items-center space-x-2">
          {isConnected ? (
            <Wifi className="w-5 h-5 text-emerald-400" />
          ) : (
            <WifiOff className="w-5 h-5 text-red-400" />
          )}
          <span className={`text-sm ${isConnected ? 'text-emerald-400' : 'text-red-400'}`}>
            {isConnected ? '接続中' : '切断'}
          </span>
        </div>
      </div>

      {currentCommand ? (
        <div className="space-y-4">
          {/* メインコマンド表示 */}
          <div className={`${getCommandColor(currentCommand.command as CommandType)} text-white rounded-xl p-4 shadow-lg backdrop-blur-sm`}>
            <div className="flex items-center justify-center space-x-3">
              <span className="text-3xl">
                {getCommandIcon(currentCommand.command as CommandType)}
              </span>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {currentCommand.command}
                </div>
                <div className="text-sm opacity-90">
                  {getCommandDescription(currentCommand.command as CommandType)}
                </div>
              </div>
            </div>
          </div>

          {/* 詳細情報 */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-900/30 border border-slate-700/30 rounded-lg p-3 backdrop-blur-sm">
              <div className="text-slate-400">送信元</div>
              <div className="font-semibold text-white">
                {currentCommand.source === 'voice' ? '🎙️ 音声認識' : '💬 チャット'}
              </div>
            </div>
            <div className="bg-slate-900/30 border border-slate-700/30 rounded-lg p-3 backdrop-blur-sm">
              <div className="text-slate-400">更新時刻</div>
              <div className="font-semibold text-white">
                {new Date(currentCommand.timestamp).toLocaleTimeString('ja-JP')}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-slate-400">
          <Activity className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <div>コマンド情報を読み込み中...</div>
        </div>
      )}

      {/* 最終更新時刻 */}
      <div className="mt-4 pt-4 border-t border-slate-700/50">
        <div className="text-xs text-slate-500 text-center">
          最終更新: {lastUpdate.toLocaleTimeString('ja-JP')}
        </div>
      </div>
    </div>
  );
}
