import React from 'react';
import { List, Clock, TrendingUp } from 'lucide-react';
import { useLogs, useStats } from '../hooks/useApi';

const getCommandColor = (command: string) => {
  switch (command) {
    case 'LEFT': return 'bg-blue-500';
    case 'RIGHT': return 'bg-green-500';
    case 'FORWARD': return 'bg-purple-500';
    case 'BACK': return 'bg-yellow-500';
    case 'STOP': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

export const LogsList: React.FC = () => {
  const { data: logs, isLoading, error } = useLogs(30);
  const { data: stats } = useStats();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 統計カード */}
      {stats && (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            統計情報
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">総コマンド数</span>
              <span className="font-semibold">{stats.total_commands}</span>
            </div>
            
            {Object.entries(stats.command_counts).map(([command, count]) => (
              <div key={command} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getCommandColor(command)}`}></div>
                  <span className="text-sm text-gray-600">{command}</span>
                </div>
                <span className="text-sm font-medium">{count}回</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ログリスト */}
      <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
          <List className="w-5 h-5 text-blue-500" />
          認識ログ
        </h3>

        {isLoading && (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
            <p className="text-sm text-red-700">
              ログの読み込みに失敗しました
            </p>
          </div>
        )}

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {logs?.length === 0 ? (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">まだログがありません</p>
              <p className="text-sm text-gray-400 mt-2">
                上のテストボタンでコマンドを送信してみてください
              </p>
            </div>
          ) : (
            logs?.map((log, index) => (
              <div
                key={log.id}
                className={`
                  flex items-center justify-between p-4 rounded-lg border transition-all duration-200
                  ${index === 0 
                    ? 'bg-blue-50 border-blue-200 shadow-sm' 
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <div className={`${getCommandColor(log.word)} text-white px-3 py-1 rounded-full text-sm font-semibold min-w-[80px] text-center shadow-sm`}>
                    {log.word}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-700 font-medium">
                      {index === 0 ? '最新コマンド' : `コマンド #${log.id}`}
                    </span>
                    <span className="text-xs text-gray-500">
                      ID: {log.id}
                    </span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>
                      {new Date(log.timestamp).toLocaleTimeString('ja-JP', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                      })}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(log.timestamp).toLocaleDateString('ja-JP')}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
