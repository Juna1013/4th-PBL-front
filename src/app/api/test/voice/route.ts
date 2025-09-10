import { NextRequest, NextResponse } from 'next/server';

/**
 * テスト用: 音声認識をシミュレートするエンドポイント
 * Colabサーバーが未接続の際の動作確認に使用
 */
export async function POST(request: NextRequest) {
  try {
    const { command } = await request.json();
    
    // ランダムな信頼度を生成
    const confidence = 0.7 + Math.random() * 0.3;
    
    // テストコマンドのリスト
    const testCommands = ['left', 'right', 'forward', 'stop', 'go'];
    const testCommand = command || testCommands[Math.floor(Math.random() * testCommands.length)];
    
    // /api/log にログを送信（Colabサーバーの動作をシミュレート）
    const logResponse = await fetch(`${request.nextUrl.origin}/api/log`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        command: testCommand,
        confidence: confidence,
        timestamp: Date.now()
      })
    });

    if (!logResponse.ok) {
      console.error('Failed to send test log');
    }

    return NextResponse.json({
      success: true,
      data: {
        command: testCommand,
        confidence: confidence,
        timestamp: Date.now()
      }
    });

  } catch (error) {
    console.error('Test voice API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Test API error'
    }, { status: 500 });
  }
}
