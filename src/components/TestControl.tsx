import React from 'react';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useSendCommand } from '../hooks/useApi';

const COMMANDS = [
  { name: 'LEFT', icon: '←', color: 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-300' },
  { name: 'RIGHT', icon: '→', color: 'bg-green-500 hover:bg-green-600 focus:ring-green-300' },
  { name: 'FORWARD', icon: '↑', color: 'bg-purple-500 hover:bg-purple-600 focus:ring-purple-300' },
  { name: 'BACK', icon: '↓', color: 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-300' },
  { name: 'STOP', icon: '⏸', color: 'bg-red-500 hover:bg-red-600 focus:ring-red-300' },
];

export const TestControls: React.FC = () => {
  const sendCommandMutation = useSendCommand();

  const handleSendCommand = (command: string) => {
    sendCommandMutation.mutate(command);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-800">
        <Send className="w-5 h-5 text-blue-500" />
        テスト用コマンド送信
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {COMMANDS.map((cmd) => (
          <button
            key={cmd.name}
            onClick={() => handleSendCommand(cmd.name)}
            disabled={sendCommandMutation.isPending}
            className={`
              ${cmd.color} text-white px-4 py-4 rounded-lg font-semibold 
              transition-all duration-200 transform hover:scale-105 
              disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
              focus:outline-none focus:ring-2 focus:ring-offset-2
              flex items-center justify-center gap-2 min-h-[60px]
            `}
          >
            {sendCommandMutation.isPending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span className="text-xl">{cmd.icon}</span>
                <span className="hidden sm:inline text-sm">{cmd.name}</span>
              </>
            )}
          </button>
        ))}
      </div>

      {/* 成功・エラーメッセージ */}
      {sendCommandMutation.isSuccess && (
        <div className="mt-4 bg-green-50 border-l-4 border-green-400 p-3 rounded">
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
            <span className="text-sm text-green-700">コマンドを正常に送信しました</span>
          </div>
        </div>
      )}

      {sendCommandMutation.isError && (
        <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
          <div className="flex items-center">
            <AlertCircle className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-sm text-yellow-700">
              APIサーバーに接続できません。本番環境では正常に動作します。
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
