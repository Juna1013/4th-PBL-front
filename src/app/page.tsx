'use client';

import { useEffect } from 'react';
import Header from '@/components/Header';
import DigitalTwin from '@/components/DigitalTwin';
import SensorDisplay from '@/components/SensorDisplay';
import MotorDisplay from '@/components/MotorDisplay';
import StatisticsDisplay from '@/components/StatisticsDisplay';
import DataLog from '@/components/DataLog';
import { useSensorStore } from '@/lib/store';
import { startMockDataStream } from '@/lib/mockData';

export default function Home() {
  const updateSensorData = useSensorStore((state) => state.updateSensorData);
  const updateStatistics = useSensorStore((state) => state.updateStatistics);

  useEffect(() => {
    // モックデータストリームを開始（開発用）
    // 実際のデータ受信時はこの部分をWebSocket接続に置き換える
    const stopStream = startMockDataStream((data) => {
      updateSensorData(data);

      // 統計情報を更新
      const avgSpeed = (data.motors.left.speed + data.motors.right.speed) / 2;
      updateStatistics({
        runningTime: Date.now() - (data.timestamp - 10000), // 仮の計算
        averageSpeed: avgSpeed,
        sensorReactions: data.sensors.lineDetected ? 1 : 0,
        errorCount: data.status === 'error' ? 1 : 0,
      });
    }, 500);

    return () => stopStream();
  }, [updateSensorData, updateStatistics]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      <main className="container mx-auto px-6 py-8">
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
