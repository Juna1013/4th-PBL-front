import { NextRequest } from 'next/server';

/**
 * GET /api/stream
 * Server-Sent Events (SSE) でリアルタイムデータをストリーミング
 */
export async function GET(request: NextRequest) {
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
        async start(controller) {
            // ポーリング間隔（ミリ秒）
            const pollInterval = 500;

            const sendEvent = (data: any) => {
                const message = `data: ${JSON.stringify(data)}\n\n`;
                controller.enqueue(encoder.encode(message));
            };

            // 接続確立メッセージ
            sendEvent({
                type: 'connected',
                message: 'Stream connected',
                timestamp: Date.now(),
            });

            // 定期的にセンサーデータをポーリング
            const intervalId = setInterval(async () => {
                try {
                    // /api/sensor から最新データを取得
                    const response = await fetch(
                        `${request.nextUrl.origin}/api/sensor`,
                        {
                            cache: 'no-store',
                        }
                    );

                    if (response.ok) {
                        const result = await response.json();
                        if (result.status === 'ok' && result.data) {
                            sendEvent({
                                type: 'sensor_data',
                                data: result.data,
                                timestamp: Date.now(),
                            });
                        }
                    }
                } catch (error) {
                    console.error('Error fetching sensor data:', error);
                    sendEvent({
                        type: 'error',
                        message: 'Failed to fetch sensor data',
                        timestamp: Date.now(),
                    });
                }
            }, pollInterval);

            // クライアント切断時のクリーンアップ
            request.signal.addEventListener('abort', () => {
                clearInterval(intervalId);
                controller.close();
            });
        },
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
        },
    });
}
