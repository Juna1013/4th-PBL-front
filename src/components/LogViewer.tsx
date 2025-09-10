'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, Volume2 } from 'lucide-react';
import { RecognitionLog } from '@/types';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

export default function LogViewer() {
  const [logs, setLogs] = useState<RecognitionLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const fetchLogs = async () => {
    try {
      const response = await fetch('/api/log?limit=20');
      if (response.ok) {
        const result = await response.json();
        setLogs(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch logs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // 初回読み込み
    fetchLogs();

    // 自動更新（3秒間隔）
    let interval: NodeJS.Timeout | null = null;
    if (autoRefresh) {
      interval = setInterval(fetchLogs, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh]);

  const getConfidenceColor = (confidence: number): string => {
    if (confidence >= 0.8) return 'text-emerald-400 bg-emerald-900/30 border border-emerald-700/50';
    if (confidence >= 0.6) return 'text-amber-400 bg-amber-900/30 border border-amber-700/50';
    return 'text-red-400 bg-red-900/30 border border-red-700/50';
  };

  const getConfidenceLabel = (confidence: number): string => {
    if (confidence >= 0.8) return '高';
    if (confidence >= 0.6) return '中';
    return '低';
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">
          🎙️ 音声認識ログ
        </h2>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-3 py-1 text-sm rounded-full transition-colors backdrop-blur-sm ${
              autoRefresh 
                ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-700/50' 
                : 'bg-slate-800/30 text-slate-400 border border-slate-700/50'
            }`}
          >
            {autoRefresh ? '自動更新ON' : '自動更新OFF'}
          </button>
          
          <button
            onClick={fetchLogs}
            disabled={isLoading}
            className="p-2 text-slate-400 hover:text-white transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* ログ一覧 */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {logs.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <Volume2 className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <div>音声認識ログがまだありません</div>
            <div className="text-sm">音声コマンドを送信すると表示されます</div>
          </div>
        ) : (
          logs.map((log) => (
            <div 
              key={log.id}
              className="flex items-center justify-between p-3 bg-slate-900/30 border border-slate-700/30 rounded-lg backdrop-blur-sm"
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Volume2 className="w-4 h-4 text-cyan-400" />
                  <span className="font-semibold text-white">
                    {log.command.toUpperCase()}
                  </span>
                </div>
                
                <span className={`px-2 py-1 text-xs rounded-full backdrop-blur-sm ${getConfidenceColor(log.confidence)}`}>
                  信頼度: {getConfidenceLabel(log.confidence)} ({Math.round(log.confidence * 100)}%)
                </span>
              </div>

              <div className="text-sm text-slate-400">
                {format(new Date(log.timestamp), 'HH:mm:ss', { locale: ja })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* 統計情報 */}
      {logs.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-700/50">
          <div className="grid grid-cols-3 gap-4 text-sm text-center">
            <div>
              <div className="font-semibold text-white">
                {logs.length}
              </div>
              <div className="text-slate-400">総ログ数</div>
            </div>
            <div>
              <div className="font-semibold text-white">
                {Math.round(logs.reduce((sum, log) => sum + log.confidence, 0) / logs.length * 100)}%
              </div>
              <div className="text-slate-400">平均信頼度</div>
            </div>
            <div>
              <div className="font-semibold text-white">
                {logs.filter(log => log.confidence >= 0.8).length}
              </div>
              <div className="text-slate-400">高信頼度</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
