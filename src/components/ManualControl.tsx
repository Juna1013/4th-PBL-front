'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { CommandType, VALID_COMMANDS } from '@/types';
import { getCommandDescription } from '@/lib/gemini';

interface ManualControlProps {
  onCommandSent?: (command: CommandType) => void;
}

export default function ManualControl({ onCommandSent }: ManualControlProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [lastCommand, setLastCommand] = useState<CommandType | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sendCommand = async (command: CommandType) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          command, 
          source: 'chat' 
        })
      });

      if (response.ok) {
        setLastCommand(command);
        onCommandSent?.(command);
      }
    } catch (error) {
      console.error('Failed to send command:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonStyle = (command: CommandType) => {
    const baseStyle = "p-4 rounded-xl font-semibold text-gray-900 dark:text-white transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none shadow-lg hover:shadow-xl backdrop-blur-sm";
    
    const colors = {
      'STOP': 'bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-800/40 border border-red-300 dark:border-red-700',
      'GO': 'bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-800/40 border border-green-300 dark:border-green-700',
      'FORWARD': 'bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-800/40 border border-blue-300 dark:border-blue-700',
      'LEFT': 'bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 dark:hover:bg-purple-800/40 border border-purple-300 dark:border-purple-700',
      'RIGHT': 'bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 dark:hover:bg-purple-800/40 border border-purple-300 dark:border-purple-700'
    };

    return `${baseStyle} ${colors[command]}`;
  };

  const getCommandIcon = (command: CommandType) => {
    const icons = {
      'STOP': '⏹️',
      'GO': '▶️',
      'FORWARD': '⬆️',
      'LEFT': '⬅️',
      'RIGHT': '➡️'
    };
    return icons[command];
  };

  return (
    <div className="bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl p-6">
      <div 
        className="flex items-center justify-between mb-4 cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          🎆 手動制御
        </h2>
        <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
          {isCollapsed ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronUp className="w-5 h-5" />
          )}
        </button>
      </div>

      {!isCollapsed && (
        <>
          {/* 最後のコマンド表示 */}
          {lastCommand && (
            <div className="mb-4 p-3 bg-green-50/50 dark:bg-green-800/30 border border-green-200 dark:border-green-700 rounded-lg backdrop-blur-sm">
              <div className="text-sm text-green-700 dark:text-green-300">
                ✅ コマンド送信完了: {lastCommand}
              </div>
            </div>
          )}

      {/* コマンドボタン */}
      <div className="grid grid-cols-2 gap-4">
        {VALID_COMMANDS.map((command) => (
          <button
            key={command}
            onClick={() => sendCommand(command)}
            disabled={isLoading}
            className={getButtonStyle(command)}
          >
            <div className="text-center">
              <div className="text-2xl mb-1">
                {getCommandIcon(command)}
              </div>
              <div className="text-sm font-bold">
                {command}
              </div>
              <div className="text-xs opacity-90">
                {getCommandDescription(command)}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* 方向キー風のレイアウトバージョン */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">方向キー制御</h3>
        <div className="grid grid-cols-3 gap-2 max-w-48 mx-auto">
          {/* 上段 */}
          <div></div>
          <button
            onClick={() => sendCommand('FORWARD')}
            disabled={isLoading}
            className="bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-800/40 border border-blue-300 dark:border-blue-700 text-gray-900 dark:text-white p-3 rounded-xl font-semibold shadow-lg transition-all hover:shadow-xl transform hover:scale-105"
          >
            ⬆️
          </button>
          <div></div>

          {/* 中段 */}
          <button
            onClick={() => sendCommand('LEFT')}
            disabled={isLoading}
            className="bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 dark:hover:bg-purple-800/40 border border-purple-300 dark:border-purple-700 text-gray-900 dark:text-white p-3 rounded-xl font-semibold shadow-lg transition-all hover:shadow-xl transform hover:scale-105"
          >
            ⬅️
          </button>
          <button
            onClick={() => sendCommand('STOP')}
            disabled={isLoading}
            className="bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-800/40 border border-red-300 dark:border-red-700 text-gray-900 dark:text-white p-3 rounded-xl font-semibold shadow-lg transition-all hover:shadow-xl transform hover:scale-105"
          >
            ⏹️
          </button>
          <button
            onClick={() => sendCommand('RIGHT')}
            disabled={isLoading}
            className="bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/30 dark:hover:bg-purple-800/40 border border-purple-300 dark:border-purple-700 text-gray-900 dark:text-white p-3 rounded-xl font-semibold shadow-lg transition-all hover:shadow-xl transform hover:scale-105"
          >
            ➡️
          </button>

          {/* 下段 */}
          <div></div>
          <button
            onClick={() => sendCommand('GO')}
            disabled={isLoading}
            className="bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-800/40 border border-green-300 dark:border-green-700 text-gray-900 dark:text-white p-3 rounded-xl font-semibold shadow-lg transition-all hover:shadow-xl transform hover:scale-105"
          >
            ▶️
          </button>
          <div></div>
        </div>
      </div>
        </>
      )}
    </div>
  );
}
