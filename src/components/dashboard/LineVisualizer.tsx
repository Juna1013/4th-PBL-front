'use client';

import { useEffect, useRef } from 'react';

interface LineVisualizerProps {
    sensors: number[];
}

export default function LineVisualizer({ sensors }: LineVisualizerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sensorsRef = useRef<number[]>(sensors);
    const progressRef = useRef(0);
    const animationRef = useRef<number>(0);

    // センサーデータをRefに同期（アニメーションループから参照するため）
    useEffect(() => {
        sensorsRef.current = sensors;
    }, [sensors]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // コース設定
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const size = 160; // 正方形の一辺のサイズ
        const radius = 40; // 角の丸み半径

        // パスに沿った座標を取得する関数 (0.0 - 1.0)
        const getPositionOnPath = (t: number) => {
            // 全周の長さ概算
            const straightLen = (size - 2 * radius); // 直線部分の長さ
            const arcLen = (2 * Math.PI * radius) / 4; // コーナー(1/4円)の長さ
            const totalLen = (straightLen + arcLen) * 4;

            const currentDist = t * totalLen;

            // 各セクションの境界距離
            const sectionLen = straightLen + arcLen;

            // どの辺にいるか (0:下, 1:右, 2:上, 3:左) ※時計回りの場合
            // ここでは反時計回り(右→上→左→下)で実装
            // Start: 下辺の中央から右へ

            // 簡易実装: 正方形のパラメータ形式
            // t(0-1) を角度ではなく距離でマッピングするのは複雑なので、
            // 簡易的に角丸正方形を描画しながら、そのパス上の点を取得するロジックにする

            // もっと単純に、角丸正方形の軌跡を計算する
            // 4つの直線と4つの円弧
            // 0: 下辺右半分 (straightLen/2)
            // 1: 右下コーナー (arcLen)
            // 2: 右辺 (straightLen)
            // 3: 右上コーナー (arcLen)
            // 4: 上辺 (straightLen)
            // 5: 左上コーナー (arcLen)
            // 6: 左辺 (straightLen)
            // 7: 左下コーナー (arcLen)
            // 8: 下辺左半分 (straightLen/2)

            // ここではさらに単純化して、状態遷移で座標を計算
            let d = currentDist;

            const halfStraight = straightLen / 2;

            // 下辺中央(Start) -> 右
            if (d < halfStraight) {
                return {
                    x: centerX + d,
                    y: centerY + size / 2,
                    angle: 0
                };
            }
            d -= halfStraight;

            // 右下コーナー
            if (d < arcLen) {
                const angle = d / arcLen * (Math.PI / 2);
                return {
                    x: centerX + halfStraight + Math.sin(angle) * radius,
                    y: centerY + size / 2 - (radius - Math.cos(angle) * radius),
                    angle: -angle  // 進行方向
                };
            }
            d -= arcLen;

            // 右辺 (下から上へ)
            if (d < straightLen) {
                return {
                    x: centerX + size / 2,
                    y: centerY + size / 2 - radius - d,
                    angle: -Math.PI / 2
                };
            }
            d -= straightLen;

            // 右上コーナー
            if (d < arcLen) {
                const angle = d / arcLen * (Math.PI / 2);
                return {
                    x: centerX + size / 2 - (radius - Math.cos(angle) * radius),
                    y: centerY - size / 2 + radius - Math.sin(angle) * radius,
                    angle: -Math.PI / 2 - angle
                };
            }
            d -= arcLen;

            // 上辺 (右から左へ)
            if (d < straightLen) {
                return {
                    x: centerX + size / 2 - radius - d,
                    y: centerY - size / 2,
                    angle: -Math.PI
                };
            }
            d -= straightLen;

            // 左上コーナー
            if (d < arcLen) {
                const angle = d / arcLen * (Math.PI / 2);
                return {
                    x: centerX - size / 2 + (radius - Math.cos(angle) * radius),
                    y: centerY - size / 2 + radius - Math.sin(angle) * radius,
                    angle: -Math.PI - angle
                };
            }
            d -= arcLen;

            // 左辺 (上から下へ)
            if (d < straightLen) {
                return {
                    x: centerX - size / 2,
                    y: centerY - size / 2 + radius + d,
                    angle: -Math.PI * 1.5
                };
            }
            d -= straightLen;

            // 左下コーナー
            if (d < arcLen) {
                const angle = d / arcLen * (Math.PI / 2);
                return {
                    x: centerX - size / 2 + radius - Math.sin(angle) * radius,
                    y: centerY + size / 2 - (radius - Math.cos(angle) * radius),
                    angle: -Math.PI * 1.5 - angle
                };
            }
            d -= arcLen;

            // 下辺左半分 (左から中央へ)
            return {
                x: centerX - size / 2 + radius + d,
                y: centerY + size / 2,
                angle: 0
            };
        };


        const render = () => {
            // 1. キャンバスリセット
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 2. 自機位置とセンサー偏差の計算
            // 進捗を進める (ゆっくり周回)
            progressRef.current = (progressRef.current + 0.0005) % 1;

            // コース上の理想的な位置と向きを取得
            const pathPos = getPositionOnPath(progressRef.current);

            // センサー偏差の計算
            const currentSensors = sensorsRef.current;
            let activeCount = 0;
            let weightedSum = 0;
            currentSensors.forEach((v, i) => {
                if (v === 0) { // 黒検知
                    activeCount++;
                    weightedSum += i;
                }
            });

            // 左右のズレ (-1.0 ~ 1.0 程度)
            // 3.5が中心。centerIdx < 3.5 (左センサー反応) -> 車体は右にあるべき -> しかし画面上では左にラインが見える
            // ヘディングアップ視点では、車体の左右移動として表現する
            let deviation = 0;
            if (activeCount > 0) {
                const centerIdx = weightedSum / activeCount;
                deviation = (centerIdx - 3.5) * 8; // 係数調整
            }

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
            currentSensors.forEach((val, i) => {
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
