import React from 'react';
import { Activity, Wifi, WifiOff, Zap, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Square } from 'lucide-react';
import { useCommand, useHealthCheck } from '../hooks/useApi';

const getCommandColor = (command: string) => {
  switch (command) {
    case 'LEFT': return 'from-blue-500 to-blue-600 shadow-blue-500/25 border-blue-400';
    case 'RIGHT': return 'from-emerald-500 to-emerald-600 shadow-emerald-500/25 border-emerald-400';
    case 'FORWARD': return 'from-purple-500 to-purple-600 shadow-purple-500/25 border-purple-400';
    case 'BACK': return 'from-amber-500 to-amber-600 shadow-amber-500/25 border-amber-400';
    case 'STOP': return 'from-red-500 to-red-600 shadow-red-500/25 border-red-400';
    default: return 'from-slate-400 to-slate-500 shadow-slate-500/25 border-slate-400';
  }
};

const getCommandIcon = (command: string) => {
  switch (command) {
    case 'LEFT': return <ArrowLeft className="w-8 h-8" />;
    case 'RIGHT': return <ArrowRight className="w-8 h-8" />;
    case 'FORWARD': return <ArrowUp className="w-8 h-8" />;
    case 'BACK': return <ArrowDown className="w-8 h-8" />;
    case 'STOP': return <Square className="w-8 h-8" />;
    default: return <Square className="w-8 h-8" />;
  }
};

export const CommandDisplay: React.FC = () => {
  const { data: commandData, isLoading, error } = useCommand();
  const { data: healthData, isError: healthError } = useHealthCheck();

  const currentCommand = commandData?.command || '待機中';
  const isConnected = !healthError && healthData?.status === 'ok';

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-white/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full -mr-16 -mt-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full -ml-12 -mb-12"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                最新コマンド
              </h2>
              <p className="text-sm text-slate-500">リアルタイム制御状況</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Connection Status */}
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              isConnected 
                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200 shadow-emerald-100' 
                : 'bg-red-100 text-red-700 border border-red-200 shadow-red-100'
            }`}>
              {isConnected ? (
                <Wifi className="w-4 h-4" />
              ) : (
                <WifiOff className="w-4 h-4" />
              )}
              <span className="font-semibold">{isConnected ? '接続中' : '切断'}</span>
              {isConnected && (
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              )}
            </div>
            
            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-full border border-blue-200">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xs text-blue-600 font-medium">更新中</span>
              </div>
            )}
          </div>
        </div>

        {/* Main Command Display */}
        {error ? (
          <div className="space-y-6">
            {/* Error Message */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 p-6 rounded-xl shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-amber-800 mb-2">デモモード</h3>
                  <p className="text-amber-700 mb-1">
                    APIサーバーに接続できません。デモモードで表示しています。
                  </p>
                  <p className="text-sm text-amber-600">
                    本番環境では正常に動作します。
                  </p>
                </div>
              </div>
            </div>
            
            {/* Demo Command Display */}
            <div className="flex items-center justify-center">
              <div className={`
                bg-gradient-to-r ${getCommandColor('STOP')} 
                text-white p-8 rounded-3xl text-center shadow-2xl transform transition-all duration-500
                border-2 opacity-80 hover:opacity-90 hover:scale-105
                min-w-[280px] relative overflow-hidden
              `}>
                <div className="absolute inset-0 bg-white/10 rounded-3xl opacity-20"></div>
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                    {getCommandIcon('STOP')}
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-1">デモモード</div>
                    <div className="text-white/80 text-sm">接続待機中</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <div className={`
              bg-gradient-to-r ${getCommandColor(currentCommand)} 
              text-white p-8 rounded-3xl text-center shadow-2xl transform transition-all duration-500
              border-2 hover:scale-105 active:scale-95
              min-w-[280px] relative overflow-hidden group
              ${currentCommand !== '待機中' ? 'animate-pulse' : ''}
            `}>
              {/* Animated background effects */}
              <div className="absolute inset-0 bg-white/10 rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl blur transition-opacity duration-300"></div>
              
              <div className="relative z-10 flex flex-col items-center gap-4">
                {/* Icon Container */}
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                  {getCommandIcon(currentCommand)}
                </div>
                
                {/* Command Text */}
                <div>
                  <div className="text-4xl font-bold mb-2 tracking-tight">
                    {currentCommand}
                  </div>
                  {currentCommand !== '待機中' && (
                    <div className="flex items-center justify-center gap-2 text-white/80 text-sm">
                      <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse"></div>
                      <span>実行中</span>
                      <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Pulse effect for active commands */}
              {currentCommand !== '待機中' && (
                <div className="absolute inset-0 rounded-3xl animate-ping bg-white/20 opacity-30"></div>
              )}
            </div>
          </div>
        )}

        {/* Timestamp */}
        {commandData && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100/80 rounded-full border border-slate-200">
              <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
              <span className="text-sm text-slate-600 font-medium">
                最終更新: {new Date(commandData.timestamp).toLocaleString('ja-JP', {
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
