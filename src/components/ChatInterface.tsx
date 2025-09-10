'use client';

import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { extractCommandFromText, getCommandDescription } from '@/lib/gemini';
import { CommandType } from '@/types';

interface ChatInterfaceProps {
  onCommandSent?: (command: CommandType) => void;
}

export default function ChatInterface({ onCommandSent }: ChatInterfaceProps) {
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastCommand, setLastCommand] = useState<CommandType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = async () => {
    if (!message.trim() || isProcessing) return;

    setIsProcessing(true);
    setError(null);

    try {
      console.log('Processing message:', message);

      // Gemini APIでコマンド抽出
      const command = await extractCommandFromText(message);
      console.log('Extracted command:', command);

      // コマンドAPIに送信
      const response = await fetch('/api/command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          command, 
          source: 'chat' 
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send command');
      }

      const result = await response.json();
      console.log('Command sent successfully:', result);

      setLastCommand(command);
      setMessage('');
      onCommandSent?.(command);

    } catch (error) {
      console.error('Command processing failed:', error);
      setError('コマンドの処理に失敗しました。もう一度お試しください。');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">
        💬 AIチャット制御
      </h2>

      {/* 最後に送信したコマンドの表示 */}
      {lastCommand && (
        <div className="mb-4 p-3 bg-emerald-900/30 border border-emerald-700/50 rounded-lg backdrop-blur-sm">
          <div className="text-sm text-emerald-400">
            ✅ コマンド送信完了
          </div>
          <div className="font-semibold text-emerald-300">
            {lastCommand} - {getCommandDescription(lastCommand)}
          </div>
        </div>
      )}

      {/* エラー表示 */}
      {error && (
        <div className="mb-4 p-3 bg-red-900/30 border border-red-700/50 rounded-lg backdrop-blur-sm">
          <div className="text-red-400 text-sm">
            ❌ {error}
          </div>
        </div>
      )}

      {/* チャット入力エリア */}
      <div className="space-y-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="ロボットへの指示を入力してください&#10;例: 「右に曲がって前進して」「停止して」「左に回転」"
          className="w-full p-3 bg-slate-900/50 border border-slate-600/50 rounded-lg resize-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-slate-400 backdrop-blur-sm"
          rows={3}
          disabled={isProcessing}
        />

        <div className="flex justify-between items-center">
          <div className="text-sm text-slate-400">
            Enter で送信 • Shift + Enter で改行
          </div>
          
          <button
            onClick={handleSendMessage}
            disabled={!message.trim() || isProcessing}
            className="flex items-center space-x-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 shadow-lg"
          >
            {isProcessing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span>
              {isProcessing ? '処理中...' : 'コマンド送信'}
            </span>
          </button>
        </div>
      </div>

      {/* 使用例 */}
      <div className="mt-6 p-4 bg-slate-900/30 border border-slate-700/30 rounded-lg backdrop-blur-sm">
        <h3 className="text-sm font-semibold text-slate-300 mb-2">
          💡 コマンド例
        </h3>
        <div className="text-sm text-slate-400 space-y-1">
          <div>• 「右に曲がって」→ RIGHT</div>
          <div>• 「前に進んで」→ FORWARD</div>
          <div>• 「止まって」→ STOP</div>
          <div>• 「開始して」→ GO</div>
        </div>
      </div>
    </div>
  );
}
