import { NextResponse } from 'next/server';
import { telemetryStore } from '@/lib/telemetryStore';

/**
 * GET /api/telemetry/stats
 * テレメトリ統計情報を取得
 */
export async function GET() {
    const stats = telemetryStore.getStats();

    if (stats) {
        return NextResponse.json(stats);
    } else {
        return NextResponse.json(
            { status: 'no_data', message: 'No data available' },
            { status: 404 }
        );
    }
}
