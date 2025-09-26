import React from 'react';
import { Activity, Wifi, WifiOff } from 'lucide-react';
import { useCommand, useHealthCheck } from '../hooks/useApi';

const getCommandColor = (command: string) => {
  switch (command) {
    case 'LEFT': return 'bg-blue-500 border-blue-600';
    case 'RIGHT': return 'bg-green-500 border-green-600';
    case 'FORWARD': return 'bg-purple-500 border-purple-600';
    case 'BACK': return 'bg-yellow-500 border-yellow-600';
    case 'STOP': return 'bg-red-500 border-red-600';
    default: return 'bg-gray-400 border-gray-500';
  }
};

const getCommandIcon = (command: string) => {
  switch (command) {
    case 'LEFT': return '←';
    case 'RIGHT': return '→';
    case 'FORWARD': return '↑';
    case 'BACK': return '↓';
    case 'STOP': return '⏸';
    default: return '⏸';
  }
};

export const CommandDisplay: React.FC = () => {
  const { data: commandData, isLoading, error } = useCommand();
  const { data: healthData, isError: healthError } = useHealthCheck();

  const currentCommand = commandData?.command || '待機中';
  const isConnected = !healthError && healthData?.status === 'ok';

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
          <Activity className="w-5 h-5 text-blue-500" />
          最新コマンド
        </h2>
        
        <div className="flex items-center gap-3">
          {/* 接続状態 */}
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
            isConnected 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {isConnected ? (
              <Wifi className="w-3 h-3" />
            ) : (
              <WifiOff className="w-3 h-3" />
            )}
            <span>{isConnected ? '接続中' : '切断'}</span>
          </div>
          
          {/* ローディング */}
          {isLoading && (
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          )}
        </div>
      </div>

      {error ? (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">
                サーバーとの接続に問題があります。しばらく待ってから再試行してください。
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <div className={`
            ${getCommandColor(currentCommand)} 
            text-white px-8 py-6 rounded-xl text-3xl font-bold 
            min-w-[180px] text-center shadow-lg transform transition-all duration-300
            border-2 hover:scale-105
            ${currentCommand !== '待機中' ? 'animate-bounce-subtle' : ''}
          `}>
            <div className="flex items-center justify-center gap-3">
              <span className="text-4xl drop-shadow-lg">{getCommandIcon(currentCommand)}</span>
              <span className="drop-shadow-lg">{currentCommand}</span>
            </div>
          </div>
        </div>
      )}

      {commandData && (
        <p className="text-sm text-gray-500 text-center mt-4">
          最終更新: {new Date(commandData.timestamp).toLocaleString('ja-JP', {
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })}
        </p>
      )}
    </div>
  );
};
