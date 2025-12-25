import { NextResponse } from 'next/server';
import { telemetryStore } from '@/lib/telemetryStore';

/**
 * POST /api/telemetry/clear
 * テレメトリ履歴をクリア
 */
export async function POST() {
    const count = telemetryStore.clear();

    return NextResponse.json({
        status: 'success',
        cleared: count,
    });
}
