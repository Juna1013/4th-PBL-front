import { NextRequest, NextResponse } from 'next/server';

// センサーデータの型定義（ファームウェアから送信されるデータ）
interface SensorPayload {
    timestamp?: number;
    sensors: {
        values: number[]; // 8つのセンサー値（0=黒検出, 1=白検出）
        lineDetected?: boolean;
    };
    motors: {
        left: {
            speed: number;
            direction: 'forward' | 'backward' | 'stop';
        };
        right: {
            speed: number;
            direction: 'forward' | 'backward' | 'stop';
        };
    };
    error?: number; // ライントレースのエラー値
    status?: 'running' | 'stopped' | 'error';
}

// グローバルに最新のセンサーデータを保持
let latestSensorData: SensorPayload | null = null;

/**
 * POST /api/sensor
 * ファームウェアからセンサーデータを受信
 */
export async function POST(request: NextRequest) {
    try {
        const data: SensorPayload = await request.json();

        // タイムスタンプを追加（送信されていない場合）
        if (!data.timestamp) {
            data.timestamp = Date.now();
        }

        // データを保存
        latestSensorData = data;

        console.log('Received sensor data:', {
            timestamp: data.timestamp,
            sensors: data.sensors.values,
            motors: `L:${data.motors.left.speed} R:${data.motors.right.speed}`,
            error: data.error,
        });

        return NextResponse.json({
            status: 'ok',
            message: 'Data received',
            timestamp: data.timestamp,
        });
    } catch (error) {
        console.error('Error processing sensor data:', error);
        return NextResponse.json(
            {
                status: 'error',
                message: 'Failed to process data',
            },
            { status: 400 }
        );
    }
}

/**
 * GET /api/sensor
 * 最新のセンサーデータを取得
 */
export async function GET() {
    if (!latestSensorData) {
        return NextResponse.json(
            {
                status: 'no_data',
                message: 'No sensor data available',
            },
            { status: 404 }
        );
    }

    return NextResponse.json({
        status: 'ok',
        data: latestSensorData,
    });
}
