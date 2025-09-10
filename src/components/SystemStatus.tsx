'use client';

import { useState, useEffect } from 'react';
import { Wifi, Server, Zap } from 'lucide-react';

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
      case 'connected': return 'text-emerald-400 bg-emerald-900/30 border-emerald-700/50';
      case 'disconnected': return 'text-red-400 bg-red-900/30 border-red-700/50';
      default: return 'text-slate-400 bg-slate-800/30 border-slate-700/50';
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
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">
        🛸 システムステータス
      </h2>

      <div className="space-y-4">
        {/* Pico W 状態 */}
        <div className="flex items-center justify-between p-3 bg-slate-900/30 border border-slate-700/30 rounded-lg backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <Wifi className="w-5 h-5 text-cyan-400" />
            <span className="font-medium text-white">Raspberry Pi Pico W</span>
          </div>
          <span className={`px-3 py-1 text-sm rounded-full border backdrop-blur-sm ${getStatusColor(status.picoW)}`}>
            {getStatusText(status.picoW)}
          </span>
        </div>

        {/* Colab 状態 */}
        <div className="flex items-center justify-between p-3 bg-slate-900/30 border border-slate-700/30 rounded-lg backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <Server className="w-5 h-5 text-emerald-400" />
            <span className="font-medium text-white">Google Colab</span>
          </div>
          <span className={`px-3 py-1 text-sm rounded-full border backdrop-blur-sm ${getStatusColor(status.colab)}`}>
            {getStatusText(status.colab)}
          </span>
        </div>

        {/* Gemini API 状態 */}
        <div className="flex items-center justify-between p-3 bg-slate-900/30 border border-slate-700/30 rounded-lg backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <Zap className="w-5 h-5 text-violet-400" />
            <span className="font-medium text-white">Gemini API</span>
          </div>
          <span className={`px-3 py-1 text-sm rounded-full border backdrop-blur-sm ${getStatusColor(status.gemini)}`}>
            {getStatusText(status.gemini)}
          </span>
        </div>
      </div>

      {/* 詳細情報 */}
      <div className="mt-4 pt-4 border-t border-slate-700/50">
        <div className="text-sm text-slate-400 space-y-2">
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
    </div>
  );
}
