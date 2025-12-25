import { NextResponse } from 'next/server';
import { telemetryStore } from '@/lib/telemetryStore';

/**
 * GET /api/telemetry/export
 * テレメトリデータをJSON形式でエクスポート
 */
export async function GET() {
    const filename = `telemetry_${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
    const history = telemetryStore.getHistory();

    return NextResponse.json({
        status: 'success',
        filename,
        count: history.length,
        data: history,
    });
}
