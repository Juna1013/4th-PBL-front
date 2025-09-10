'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, Volume2, ChevronDown, ChevronUp } from 'lucide-react';
import { RecognitionLog } from '@/types';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

export default function LogViewer() {
  const [logs, setLogs] = useState<RecognitionLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

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
    if (confidence >= 0.8) return 'text-green-700 dark:text-green-300 bg-green-100/50 dark:bg-green-800/30 border border-green-300 dark:border-green-700';
    if (confidence >= 0.6) return 'text-yellow-700 dark:text-yellow-300 bg-yellow-100/50 dark:bg-yellow-800/30 border border-yellow-300 dark:border-yellow-700';
    return 'text-red-700 dark:text-red-400 bg-red-100/50 dark:bg-red-900/30 border border-red-300 dark:border-red-800';
  };

  const getConfidenceLabel = (confidence: number): string => {
    if (confidence >= 0.8) return '高';
    if (confidence >= 0.6) return '中';
    return '低';
  };

  return (
    <div className="bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div 
          className="flex items-center cursor-pointer"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mr-2">
            🎙️ 音声認識ログ
          </h2>
          {isCollapsed ? (
            <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-3 py-1 text-sm rounded-full transition-colors backdrop-blur-sm ${
              autoRefresh 
                ? 'bg-green-100/50 dark:bg-green-800/30 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-700' 
                : 'bg-gray-100/50 dark:bg-gray-900/30 text-gray-600 dark:text-gray-500 border border-gray-300 dark:border-gray-800'
            }`}
          >
            {autoRefresh ? '自動更新ON' : '自動更新OFF'}
          </button>
          
          <button
            onClick={fetchLogs}
            disabled={isLoading}
            className="p-2 text-gray-600 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <>
          {/* ログ一覧 */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {logs.length === 0 ? (
              <div className="text-center py-8 text-gray-600 dark:text-gray-500">
                <Volume2 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <div>音声認識ログがまだありません</div>
                <div className="text-sm">音声コマンドを送信すると表示されます</div>
              </div>
            ) : (
              logs.map((log) => (
                <div 
                  key={log.id}
                  className="flex items-center justify-between p-3 bg-gray-50/50 dark:bg-gray-950/30 border border-gray-200 dark:border-gray-800 rounded-lg backdrop-blur-sm"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <Volume2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {log.command.toUpperCase()}
                      </span>
                    </div>
                    
                    <span className={`px-2 py-1 text-xs rounded-full backdrop-blur-sm ${getConfidenceColor(log.confidence)}`}>
                      信頼度: {getConfidenceLabel(log.confidence)} ({Math.round(log.confidence * 100)}%)
                    </span>
                  </div>

                  <div className="text-sm text-gray-600 dark:text-gray-500">
                    {format(new Date(log.timestamp), 'HH:mm:ss', { locale: ja })}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 統計情報 */}
          {logs.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-3 gap-4 text-sm text-center">
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {logs.length}
                  </div>
                  <div className="text-gray-600 dark:text-gray-500">総ログ数</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {Math.round(logs.reduce((sum, log) => sum + log.confidence, 0) / logs.length * 100)}%
                  </div>
                  <div className="text-gray-600 dark:text-gray-500">平均信頼度</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {logs.filter(log => log.confidence >= 0.8).length}
                  </div>
                  <div className="text-gray-600 dark:text-gray-500">高信頼度</div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
