import { useEffect, useRef, useState } from 'react';
import { SensorData } from '@/types/sensor';

interface UseRealtimeDataOptions {
    enabled?: boolean;
    onData?: (data: SensorData) => void;
    onError?: (error: Error) => void;
}

/**
 * Server-Sent Events (SSE) を使用してリアルタイムデータを受信するカスタムフック
 */
export function useRealtimeData(options: UseRealtimeDataOptions = {}) {
    const { enabled = true, onData, onError } = options;
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const eventSourceRef = useRef<EventSource | null>(null);

    useEffect(() => {
        if (!enabled) {
            return;
        }

        // EventSource を作成
        const eventSource = new EventSource('/api/stream');
        eventSourceRef.current = eventSource;

        eventSource.onopen = () => {
            console.log('SSE connection opened');
            setIsConnected(true);
            setError(null);
        };

        eventSource.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);

                if (message.type === 'sensor_data' && message.data) {
                    // ファームウェアのデータ形式をアプリケーションの形式に変換
                    const sensorData: SensorData = convertToSensorData(message.data);
                    onData?.(sensorData);
                } else if (message.type === 'error') {
                    console.error('SSE error message:', message.message);
                }
            } catch (err) {
                console.error('Error parsing SSE message:', err);
                const error = err instanceof Error ? err : new Error('Unknown error');
                setError(error);
                onError?.(error);
            }
        };

        eventSource.onerror = (err) => {
            console.error('SSE connection error:', err);
            setIsConnected(false);
            const error = new Error('SSE connection failed');
            setError(error);
            onError?.(error);
        };

        // クリーンアップ
        return () => {
            eventSource.close();
            eventSourceRef.current = null;
            setIsConnected(false);
        };
    }, [enabled, onData, onError]);

    return {
        isConnected,
        error,
        disconnect: () => {
            eventSourceRef.current?.close();
            setIsConnected(false);
        },
    };
}

/**
 * ファームウェアのデータ形式をアプリケーションの形式に変換
 */
function convertToSensorData(firmwareData: any): SensorData {
    // 8つのセンサー値から代表値を計算
    const sensorValues = firmwareData.sensors.values || [];

    // 左側センサー（0-2の平均）
    const leftSensors = sensorValues.slice(0, 3);
    const leftValue = leftSensors.length > 0
        ? Math.round((leftSensors.reduce((a: number, b: number) => a + b, 0) / leftSensors.length) * 1023)
        : 0;

    // 中央センサー（3-4の平均）
    const centerSensors = sensorValues.slice(3, 5);
    const centerValue = centerSensors.length > 0
        ? Math.round((centerSensors.reduce((a: number, b: number) => a + b, 0) / centerSensors.length) * 1023)
        : 0;

    // 右側センサー（5-7の平均）
    const rightSensors = sensorValues.slice(5, 8);
    const rightValue = rightSensors.length > 0
        ? Math.round((rightSensors.reduce((a: number, b: number) => a + b, 0) / rightSensors.length) * 1023)
        : 0;

    // ライン検出判定（いずれかのセンサーが黒を検出している）
    const lineDetected = sensorValues.some((v: number) => v === 0);

    return {
        timestamp: firmwareData.timestamp || Date.now(),
        sensors: {
            left: leftValue,
            center: centerValue,
            right: rightValue,
            lineDetected,
        },
        motors: {
            left: {
                speed: Math.min(255, Math.round(firmwareData.motors.left.speed / 257)), // PWM 65535 -> 255
                direction: firmwareData.motors.left.direction || 'forward',
            },
            right: {
                speed: Math.min(255, Math.round(firmwareData.motors.right.speed / 257)),
                direction: firmwareData.motors.right.direction || 'forward',
            },
        },
        status: firmwareData.status || 'running',
    };
}
