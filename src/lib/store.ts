import { create } from 'zustand';
import { SensorData, LogEntry, ConnectionStatus, Statistics } from '@/types/sensor';

interface SensorStore {
    // 現在のセンサーデータ
    currentData: SensorData | null;

    // ログエントリ（最大1000件）
    logs: LogEntry[];

    // 接続状態
    connectionStatus: ConnectionStatus;

    // 統計情報
    statistics: Statistics;

    // アクション
    updateSensorData: (data: SensorData) => void;
    addLog: (log: LogEntry) => void;
    setConnectionStatus: (status: Partial<ConnectionStatus>) => void;
    updateStatistics: (stats: Partial<Statistics>) => void;
    clearLogs: () => void;
    resetStatistics: () => void;
}

const MAX_LOGS = 1000;

export const useSensorStore = create<SensorStore>((set) => ({
    currentData: null,
    logs: [],
    connectionStatus: {
        connected: false,
        lastUpdate: 0,
        reconnectAttempts: 0,
    },
    statistics: {
        runningTime: 0,
        averageSpeed: 0,
        sensorReactions: 0,
        errorCount: 0,
    },

    updateSensorData: (data) =>
        set((state) => {
            // ログエントリを作成
            const logEntry: LogEntry = {
                id: `${Date.now()}-${Math.random()}`,
                timestamp: data.timestamp,
                data,
                eventType: data.status === 'error' ? 'error' : 'normal',
            };

            // 最大ログ数を超えた場合は古いものから削除
            const newLogs = [...state.logs, logEntry];
            if (newLogs.length > MAX_LOGS) {
                newLogs.shift();
            }

            return {
                currentData: data,
                logs: newLogs,
                connectionStatus: {
                    ...state.connectionStatus,
                    connected: true,
                    lastUpdate: Date.now(),
                },
            };
        }),

    addLog: (log) =>
        set((state) => {
            const newLogs = [...state.logs, log];
            if (newLogs.length > MAX_LOGS) {
                newLogs.shift();
            }
            return { logs: newLogs };
        }),

    setConnectionStatus: (status) =>
        set((state) => ({
            connectionStatus: { ...state.connectionStatus, ...status },
        })),

    updateStatistics: (stats) =>
        set((state) => ({
            statistics: { ...state.statistics, ...stats },
        })),

    clearLogs: () => set({ logs: [] }),

    resetStatistics: () =>
        set({
            statistics: {
                runningTime: 0,
                averageSpeed: 0,
                sensorReactions: 0,
                errorCount: 0,
            },
        }),
}));
