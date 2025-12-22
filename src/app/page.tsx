'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import DigitalTwin from '@/components/DigitalTwin';
import SensorDisplay from '@/components/SensorDisplay';
import MotorDisplay from '@/components/MotorDisplay';
import StatisticsDisplay from '@/components/StatisticsDisplay';
import DataLog from '@/components/DataLog';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      <main className="container mx-auto px-6 py-8">
        {/* モード切り替えボタン */}
        <div className="mb-6 flex items-center justify-between bg-white rounded-xl shadow-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">データソース:</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setUseMockData(true);
                  setStartTime(Date.now());
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${useMockData
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                モックデータ
              </button>
              <button
                onClick={() => {
                  setUseMockData(false);
                  setStartTime(Date.now());
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${!useMockData
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                リアルタイムデータ (SSE)
              </button>
            </div>
          </div>
          {!useMockData && (
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                  }`}
              />
              <span className="text-xs text-gray-600">
                {isConnected ? 'SSE接続中' : error ? 'エラー' : '接続待機中'}
              </span>
            </div>
          )}
        </div>

        {/* グリッドレイアウト */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* デジタルツイン */}
          <div className="lg:col-span-2">
            <DigitalTwin />
          </div>

          {/* センサー表示 */}
          <div>
            <SensorDisplay />
          </div>

          {/* モーター表示 */}
          <div>
            <MotorDisplay />
          </div>

          {/* 統計情報 */}
          <div className="lg:col-span-2">
            <StatisticsDisplay />
          </div>
        </div>

        {/* データログ */}
        <div>
          <DataLog />
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-6 py-4">
          <div className="text-center text-sm text-gray-600">
            <p>ライントレースカー デジタルツイン システム v1.0</p>
            <p className="text-xs text-gray-400 mt-1">
              © 2025 4th-PBL Project. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
