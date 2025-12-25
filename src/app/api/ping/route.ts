import { NextResponse } from 'next/server';

/**
 * GET /api/ping
 * ヘルスチェック用エンドポイント
 */
export async function GET() {
    return NextResponse.json({
        status: 'ok',
        message: 'Server is running',
        timestamp: new Date().toISOString(),
    });
}
