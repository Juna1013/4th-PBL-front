import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

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

// 音声認識関連のタイプ定義
export interface SpeechPrediction {
  command: string;
  confidence: number;
  percentage: string;
}

export interface SpeechPredictionResponse {
  success: boolean;
  predicted_command?: string;
  confidence?: number;
  confidence_percentage?: string;
  is_confident?: boolean;
  threshold_used?: number;
  all_predictions?: SpeechPrediction[];
  auto_executed?: boolean;
  message?: string;
  error?: string;
  timestamp: string;
}

export interface ModelInfoResponse {
  success: boolean;
  model_info?: {
    status: string;
    model_path: string;
    input_shape: string;
    output_shape: string;
    commands: string[];
    sample_rate: number;
    audio_length: number;
  };
  error?: string;
  timestamp: string;
}

export interface SupportedCommandsResponse {
  success: boolean;
  commands_info?: {
    supported_commands: string[];
    command_mapping: Record<string, string>;
    usage_notes: string[];
  };
  error?: string;
  timestamp: string;
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
  },

  // 音声認識関連のAPI
  speech: {
    // 音声ファイルから音声認識を実行
    async predict(
      audioFile: File,
      options: {
        confidenceThreshold?: number;
        autoExecute?: boolean;
      } = {}
    ): Promise<SpeechPredictionResponse> {
      const formData = new FormData();
      formData.append('audio_file', audioFile);
      
      if (options.confidenceThreshold !== undefined) {
        formData.append('confidence_threshold', options.confidenceThreshold.toString());
      }
      
      if (options.autoExecute !== undefined) {
        formData.append('auto_execute', options.autoExecute.toString());
      }

      const response = await axios.post<SpeechPredictionResponse>(
        `${API_BASE_URL}/speech/predict`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 30000, // 音声処理のため長めのタイムアウト
        }
      );
      
      return response.data;
    },

    // モデル情報を取得
    async getModelInfo(): Promise<ModelInfoResponse> {
      const response = await apiClient.get<ModelInfoResponse>('/speech/model/info');
      return response.data;
    },

    // サポートされているコマンド一覧を取得
    async getSupportedCommands(): Promise<SupportedCommandsResponse> {
      const response = await apiClient.get<SupportedCommandsResponse>('/speech/commands');
      return response.data;
    },

    // 音声認識機能のテスト
    async test(): Promise<{ success: boolean; test_result?: Record<string, unknown>; error?: string }> {
      const response = await apiClient.post('/speech/test');
      return response.data;
    }
  }
};

export { apiService };
