import React from 'react';
import { List, Clock, Activity, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Square } from 'lucide-react';
import { useLogs } from '../hooks/useApi';

const getCommandColor = (command: string) => {
  switch (command) {
    case 'LEFT': return 'from-blue-500 to-blue-600';
    case 'RIGHT': return 'from-emerald-500 to-emerald-600';
    case 'FORWARD': return 'from-purple-500 to-purple-600';
    case 'BACK': return 'from-amber-500 to-amber-600';
    case 'STOP': return 'from-red-500 to-red-600';
    default: return 'from-slate-500 to-slate-600';
  }
};

const getCommandIcon = (command: string) => {
  switch (command) {
    case 'LEFT': return ArrowLeft;
    case 'RIGHT': return ArrowRight;
    case 'FORWARD': return ArrowUp;
    case 'BACK': return ArrowDown;
    case 'STOP': return Square;
    default: return Square;
  }
};

export const LogsList: React.FC = () => {
  const { data: logs, isLoading, error } = useLogs(30);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-emerald-500/10 to-transparent rounded-full -ml-16 -mb-16"></div>
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl shadow-lg">
              <List className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">認識ログ</h3>
              <p className="text-xs text-slate-500">リアルタイム音声認識履歴</p>
            </div>
          </div>

          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-slate-500 font-medium">ログを読み込み中...</p>
            </div>
          )}

          {error && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500 rounded-full">
                  <Activity className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-amber-800">デモモード</p>
                  <p className="text-sm text-amber-600">
                    APIサーバーに接続できません。デモデータを表示しています。
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar">
            {(!logs || logs?.length === 0) && !error ? (
              <div className="text-center py-16">
                <div className="p-4 bg-slate-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Clock className="w-8 h-8 text-slate-400" />
                </div>
                <h4 className="text-lg font-semibold text-slate-600 mb-2">ログが空です</h4>
                <p className="text-slate-500 mb-4">まだログがありません</p>
                <p className="text-sm text-slate-400">
                  上のテストボタンでコマンドを送信してみてください
                </p>
              </div>
            ) : error ? (
              // デモデータを表示
              [
                { id: 1, word: 'FORWARD', timestamp: new Date().toISOString() },
                { id: 2, word: 'LEFT', timestamp: new Date(Date.now() - 30000).toISOString() },
                { id: 3, word: 'RIGHT', timestamp: new Date(Date.now() - 60000).toISOString() },
                { id: 4, word: 'STOP', timestamp: new Date(Date.now() - 90000).toISOString() }
              ].map((log, index) => {
                const IconComponent = getCommandIcon(log.word);
                return (
                  <div
                    key={log.id}
                    className={`
                      group relative p-4 rounded-xl border transition-all duration-300 hover:shadow-md
                      ${index === 0 
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-sm' 
                        : 'bg-slate-50/80 border-slate-200 hover:bg-slate-100/80'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 bg-gradient-to-r ${getCommandColor(log.word)} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-3 py-1 bg-gradient-to-r ${getCommandColor(log.word)} text-white text-sm font-bold rounded-full shadow-sm`}>
                              {log.word}
                            </span>
                            {index === 0 && (
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                最新
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <span className="opacity-75">デモデータ</span>
                            <span className="text-xs text-slate-400">ID: {log.id}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                          <Clock className="w-4 h-4" />
                          <span className="font-mono">
                            {new Date(log.timestamp).toLocaleTimeString('ja-JP', {
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit'
                            })}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400">
                          {new Date(log.timestamp).toLocaleDateString('ja-JP')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              logs?.map((log, index) => {
                const IconComponent = getCommandIcon(log.word);
                return (
                  <div
                    key={log.id}
                    className={`
                      group relative p-4 rounded-xl border transition-all duration-300 hover:shadow-md
                      ${index === 0 
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-sm' 
                        : 'bg-slate-50/80 border-slate-200 hover:bg-slate-100/80'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 bg-gradient-to-r ${getCommandColor(log.word)} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`px-3 py-1 bg-gradient-to-r ${getCommandColor(log.word)} text-white text-sm font-bold rounded-full shadow-sm`}>
                              {log.word}
                            </span>
                            {index === 0 && (
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                最新
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <span>コマンド #{log.id}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                          <Clock className="w-4 h-4" />
                          <span className="font-mono">
                            {new Date(log.timestamp).toLocaleTimeString('ja-JP', {
                              hour: '2-digit',
                              minute: '2-digit',
                              second: '2-digit'
                            })}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400">
                          {new Date(log.timestamp).toLocaleDateString('ja-JP')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
    </div>
  );
};
