'use client';

import { useEffect, useRef } from 'react';

interface LineVisualizerProps {
    sensors: number[];
}

export default function LineVisualizer({ sensors }: LineVisualizerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // キャンバスサイズ設定
        const width = canvas.width;
        const height = canvas.height;

        // 描画クリア
        ctx.clearRect(0, 0, width, height);

        // グリッド背景描画
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 1;
        for (let i = 0; i < width; i += 20) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, height);
            ctx.stroke();
        }
        for (let i = 0; i < height; i += 20) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(width, i);
            ctx.stroke();
        }

        // センサーデータの解析 (0が黒、1が白)
        // 黒線(0)の位置の重心を計算
        let activeSensors = 0;
        let weightedSum = 0;

        sensors.forEach((val, idx) => {
            if (val === 0) { // 黒検知
                activeSensors++;
                weightedSum += idx;
            }
        });

        // ライン位置の推定 (-1.0: 左端, 0.0: 中央, 1.0: 右端)
        let linePosition = 0;
        let hasLine = false;

        if (activeSensors > 0) {
            const centerIndex = weightedSum / activeSensors;
            // 0..7 の範囲を -1..1 にマッピング (3.5が中央)
            linePosition = (centerIndex - 3.5) / 3.5;
            hasLine = true;
        }

        const centerX = width / 2;
        const centerY = height / 2;

        // --- ラインの描画 ---
        if (hasLine) {
            // ラインのX座標（画面中央 + オフセット）
            // センサーが左(マイナス)に見ているなら、ラインは左にある
            const lineX = centerX + (linePosition * (width / 3));

            // 光る効果
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#fbbf24'; // amber-400

            ctx.strokeStyle = '#fbbf24';
            ctx.lineWidth = 12;
            ctx.lineCap = 'round';

            // 擬似的なパースペクティブ（手前は太く、奥は細く）
            ctx.beginPath();
            ctx.moveTo(lineX, height);
            ctx.lineTo(lineX, 0);
            ctx.stroke();

            // リセット
            ctx.shadowBlur = 0;
        }

        // --- 車体の描画 (固定) ---
        // 車体ボディ
        ctx.fillStyle = '#3b82f6'; // blue-500
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#3b82f6';

        // 三角形の機体
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - 20); // 先頭
        ctx.lineTo(centerX - 15, centerY + 20); // 左後ろ
        ctx.lineTo(centerX, centerY + 15); // 中央凹み
        ctx.lineTo(centerX + 15, centerY + 20); // 右後ろ
        ctx.closePath();
        ctx.fill();

        // センサーアレイの位置を示すドット（車体前方）
        const sensorY = centerY - 10;
        const sensorWidth = 60;
        const sensorStep = sensorWidth / 7;

        sensors.forEach((val, idx) => {
            const sx = centerX - (sensorWidth / 2) + (idx * sensorStep);

            ctx.beginPath();
            ctx.arc(sx, sensorY, 2, 0, Math.PI * 2);
            if (val === 0) {
                ctx.fillStyle = '#fbbf24'; // 検知中(Amber)
                ctx.shadowColor = '#fbbf24';
                ctx.shadowBlur = 10;
            } else {
                ctx.fillStyle = '#475569'; // 未検知(Slate)
                ctx.shadowBlur = 0;
            }
            ctx.fill();
        });

    }, [sensors]);

    return (
        <canvas
            ref={canvasRef}
            width={400}
            height={200}
            className="w-full h-48 bg-slate-900 rounded-xl border border-slate-700"
        />
    );
}
