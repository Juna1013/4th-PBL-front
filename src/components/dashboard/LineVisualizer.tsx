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

            // 2. コース描画（ネオン風）
            ctx.shadowBlur = 15;
            ctx.shadowColor = 'rgba(59, 130, 246, 0.5)'; // blue-500
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = 4;
            ctx.lineJoin = 'round';

            ctx.beginPath();
            // 角丸正方形を描く
            ctx.roundRect(centerX - size / 2, centerY - size / 2, size, size, radius);
            ctx.stroke();

            // スタートライン
            ctx.shadowBlur = 0;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY + size / 2 - 10);
            ctx.lineTo(centerX, centerY + size / 2 + 10);
            ctx.stroke();

            // 3. 自機位置の計算
            // 進捗を進める (ゆっくり周回)
            progressRef.current = (progressRef.current + 0.0005) % 1;

            const pos = getPositionOnPath(progressRef.current);

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

            // 偏差 (-1.0 ~ 1.0)
            // センサーindex 0が左、7が右。
            // 左(0)が反応 = ラインは左にある = 車体は右にズレている(偏差プラス)
            // 右(7)が反応 = ラインは右にある = 車体は左にズレている(偏差マイナス)
            // としたいが、ここでは単純に「ラインからのズレ」を描画したい。
            // センサー重心が左(小さいIndex)なら、車体はラインに対して右側にいる。
            // コースラインに対して、法線方向にずらす。

            let deviation = 0;
            if (activeCount > 0) {
                const centerIdx = weightedSum / activeCount;
                // 中心が3.5。
                // centerIdxが0(左)のとき、車体は右にずれていることにする
                deviation = (3.5 - centerIdx) * 6; // スケール係数
            }

            // 座標変換: pos.x, pos.y から pos.angle に対して垂直方向に deviation ずらす
            // 進行方向 angle に対して +90度 (Math.PI/2) が右側
            const normalAngle = pos.angle + Math.PI / 2;

            const carX = pos.x + Math.cos(normalAngle) * deviation;
            const carY = pos.y + Math.sin(normalAngle) * deviation;

            // 4. 自機描画
            ctx.save();
            ctx.translate(carX, carY);
            // 進行方向に回転。deviationによる自転も少し加えるとリアルかも
            const rotation = pos.angle + (deviation * 0.05);
            // 座標系が右回りのため、angleの扱いに注意。canvasの回転は時計回り。
            // getPositionOnPathのangleは反時計回りベースで計算したので符号反転が必要かもだが、
            // 試行錯誤より見た目で調整。
            // Start地点(下辺右向き)でangle=0。Canvas回転も0で右向き。OK。
            // 右辺(上向き)でangle=-PI/2。Canvas回転も-PI/2で上向き。OK。
            ctx.rotate(rotation);

            // 車体
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#fbbf24'; // amber-400
            ctx.fillStyle = '#fbbf24'; // 本体色

            // 三角形
            ctx.beginPath();
            ctx.moveTo(10, 0); // 先頭
            ctx.lineTo(-6, 6);
            ctx.lineTo(-2, 0); // 凹み
            ctx.lineTo(-6, -6);
            ctx.closePath();
            ctx.fill();

            // センサーライト表現 (前方)
            currentSensors.forEach((val, i) => {
                const sx = 0; // 車体中心からの前後位置
                const sy = -7 + (i * 2); // 左右位置

                ctx.beginPath();
                // 小さいドット
                // ctx.arc(sx, sy, 1, 0, Math.PI*2);
                // ctx.fill();
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
