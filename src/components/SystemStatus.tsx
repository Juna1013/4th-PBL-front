'use client';

import { useState, useEffect } from 'react';
import { Wifi, Server, Zap, ChevronDown, ChevronUp } from 'lucide-react';

interface SystemStatusData {
  picoW: 'connected' | 'disconnected' | 'unknown';
  colab: 'connected' | 'disconnected' | 'unknown';
  gemini: 'connected' | 'disconnected' | 'unknown';
  lastPicoHeartbeat?: number;
  lastColabRequest?: number;
}

export default function SystemStatus() {
  const [status, setStatus] = useState<SystemStatusData>({
    picoW: 'unknown',
    colab: 'unknown', 
    gemini: 'unknown'
  });
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const checkSystemStatus = async () => {
      try {
        // Gemini API の状態をチェック（簡易版）
        // クライアントサイドでは実際のAPIキーは確認できないため、
        // 実際のAPI呼び出しで接続性をテスト
        let geminiStatus: 'connected' | 'disconnected' = 'disconnected';
        try {
          const testResponse = await fetch('/api/test/gemini');
          geminiStatus = testResponse.ok ? 'connected' : 'disconnected';
        } catch {
          geminiStatus = 'disconnected';
        }
        
        // TODO: 実際のPico WとColabの状態もチェック
        setStatus({
          picoW: 'connected', // 仮の状態
          colab: 'connected', // 仮の状態
          gemini: geminiStatus as 'connected' | 'disconnected',
          lastPicoHeartbeat: Date.now() - 5000,
          lastColabRequest: Date.now() - 2000
        });
        
      } catch (error) {
        console.error('System status check failed:', error);
      }
    };

    checkSystemStatus();
    const interval = setInterval(checkSystemStatus, 10000); // 10秒ごと

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-700 dark:text-green-300 bg-green-100/50 dark:bg-green-800/30 border-green-300 dark:border-green-700';
      case 'disconnected': return 'text-red-700 dark:text-red-400 bg-red-100/50 dark:bg-red-900/30 border-red-300 dark:border-red-800';
      default: return 'text-gray-700 dark:text-gray-500 bg-gray-100/50 dark:bg-gray-900/30 border-gray-300 dark:border-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected': return '接続中';
      case 'disconnected': return '切断';
      default: return '不明';
    }
  };

  return (
    <div className="bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl p-6">
      <div 
        className="flex items-center justify-between mb-4 cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          🛸 システムステータス
        </h2>
        {isCollapsed ? (
          <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        ) : (
          <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        )}
      </div>

      {!isCollapsed && (
        <>
          <div className="space-y-4">
            {/* Pico W 状態 */}
            <div className="flex items-center justify-between p-3 bg-gray-50/50 dark:bg-gray-950/30 border border-gray-200 dark:border-gray-800 rounded-lg backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <Wifi className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="font-medium text-gray-900 dark:text-white">Raspberry Pi Pico W</span>
              </div>
              <span className={`px-3 py-1 text-sm rounded-full border backdrop-blur-sm ${getStatusColor(status.picoW)}`}>
                {getStatusText(status.picoW)}
              </span>
            </div>

            {/* Colab 状態 */}
            <div className="flex items-center justify-between p-3 bg-gray-50/50 dark:bg-gray-950/30 border border-gray-200 dark:border-gray-800 rounded-lg backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <Server className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="font-medium text-gray-900 dark:text-white">Google Colab</span>
              </div>
              <span className={`px-3 py-1 text-sm rounded-full border backdrop-blur-sm ${getStatusColor(status.colab)}`}>
                {getStatusText(status.colab)}
              </span>
            </div>

            {/* Gemini API 状態 */}
            <div className="flex items-center justify-between p-3 bg-gray-50/50 dark:bg-gray-950/30 border border-gray-200 dark:border-gray-800 rounded-lg backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <Zap className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="font-medium text-gray-900 dark:text-white">Gemini API</span>
              </div>
              <span className={`px-3 py-1 text-sm rounded-full border backdrop-blur-sm ${getStatusColor(status.gemini)}`}>
                {getStatusText(status.gemini)}
              </span>
            </div>
          </div>

          {/* 詳細情報 */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-500 space-y-2">
              {status.lastPicoHeartbeat && (
                <div>
                  Pico W 最終通信: {Math.round((Date.now() - status.lastPicoHeartbeat) / 1000)}秒前
                </div>
              )}
              {status.lastColabRequest && (
                <div>
                  Colab 最終リクエスト: {Math.round((Date.now() - status.lastColabRequest) / 1000)}秒前
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
