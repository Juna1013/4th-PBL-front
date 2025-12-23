'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import DigitalTwin from '@/components/DigitalTwin';
import SensorDisplay from '@/components/SensorDisplay';
import MotorDisplay from '@/components/MotorDisplay';
import StatisticsDisplay from '@/components/StatisticsDisplay';
import DataLog from '@/components/DataLog';
// import RealtimeChart from '@/components/RealtimeChart'; // 一時的に無効化
import AlertSystem from '@/components/AlertSystem';
import { useSensorStore } from '@/lib/store';
import { startMockDataStream } from '@/lib/mockData';
import { useRealtimeData } from '@/hooks/useRealtimeData';

export default function Home() {
  const updateSensorData = useSensorStore((state) => state.updateSensorData);
  const updateStatistics = useSensorStore((state) => state.updateStatistics);
  const setConnectionStatus = useSensorStore((state) => state.setConnectionStatus);

  // モックモードとリアルモードの切り替え
  const [useMockData, setUseMockData] = useState(true);
  const [startTime, setStartTime] = useState(Date.now());

  // リアルタイムデータ受信（SSE）
  const { isConnected, error } = useRealtimeData({
    enabled: !useMockData,
    onData: (data) => {
      updateSensorData(data);

      // 統計情報を更新
      const avgSpeed = (data.motors.left.speed + data.motors.right.speed) / 2;
      updateStatistics({
        runningTime: Date.now() - startTime,
        averageSpeed: avgSpeed,
        sensorReactions: data.sensors.lineDetected ? 1 : 0,
        errorCount: data.status === 'error' ? 1 : 0,
      });
    },
    onError: (err) => {
      console.error('Realtime data error:', err);
      setConnectionStatus({ connected: false });
    },
  });

  // モックデータストリーム
  useEffect(() => {
    if (!useMockData) return;

    const stopStream = startMockDataStream((data) => {
      updateSensorData(data);

      // 統計情報を更新
      const avgSpeed = (data.motors.left.speed + data.motors.right.speed) / 2;
      updateStatistics({
        runningTime: Date.now() - startTime,
        averageSpeed: avgSpeed,
        sensorReactions: data.sensors.lineDetected ? 1 : 0,
        errorCount: data.status === 'error' ? 1 : 0,
      });
    }, 500);

    return () => stopStream();
  }, [useMockData, updateSensorData, updateStatistics, startTime]);

  // 接続状態の更新
  useEffect(() => {
    if (!useMockData) {
      setConnectionStatus({ connected: isConnected });
    }
  }, [isConnected, useMockData, setConnectionStatus]);

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-800">
      <Header />

      {/* アラートシステム */}
      <AlertSystem />

      <main className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
        {/* モード切り替えボタン */}
        <div className="mb-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6 border border-zinc-200 dark:border-zinc-700 transition-all duration-300 hover:shadow-xl animate-fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">データソース:</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setUseMockData(true);
                    setStartTime(Date.now());
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${useMockData
                    ? 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                    }`}
                >
                  モックデータ
                </button>
                <button
                  onClick={() => {
                    setUseMockData(false);
                    setStartTime(Date.now());
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${!useMockData
                    ? 'bg-green-600 text-white shadow-md hover:bg-green-700'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                    }`}
                >
                  リアルタイムデータ (SSE)
                </button>
              </div>
            </div>
            {!useMockData && (
              <div className="flex items-center space-x-2 backdrop-blur-sm bg-zinc-50/50 dark:bg-black/50 px-3 py-1.5 rounded-full">
                <div
                  className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                    }`}
                />
                <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  {isConnected ? 'SSE接続中' : error ? 'エラー' : '接続待機中'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* グリッドレイアウト */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* デジタルツイン */}
          <div className="lg:col-span-2 animate-fade-in">
            <DigitalTwin />
          </div>

          {/* リアルタイムチャート - 一時的に無効化 */}
          {/* <div className="lg:col-span-2">
            <RealtimeChart />
          </div> */}

          {/* センサー表示 */}
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <SensorDisplay />
          </div>

          {/* モーター表示 */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <MotorDisplay />
          </div>

          {/* 統計情報 */}
          <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <StatisticsDisplay />
          </div>
        </div>

        {/* データログ */}
        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <DataLog />
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-700 mt-16">
        <div className="container mx-auto px-4 sm:px-6 py-6 max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
              ライントレースカー デジタルツイン システム v1.0
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
              © 2025 4th-PBL Project. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
