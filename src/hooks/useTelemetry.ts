'use client';

import { useEffect, useState } from 'react';
import { TelemetryData } from '@/types/telemetry';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export function useTelemetry(intervalMs: number = 500) {
    const [data, setData] = useState<TelemetryData | null>(null);
    const [dataCount, setDataCount] = useState(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLatestData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/telemetry/latest`);
                if (response.ok) {
                    const latestData = await response.json();
                    setData(latestData);
                    setDataCount((prev) => prev + 1);
                    setError(null);
                } else if (response.status === 404) {
                    // データがまだない場合
                    setError('データ待機中...');
                }
            } catch (err) {
                setError('データ取得エラー');
                console.error('データ取得エラー:', err);
            }
        };

        // 初回取得
        fetchLatestData();

        // 定期的に取得
        const interval = setInterval(fetchLatestData, intervalMs);

        return () => clearInterval(interval);
    }, [intervalMs]);

    return { data, dataCount, error };
}
