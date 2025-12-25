import { NextRequest, NextResponse } from 'next/server';
import { telemetryStore } from '@/lib/telemetryStore';

/**
 * POST /api/telemetry
 * テレメトリデータを受信
 */
export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        // サーバータイムスタンプを追加
        data.server_timestamp = new Date().toISOString();

        // ストアに追加
        telemetryStore.addData(data);

        // コンソールに表示
        console.log('\n' + '='.repeat(60));
        console.log(`受信時刻: ${data.server_timestamp}`);

        // データ形式を判定して表示
        if ('sensors' in data) {
            // 新形式（main.py）
            console.log(`センサー値: ${JSON.stringify(data.sensors)}`);
            if (data.motor) {
                console.log(`左モーター速度: ${data.motor.left_speed}`);
                console.log(`右モーター速度: ${data.motor.right_speed}`);
            }
            if (data.control) {
                console.log(`エラー値: ${data.control.error.toFixed(2)}`);
                console.log(`ターン値: ${data.control.turn}`);
            }
            if (data.wifi) {
                console.log(`WiFi IP: ${data.wifi.ip}`);
            }
        } else if ('sensor_values' in data) {
            // 旧形式（test_02.py）
            console.log(`センサー値: ${JSON.stringify(data.sensor_values)}`);
            console.log(`黒線検出数: ${data.black_detected || 'N/A'}`);
            console.log(`センサーパターン: ${data.sensor_binary || 'N/A'}`);
            console.log(`タイムスタンプ: ${data.timestamp || 'N/A'}`);
        }

        console.log('='.repeat(60));

        return NextResponse.json({ status: 'success', received: true });
    } catch (error) {
        console.error('エラー:', error);
        return NextResponse.json(
            { status: 'error', message: String(error) },
            { status: 400 }
        );
    }
}

/**
 * GET /api/telemetry
 * 履歴取得（クエリパラメータでcount指定可能）
 */
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const count = parseInt(searchParams.get('count') || '10');

    return NextResponse.json(telemetryStore.getHistory(count));
}
