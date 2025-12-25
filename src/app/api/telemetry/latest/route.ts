import { NextResponse } from 'next/server';
import { telemetryStore } from '@/lib/telemetryStore';

/**
 * GET /api/telemetry/latest
 * 最新のテレメトリデータを取得
 */
export async function GET() {
    const latest = telemetryStore.getLatest();

    if (latest) {
        return NextResponse.json(latest);
    } else {
        return NextResponse.json(
            { status: 'no_data', message: 'No data available' },
            { status: 404 }
        );
    }
}
