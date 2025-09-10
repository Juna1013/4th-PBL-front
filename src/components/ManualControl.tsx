'use client';

import { useState } from 'react';
import { CommandType, VALID_COMMANDS } from '@/types';
import { getCommandDescription } from '@/lib/gemini';

interface ManualControlProps {
  onCommandSent?: (command: CommandType) => void;
}

export default function ManualControl({ onCommandSent }: ManualControlProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [lastCommand, setLastCommand] = useState<CommandType | null>(null);

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
    const baseStyle = "p-4 rounded-xl font-semibold text-white transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none shadow-lg hover:shadow-xl backdrop-blur-sm";
    
    const colors = {
      'STOP': 'bg-gradient-to-br from-red-600 to-red-700 hover:from-red-700 hover:to-red-800',
      'GO': 'bg-gradient-to-br from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800',
      'FORWARD': 'bg-gradient-to-br from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800',
      'LEFT': 'bg-gradient-to-br from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700',
      'RIGHT': 'bg-gradient-to-br from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800'
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
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">
        🎆 手動制御
      </h2>

      {/* 最後のコマンド表示 */}
      {lastCommand && (
        <div className="mb-4 p-3 bg-emerald-900/30 border border-emerald-700/50 rounded-lg backdrop-blur-sm">
          <div className="text-sm text-emerald-400">
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
        <h3 className="text-lg font-semibold mb-4 text-white">方向キー制御</h3>
        <div className="grid grid-cols-3 gap-2 max-w-48 mx-auto">
          {/* 上段 */}
          <div></div>
          <button
            onClick={() => sendCommand('FORWARD')}
            disabled={isLoading}
            className="bg-gradient-to-br from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white p-3 rounded-xl font-semibold shadow-lg transition-all hover:shadow-xl transform hover:scale-105"
          >
            ⬆️
          </button>
          <div></div>

          {/* 中段 */}
          <button
            onClick={() => sendCommand('LEFT')}
            disabled={isLoading}
            className="bg-gradient-to-br from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white p-3 rounded-xl font-semibold shadow-lg transition-all hover:shadow-xl transform hover:scale-105"
          >
            ⬅️
          </button>
          <button
            onClick={() => sendCommand('STOP')}
            disabled={isLoading}
            className="bg-gradient-to-br from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white p-3 rounded-xl font-semibold shadow-lg transition-all hover:shadow-xl transform hover:scale-105"
          >
            ⏹️
          </button>
          <button
            onClick={() => sendCommand('RIGHT')}
            disabled={isLoading}
            className="bg-gradient-to-br from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800 text-white p-3 rounded-xl font-semibold shadow-lg transition-all hover:shadow-xl transform hover:scale-105"
          >
            ➡️
          </button>

          {/* 下段 */}
          <div></div>
          <button
            onClick={() => sendCommand('GO')}
            disabled={isLoading}
            className="bg-gradient-to-br from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white p-3 rounded-xl font-semibold shadow-lg transition-all hover:shadow-xl transform hover:scale-105"
          >
            ▶️
          </button>
          <div></div>
        </div>
      </div>
    </div>
  );
}
