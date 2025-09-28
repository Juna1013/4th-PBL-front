import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Axios インスタンス作成
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// レスポンスインターセプター（エラーハンドリング）
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// タイプ定義
export interface LogEntry {
  id: number;
  word: string;
  timestamp: string;
}

export interface CommandResponse {
  command: string | null;
  timestamp: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  total?: number;
}

export interface StatsResponse {
  total_commands: number;
  last_command: string | null;
  command_counts: Record<string, number>;
  last_update: string | null;
}

// API サービス
const apiService = {
  // 最新コマンドを取得
  async getCommand(): Promise<CommandResponse> {
    const response = await apiClient.get<CommandResponse>('/command');
    return response.data;
  },

  // 新しいコマンドを送信
  async sendCommand(word: string): Promise<LogEntry> {
    const response = await apiClient.post<ApiResponse<LogEntry>>('/log', { word });
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to send command');
    }
    return {
      id: response.data.data!.id,
      word: response.data.data!.word,
      timestamp: response.data.data!.timestamp
    };
  },

  // ログ一覧を取得
  async getLogs(limit: number = 20): Promise<LogEntry[]> {
    const response = await apiClient.get<ApiResponse<LogEntry[]>>(`/logs?limit=${limit}`);
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to get logs');
    }
    return response.data.data || [];
  },

  // 統計情報を取得
  async getStats(): Promise<StatsResponse> {
    const response = await apiClient.get<ApiResponse<StatsResponse>>('/stats');
    if (!response.data.success) {
      throw new Error(response.data.error || 'Failed to get stats');
    }
    return response.data.data!;
  },

  // ヘルスチェック
  async healthCheck(): Promise<{ status: string }> {
    const response = await apiClient.get('/health');
    return response.data;
  }
};

export { apiService };
