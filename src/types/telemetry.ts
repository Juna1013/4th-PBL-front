export interface TelemetryData {
  timestamp: number;
  server_timestamp?: string;
  sensors?: number[];
  sensor_values?: number[];
  motor?: {
    left_speed: number;
    right_speed: number;
  };
  control?: {
    error: number;
    turn: number;
    base_speed: number;
  };
  wifi?: {
    ip: string;
    rssi?: number;
  };
  black_detected?: number;
  sensor_binary?: string;
}

export interface TelemetryStats {
  total_records: number;
  avg_error: number;
  max_left_speed: number;
  max_right_speed: number;
  min_left_speed: number;
  min_right_speed: number;
}
