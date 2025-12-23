// センサーデータの型定義

export interface SensorData {
  timestamp: number; // Unix timestamp (ms)
  sensors: {
    left: number; // 0-1023 (アナログ値)
    center: number;
    right: number;
    lineDetected: boolean; // ライン検出フラグ
  };
  motors: {
    left: {
      speed: number; // 0-255 (PWM値)
      direction: 'forward' | 'backward' | 'stop';
    };
    right: {
      speed: number;
      direction: 'forward' | 'backward' | 'stop';
    };
  };
  position?: {
    x: number; // 推定位置（オプション）
    y: number;
    heading: number; // 方向（度）
  };
  battery?: number; // バッテリー残量（オプション）
  status: 'running' | 'stopped' | 'error';
}

export interface LogEntry {
  id: string;
  timestamp: number;
  data: SensorData;
  eventType: 'normal' | 'warning' | 'error';
  message?: string;
}

export interface ConnectionStatus {
  connected: boolean;
  lastUpdate: number;
  reconnectAttempts: number;
}

export interface Statistics {
  runningTime: number; // ミリ秒
  averageSpeed: number;
  sensorReactions: number;
  errorCount: number;
}
