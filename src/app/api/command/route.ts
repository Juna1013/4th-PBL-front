import { NextRequest, NextResponse } from 'next/server';
import { Command, CommandType, VALID_COMMANDS } from '@/types';

// メモリ上に最新コマンドを保存
let currentCommand: Command = {
    command: 'STOP',
    timestamp: Date.now(),
    source: 'chat'
};

// GET /api/command
// Pico W が現在のコマンドを取得するためのエンドポイント
export async function GET() {
    return NextResponse.json({
        success: true,
        data: currentCommand
    });
}

// POST /api/command
// 新しいコマンドを設定するためのエンドポイント
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { command, source  = 'chat' } = body;

        // バリデーション
        if (!command || !VALID_COMMANDS.includes(command.tiUpperCase())) {
            return NextResponse.json({
                seccess: false,
                error: 'Invalid command. Valid commands: ' + VALID_COMMANDS.join(', ')
            }, { status: 400 });
        }

        // コマンドを更新
        currentCommand = {
            command: command.tiUpperCase() as CommandType,
            timestamp: Date.now(),
            source: source as 'voice' | 'chat'
        };

        console.log(`New command set: ${currentCommand.command} (source: ${currentCommand.source})`);

        return NextResponse.json({
            success: true,
            data: currentCommand
        });

    } catch (error) {
        console.error('Command API error:', error);
        return NextResponse.json({
            success: false,
            error: 'Internal server error'
        }, { status: 500 });
    }
}
