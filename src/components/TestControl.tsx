import React from 'react';
import { Loader2, CheckCircle, AlertCircle, Gamepad2, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Square } from 'lucide-react';
import { useSendCommand } from '../hooks/useApi';

const COMMANDS = [
  { 
    name: 'LEFT', 
    icon: ArrowLeft, 
    gradient: 'from-blue-500 to-blue-600',
    shadow: 'shadow-blue-500/25',
    ring: 'focus:ring-blue-300',
    description: '左に移動'
  },
  { 
    name: 'RIGHT', 
    icon: ArrowRight, 
    gradient: 'from-emerald-500 to-emerald-600',
    shadow: 'shadow-emerald-500/25',
    ring: 'focus:ring-emerald-300',
    description: '右に移動'
  },
  { 
    name: 'FORWARD', 
    icon: ArrowUp, 
    gradient: 'from-purple-500 to-purple-600',
    shadow: 'shadow-purple-500/25',
    ring: 'focus:ring-purple-300',
    description: '前進'
  },
  { 
    name: 'BACK', 
    icon: ArrowDown, 
    gradient: 'from-amber-500 to-amber-600',
    shadow: 'shadow-amber-500/25',
    ring: 'focus:ring-amber-300',
    description: '後退'
  },
  { 
    name: 'STOP', 
    icon: Square, 
    gradient: 'from-red-500 to-red-600',
    shadow: 'shadow-red-500/25',
    ring: 'focus:ring-red-300',
    description: '停止'
  },
];

export const TestControls: React.FC = () => {
  const sendCommandMutation = useSendCommand();

  const handleSendCommand = (command: string) => {
    sendCommandMutation.mutate(command);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-white/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full -ml-16 -mt-16"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full -mr-12 -mb-12"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg">
            <Gamepad2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
              テスト用コマンド送信
            </h2>
            <p className="text-sm text-slate-500">ライントレースカーを手動で制御</p>
          </div>
        </div>
        
        {/* Command Buttons Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          {COMMANDS.map((cmd) => {
            const IconComponent = cmd.icon;
            return (
              <button
                key={cmd.name}
                onClick={() => handleSendCommand(cmd.name)}
                disabled={sendCommandMutation.isPending}
                className={`
                  group relative bg-gradient-to-r ${cmd.gradient} text-white 
                  rounded-2xl font-semibold transition-all duration-300 transform 
                  hover:scale-105 hover:-translate-y-1 active:scale-95
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                  focus:outline-none focus:ring-4 ${cmd.ring} focus:ring-opacity-50
                  shadow-lg ${cmd.shadow} hover:shadow-xl
                  min-h-[120px] flex flex-col items-center justify-center gap-3
                  border border-white/20 overflow-hidden
                `}
              >
                {/* Button background effects */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                
                <div className="relative z-10 flex flex-col items-center gap-2">
                  {sendCommandMutation.isPending ? (
                    <Loader2 className="w-8 h-8 animate-spin" />
                  ) : (
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8" />
                    </div>
                  )}
                  
                  <div className="text-center">
                    <div className="text-lg font-bold">{cmd.name}</div>
                    <div className="text-xs text-white/80 hidden sm:block">
                      {cmd.description}
                    </div>
                  </div>
                </div>
                
                {/* Pulse effect for active commands */}
                {sendCommandMutation.isPending && (
                  <div className="absolute inset-0 rounded-2xl animate-ping bg-white/20 opacity-30"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Status Messages */}
        <div className="space-y-4">
          {sendCommandMutation.isSuccess && (
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500 rounded-full">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-emerald-800">送信完了</div>
                  <div className="text-sm text-emerald-600">コマンドを正常に送信しました</div>
                </div>
              </div>
            </div>
          )}

          {sendCommandMutation.isError && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500 rounded-full">
                  <AlertCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-amber-800">デモモード</div>
                  <div className="text-sm text-amber-600">
                    APIサーバーに接続できません。本番環境では正常に動作します。
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
