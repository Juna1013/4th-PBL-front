'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { extractCommandFromText, getCommandDescription } from '@/lib/gemini';
import { CommandType } from '@/types';

interface ChatInterfaceProps {
  onCommandSent?: (command: CommandType) => void;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  command?: CommandType;
  timestamp: Date;
}

export default function ChatInterface({ onCommandSent }: ChatInterfaceProps) {
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // チャット履歴の最後までスクロール
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (!message.trim() || isProcessing) return;

    const userMessage = message.trim();
    const messageId = Date.now().toString();

    // ユーザーメッセージを履歴に追加
    setChatHistory(prev => [...prev, {
      id: messageId,
      type: 'user',
      content: userMessage,
      timestamp: new Date()
    }]);

    setMessage('');
    setIsProcessing(true);
    setError(null);

    try {
      console.log('Processing message:', userMessage);

      // Gemini APIでコマンド抽出
      const command = await extractCommandFromText(userMessage);
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

      // ボットの応答を履歴に追加
      setChatHistory(prev => [...prev, {
        id: messageId + '_bot',
        type: 'bot',
        content: `コマンド「${command}」を送信しました。${getCommandDescription(command)}`,
        command,
        timestamp: new Date()
      }]);

      onCommandSent?.(command);

    } catch (error) {
      console.error('Command processing failed:', error);
      
      // エラーメッセージを履歴に追加
      setChatHistory(prev => [...prev, {
        id: messageId + '_error',
        type: 'bot',
        content: 'コマンドの処理に失敗しました。もう一度お試しください。',
        timestamp: new Date()
      }]);
      
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
    <div className="bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl p-6">
      <div 
        className="flex items-center justify-between mb-4 cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          💬 AIチャット制御
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
          {/* チャット履歴表示 */}
          <div 
            ref={chatContainerRef}
            className="mb-4 max-h-96 overflow-y-auto space-y-3 p-4 bg-gray-50/80 dark:bg-gray-950/30 border border-gray-200 dark:border-gray-800 rounded-lg backdrop-blur-sm"
          >
        {chatHistory.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-500 py-8">
            <div className="text-2xl mb-2">💬</div>
            <div>チャットを開始してください</div>
            <div className="text-sm mt-1">ロボットへの指示を入力すると会話が始まります</div>
          </div>
        ) : (
          chatHistory.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.type === 'user'
                    ? 'bg-blue-500 dark:bg-gray-700 text-white border border-blue-400 dark:border-gray-600'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 border border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="text-sm">{msg.content}</div>
                {msg.command && (
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    コマンド: {msg.command}
                  </div>
                )}
                <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {msg.timestamp.toLocaleTimeString('ja-JP')}
                </div>
              </div>
            </div>
          ))
        )}
        
        {/* 処理中インジケーター */}
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">処理中...</span>
            </div>
          </div>
        )}
      </div>

          {/* チャット入力エリア */}
      <div className="space-y-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="ロボットへの指示を入力してください&#10;例: 「右に曲がって前進して」「停止して」「左に回転」"
          className="w-full p-3 bg-white dark:bg-gray-950/50 border border-gray-300 dark:border-gray-700 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-gray-500 focus:border-blue-500 dark:focus:border-gray-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 backdrop-blur-sm"
          rows={3}
          disabled={isProcessing}
        />

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600 dark:text-gray-500">
            Enter で送信 • Shift + Enter で改行
          </div>
          
          <button
            onClick={handleSendMessage}
            disabled={!message.trim() || isProcessing}
            className="flex items-center space-x-2 bg-blue-500 dark:bg-gray-700 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 dark:hover:bg-gray-600 transition-all duration-300 shadow-lg border border-blue-400 dark:border-gray-600"
          >
            <Send className="w-4 h-4" />
            <span>送信</span>
          </button>
        </div>
      </div>

          {/* 使用例 */}
          <div className="mt-6 p-4 bg-gray-50/80 dark:bg-gray-950/30 border border-gray-200 dark:border-gray-800 rounded-lg backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-400 mb-2">
              💡 コマンド例
            </h3>
            <div className="text-sm text-gray-600 dark:text-gray-500 space-y-1">
              <div>• 「右に曲がって」→ RIGHT</div>
              <div>• 「前に進んで」→ FORWARD</div>
              <div>• 「止まって」→ STOP</div>
              <div>• 「開始して」→ GO</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
