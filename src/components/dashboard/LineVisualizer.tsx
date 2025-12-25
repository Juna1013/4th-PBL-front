'use client';

import { useEffect, useRef } from 'react';

interface LineVisualizerProps {
    sensors: number[];
    error?: number;
}

export default function LineVisualizer({ sensors, error }: LineVisualizerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sensorsRef = useRef<number[]>(sensors);
    const errorRef = useRef<number | undefined>(error);
    const progressRef = useRef(0);
    const animationRef = useRef<number>(0);

    // データをRefに同期
    useEffect(() => {
        sensorsRef.current = sensors;
        errorRef.current = error;
    }, [sensors, error]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // ... (コース設定部分は変更なし、省略可能だが安全のためそのまま維持する形で実装) ...
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const size = 160;
        const radius = 40;

        // パス取得関数（変更なし）
        const getPositionOnPath = (t: number) => {
            const straightLen = (size - 2 * radius);
            const arcLen = (2 * Math.PI * radius) / 4;
            const totalLen = (straightLen + arcLen) * 4;
            const currentDist = t * totalLen;
            const halfStraight = straightLen / 2;
            let d = currentDist;

            // 下辺中央(Start) -> 右
            if (d < halfStraight) return { x: centerX + d, y: centerY + size / 2, angle: 0 };
            d -= halfStraight;
            // 右下
            if (d < arcLen) {
                const angle = d / arcLen * (Math.PI / 2);
                return { x: centerX + halfStraight + Math.sin(angle) * radius, y: centerY + size / 2 - (radius - Math.cos(angle) * radius), angle: -angle };
            }
            d -= arcLen;
            // 右辺
            if (d < straightLen) return { x: centerX + size / 2, y: centerY + size / 2 - radius - d, angle: -Math.PI / 2 };
            d -= straightLen;
            // 右上
            if (d < arcLen) {
                const angle = d / arcLen * (Math.PI / 2);
                return { x: centerX + size / 2 - (radius - Math.cos(angle) * radius), y: centerY - size / 2 + radius - Math.sin(angle) * radius, angle: -Math.PI / 2 - angle };
            }
            d -= arcLen;
            // 上辺
            if (d < straightLen) return { x: centerX + size / 2 - radius - d, y: centerY - size / 2, angle: -Math.PI };
            d -= straightLen;
            // 左上
            if (d < arcLen) {
                const angle = d / arcLen * (Math.PI / 2);
                return { x: centerX - size / 2 + (radius - Math.cos(angle) * radius), y: centerY - size / 2 + radius - Math.sin(angle) * radius, angle: -Math.PI - angle };
            }
            d -= arcLen;
            // 左辺
            if (d < straightLen) return { x: centerX - size / 2, y: centerY - size / 2 + radius + d, angle: -Math.PI * 1.5 };
            d -= straightLen;
            // 左下
            if (d < arcLen) {
                const angle = d / arcLen * (Math.PI / 2);
                return { x: centerX - size / 2 + radius - Math.sin(angle) * radius, y: centerY + size / 2 - (radius - Math.cos(angle) * radius), angle: -Math.PI * 1.5 - angle };
            }
            d -= arcLen;
            // 下辺左
            return { x: centerX - size / 2 + radius + d, y: centerY + size / 2, angle: 0 };
        };

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 進捗
            progressRef.current = (progressRef.current + 0.0005) % 1;
            const pathPos = getPositionOnPath(progressRef.current);

            // 偏差計算 (ファームウェアロジック準拠)
            let errorValue = errorRef.current;

            if (errorValue === undefined) {
                // ファームウェアからのerrorがない場合、同じロジックで計算
                const currentSensors = sensorsRef.current;
                const weights = [-7, -5, -3, -1, 1, 3, 5, 7];
                let weightedSum = 0;
                let activeCount = 0;

                currentSensors.forEach((v, i) => {
                    if (v === 0) { // 黒検知
                        weightedSum += weights[i];
                        activeCount++;
                    }
                });

                if (activeCount > 0) {
                    // ファームウェア: return -(weighted_sum / detected_count)
                    // 左(-7)検知 -> weightedSum = -7 -> result = 7 (正)
                    // 右(7)検知 -> weightedSum = 7 -> result = -7 (負)
                    errorValue = -(weightedSum / activeCount);
                } else {
                    errorValue = 0;
                }
            }

            // 描画用の偏差量に変換
            // errorValue: 正=左寄り(左センサー反応), 負=右寄り(右センサー反応)
            // 描画上: deviationが正なら右へ移動、負なら左へ移動
            // Errorが正(7) = 左センサー反応 = 車体はラインの右にいるべき = 描画上の車体位置は右(+X)
            // なので deviation = errorValue * scale で良さそう
            const deviation = (errorValue || 0) * 4; // スケール調整 (7 * 4 = 28px)


            // --- 描画パイプライン ---

            // A. コースの描画（背景）
            // ヘディングアップにするため、キャンバス全体を回転・移動させる
            ctx.save();

            // A-1. 視点の中心を画面下部中央に設定
            const viewCenterX = canvas.width / 2;
            const viewCenterY = canvas.height * 0.75;
            ctx.translate(viewCenterX, viewCenterY);

            // A-2. 進行方向が常に「上 (-PI/2)」になるように全体を回転
            // pathPos.angle は現在の進行方向。これを -PI/2 に合わせる
            const rotation = -Math.PI / 2 - pathPos.angle;
            ctx.rotate(rotation);

            // A-3. 現在地が中心に来るようにコース全体を逆移動
            ctx.translate(-pathPos.x, -pathPos.y);

            // A-4. コース描画（ネオン風）
            ctx.shadowBlur = 20;
            ctx.shadowColor = 'rgba(59, 130, 246, 0.4)'; // blue-500
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = 6;
            ctx.lineJoin = 'round';

            ctx.beginPath();
            ctx.roundRect(centerX - size / 2, centerY - size / 2, size, size, radius);
            ctx.stroke();

            // スタートライン
            ctx.shadowBlur = 0;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY + size / 2 - 15);
            ctx.lineTo(centerX, centerY + size / 2 + 15);
            ctx.stroke();

            // グリッド線などを描画して地面の移動感を出す（オプション）
            // ここではシンプルさを優先して省略

            ctx.restore();


            // B. 車体の描画（固定位置 + 左右偏差）
            ctx.save();
            // 車体は画面下部中央付近に固定 + センサーによる左右ズレ
            // deviationがプラス（右センサー反応=ラインが右）なら、車体は左にいる...ではなく
            // 単純に「ラインからのズレ」を車体の横移動で表現する
            // centerIdxが大きい(右センサー反応) -> ラインは右にある -> 車体は相対的に左にズレている(Xマイナス)
            // deviation = (centerIdx - 3.5) * 8
            // centerIdx=7(右端) -> deviation = 3.5*8 = +28 (右へ移動) 
            // あれ、右センサーが反応してるなら、ラインを追いかけて右に動くべき？
            // いや、これは「ズレ」の可視化。
            // 右センサーが反応している＝車体はラインの左側にいる。
            // なので、画面上ではライン（中心）に対して車体を「左」に描画すべき。
            // deviationの符号を反転させる

            const carDisplayX = viewCenterX - deviation;
            const carDisplayY = viewCenterY;

            ctx.translate(carDisplayX, carDisplayY);

            // 車体は常に上向き (-PI/2) 
            // キャンバス座標系ではデフォルトで右向き(0)基準で描画していたので -PI/2 回転
            ctx.rotate(-Math.PI / 2);

            // 車体ビジュアル
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#fbbf24'; // amber-400
            ctx.fillStyle = '#fbbf24';

            // 未来的な戦闘機風の三角形
            ctx.beginPath();
            ctx.moveTo(12, 0);   // 先頭
            ctx.lineTo(-8, 8);   // 左翼
            ctx.lineTo(-4, 0);   // エンジン部凹み
            ctx.lineTo(-8, -8);  // 右翼
            ctx.closePath();
            ctx.fill();

            // センサー状態のインジケーター（車体前方に展開）
            sensorsRef.current.forEach((val, i) => {
                const sx = 8; // 前後位置
                const sy = -10 + (i * 3); // 左右幅

                if (val === 0) { // 検知中
                    ctx.beginPath();
                    ctx.fillStyle = '#ef4444'; // 検知時は赤
                    ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            ctx.restore();

            animationRef.current = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            width={400}
            height={250}
            className="w-full h-64 bg-slate-900 rounded-xl border border-slate-700"
        />
    );
}
