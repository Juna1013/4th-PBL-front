import { NextRequest, NextResponse } from 'next/server';
import { RecognitionLog } from '@/types';

// メモリ上に認識ログを保存（本番環境ではDBを使用）
let recognitionLogs: RecognitionLog[] = [];

// POST /api/log
// Colab からの音声認識結果を受信
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { command, confidence, timestamp } = body;

        // バリデーション
        if (!command || confidence === undefined) {
            return NextResponse.json({
                success: false,
                error: 'Missing required fields: command, confidence'
            }, { status: 400 });
        }

        // 新しいログエントリを作成
        const logEntry: RecognitionLog = {
            id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            command,
            confidence,
            timestamp: timestamp || Date.now()
        };

        // ログを追加
        recognitionLogs.unshift(logEntry);

        // 最新100件のみ保持
        if (recognitionLogs.length > 100) {
            recognitionLogs = recognitionLogs.slice(0, 100);
        }

        console.log(`New recognition log: ${command} (confidence: ${confidence})`);

        return NextResponse.json({
            success: true,
            data: logEntry
        });

    } catch (error) {
        console.error('Log API error:', error);
        return NextResponse.json({
            success: false,
            error: 'Internal server error'
        }, { status: 500 });
    }
}

// GET /api/log
// 認識ログ一覧を取得（フロントエンド用）
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');

    const limitedLogs = recognitionLogs.slice(0, Math.min(limit, 100));

    return NextResponse.json({
        success: true,
        data: limitedLogs,
        total: recognitionLogs.length
    });
}
