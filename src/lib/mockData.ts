import { SensorData } from '@/types/sensor';

/**
 * モックセンサーデータを生成する
 */
export function generateMockSensorData(): SensorData {
    const baseSpeed = 150 + Math.random() * 50;
    const variation = (Math.random() - 0.5) * 30;

    return {
        timestamp: Date.now(),
        sensors: {
            left: Math.floor(Math.random() * 1024),
            center: Math.floor(Math.random() * 1024),
            right: Math.floor(Math.random() * 1024),
            lineDetected: Math.random() > 0.3,
        },
        motors: {
            left: {
                speed: Math.floor(Math.max(0, Math.min(255, baseSpeed + variation))),
                direction: Math.random() > 0.9 ? 'backward' : 'forward',
            },
            right: {
                speed: Math.floor(Math.max(0, Math.min(255, baseSpeed - variation))),
                direction: Math.random() > 0.9 ? 'backward' : 'forward',
            },
        },
        position: {
            x: Math.random() * 100,
            y: Math.random() * 100,
            heading: Math.random() * 360,
        },
        battery: 50 + Math.random() * 50,
        status: Math.random() > 0.95 ? 'error' : Math.random() > 0.1 ? 'running' : 'stopped',
    };
}

/**
 * モックデータストリームを開始する
 */
export function startMockDataStream(
    callback: (data: SensorData) => void,
    interval: number = 500
): () => void {
    const intervalId = setInterval(() => {
        callback(generateMockSensorData());
    }, interval);

    return () => clearInterval(intervalId);
}
