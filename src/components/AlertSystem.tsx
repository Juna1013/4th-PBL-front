'use client';

import { useSensorStore } from '@/lib/store';
import { useEffect, useState } from 'react';

interface Alert {
    id: string;
    type: 'info' | 'warning' | 'error' | 'success';
    title: string;
    message: string;
    timestamp: number;
}

export default function AlertSystem() {
    const currentData = useSensorStore((state) => state.currentData);
    const connectionStatus = useSensorStore((state) => state.connectionStatus);
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [showAlerts, setShowAlerts] = useState(true);

    // アラート追加関数
    const addAlert = (type: Alert['type'], title: string, message: string) => {
        const newAlert: Alert = {
            id: `${Date.now()}-${Math.random()}`,
            type,
            title,
            message,
            timestamp: Date.now(),
        };

        setAlerts((prev) => [...prev, newAlert]);

        // 5秒後に自動削除
        setTimeout(() => {
            setAlerts((prev) => prev.filter((alert) => alert.id !== newAlert.id));
        }, 5000);
    };

    // 接続切断の監視
    useEffect(() => {
        if (!connectionStatus.connected && connectionStatus.lastUpdate > 0) {
            addAlert('error', '接続切断', 'ライントレースカーとの接続が切断されました');
        }
    }, [connectionStatus.connected]);

    // 異常値の検出
    useEffect(() => {
        if (!currentData) return;

        // モーター停止の検出
        if (
            currentData.motors.left.speed === 0 &&
            currentData.motors.right.speed === 0 &&
            currentData.status === 'running'
        ) {
            addAlert('warning', 'モーター停止', '両方のモーターが停止しています');
        }

        // センサー異常値の検出（全てのセンサーが最大値または最小値）
        const { left, center, right } = currentData.sensors;
        if ((left === 0 && center === 0 && right === 0) ||
            (left === 1023 && center === 1023 && right === 1023)) {
            addAlert('warning', 'センサー異常', 'センサー値が異常な範囲にあります');
        }

        // エラーステータスの検出
        if (currentData.status === 'error') {
            addAlert('error', 'システムエラー', 'ライントレースカーでエラーが発生しました');
        }

        // バッテリー低下の検出（オプション）
        if (currentData.battery !== undefined && currentData.battery < 20) {
            addAlert('warning', 'バッテリー低下', `バッテリー残量: ${currentData.battery}%`);
        }
    }, [currentData]);

    // 再接続成功の通知
    useEffect(() => {
        if (connectionStatus.connected && connectionStatus.reconnectAttempts > 0) {
            addAlert('success', '再接続成功', 'ライントレースカーとの接続が復旧しました');
        }
    }, [connectionStatus.connected, connectionStatus.reconnectAttempts]);

    const getAlertIcon = (type: Alert['type']) => {
        switch (type) {
            case 'error':
                return (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                        />
                    </svg>
                );
            case 'warning':
                return (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                );
            case 'success':
                return (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                        />
                    </svg>
                );
            default:
                return (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                        />
                    </svg>
                );
        }
    };

    const getAlertColor = (type: Alert['type']) => {
        switch (type) {
            case 'error':
                return 'bg-red-50 border-red-200 text-red-800';
            case 'warning':
                return 'bg-yellow-50 border-yellow-200 text-yellow-800';
            case 'success':
                return 'bg-green-50 border-green-200 text-green-800';
            default:
                return 'bg-blue-50 border-blue-200 text-blue-800';
        }
    };

    const removeAlert = (id: string) => {
        setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    };

    if (!showAlerts || alerts.length === 0) {
        return null;
    }

    return (
        <div className="fixed top-20 right-6 z-50 space-y-2 max-w-md">
            {alerts.map((alert) => (
                <div
                    key={alert.id}
                    className={`${getAlertColor(
                        alert.type
                    )} border rounded-lg shadow-lg p-4 animate-slide-in-right`}
                >
                    <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">{getAlertIcon(alert.type)}</div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-sm">{alert.title}</h3>
                            <p className="text-xs mt-1 opacity-90">{alert.message}</p>
                            <p className="text-xs mt-1 opacity-75">
                                {new Date(alert.timestamp).toLocaleTimeString('ja-JP')}
                            </p>
                        </div>
                        <button
                            onClick={() => removeAlert(alert.id)}
                            className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
