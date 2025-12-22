'use client';

import { useSensorStore } from '@/lib/store';
import { useEffect, useRef } from 'react';

export default function DigitalTwin() {
    const currentData = useSensorStore((state) => state.currentData);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // キャンバスをクリア
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 背景グリッド
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 1;
        for (let i = 0; i < canvas.width; i += 20) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx.stroke();
        }
        for (let i = 0; i < canvas.height; i += 20) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.width, i);
            ctx.stroke();
        }

        // コース（ライン）を描画
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 40;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();

        if (!currentData) {
            // データがない場合は車両を中央に描画
            drawCar(ctx, canvas.width / 2, canvas.height / 2, 0, false);
            return;
        }

        // 車両の位置を計算（センサー値から推定）
        const { sensors, motors } = currentData;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // センサー値から横方向のオフセットを計算
        const leftDiff = sensors.left - 512;
        const rightDiff = sensors.right - 512;
        const offset = (rightDiff - leftDiff) / 10;

        // モーター速度から前進/後退を判定
        const avgSpeed = (motors.left.speed + motors.right.speed) / 2;
        const isMoving = avgSpeed > 50;

        // 車両を描画
        drawCar(ctx, centerX + offset, centerY, 0, isMoving);

        // センサー状態を可視化
        drawSensors(ctx, centerX + offset, centerY, sensors);
    }, [currentData]);

    const drawCar = (
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        heading: number,
        isMoving: boolean
    ) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate((heading * Math.PI) / 180);

        // 車体
        ctx.fillStyle = isMoving ? '#3b82f6' : '#6b7280';
        ctx.fillRect(-25, -35, 50, 70);

        // 車体の枠
        ctx.strokeStyle = '#1f2937';
        ctx.lineWidth = 2;
        ctx.strokeRect(-25, -35, 50, 70);

        // ホイール
        ctx.fillStyle = '#1f2937';
        ctx.fillRect(-30, -25, 8, 15);
        ctx.fillRect(22, -25, 8, 15);
        ctx.fillRect(-30, 10, 8, 15);
        ctx.fillRect(22, 10, 8, 15);

        // 前方向インジケーター
        ctx.fillStyle = isMoving ? '#10b981' : '#6b7280';
        ctx.beginPath();
        ctx.moveTo(0, -35);
        ctx.lineTo(-10, -45);
        ctx.lineTo(10, -45);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    };

    const drawSensors = (
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        sensors: { left: number; center: number; right: number; lineDetected: boolean }
    ) => {
        const sensorY = y + 40;
        const sensorSize = 8;

        // 左センサー
        ctx.fillStyle = sensors.left > 512 ? '#10b981' : '#ef4444';
        ctx.fillRect(x - 20 - sensorSize / 2, sensorY, sensorSize, sensorSize);

        // 中央センサー
        ctx.fillStyle = sensors.center > 512 ? '#10b981' : '#ef4444';
        ctx.fillRect(x - sensorSize / 2, sensorY, sensorSize, sensorSize);

        // 右センサー
        ctx.fillStyle = sensors.right > 512 ? '#10b981' : '#ef4444';
        ctx.fillRect(x + 20 - sensorSize / 2, sensorY, sensorSize, sensorSize);

        // ライン検出インジケーター
        if (sensors.lineDetected) {
            ctx.strokeStyle = '#10b981';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(x, y, 50, 0, 2 * Math.PI);
            ctx.stroke();
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">デジタルツイン (2D)</h2>
                <div className="flex items-center space-x-4 text-xs">
                    <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 bg-green-500 rounded"></div>
                        <span className="text-gray-600">ライン検出</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 bg-red-500 rounded"></div>
                        <span className="text-gray-600">ライン未検出</span>
                    </div>
                </div>
            </div>

            <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center">
                <canvas
                    ref={canvasRef}
                    width={600}
                    height={400}
                    className="border border-gray-300 rounded bg-white"
                />
            </div>

            {currentData && (
                <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-center">
                    <div className="p-2 bg-gray-50 rounded">
                        <div className="font-semibold text-gray-700">ステータス</div>
                        <div className="text-gray-900 capitalize">{currentData.status}</div>
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                        <div className="font-semibold text-gray-700">ライン検出</div>
                        <div className="text-gray-900">
                            {currentData.sensors.lineDetected ? 'あり' : 'なし'}
                        </div>
                    </div>
                    <div className="p-2 bg-gray-50 rounded">
                        <div className="font-semibold text-gray-700">平均速度</div>
                        <div className="text-gray-900">
                            {Math.round(
                                (currentData.motors.left.speed + currentData.motors.right.speed) / 2
                            )}{' '}
                            PWM
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
