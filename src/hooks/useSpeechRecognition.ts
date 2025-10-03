import { useState, useRef, useCallback } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiService } from '../services/api';

// 音声録音の状態
export type RecordingState = 'idle' | 'recording' | 'processing' | 'completed' | 'error';

// 音声録音フック
export function useAudioRecording() {
  const [recordingState, setRecordingState] = useState<RecordingState>('idle');
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const durationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 録音開始
  const startRecording = useCallback(async () => {
    try {
      setError(null);
      setRecordingState('recording');
      setRecordingDuration(0);

      // マイクへのアクセスを要求
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 16000, // 音声認識に最適なサンプルレート
        },
      });

      streamRef.current = stream;
      chunksRef.current = [];

      // MediaRecorderを設定
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus', // 広くサポートされている形式
      });

      mediaRecorderRef.current = mediaRecorder;

      // データが利用可能になったときの処理
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      // 録音終了時の処理
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        
        setAudioBlob(blob);
        setAudioURL(url);
        setRecordingState('completed');
        
        // ストリームをクリーンアップ
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
      };

      // 録音開始
      mediaRecorder.start(100); // 100msごとにデータを収集

      // 録音時間のカウンター
      durationIntervalRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 0.1);
      }, 100);

    } catch (err) {
      console.error('録音開始エラー:', err);
      setError(err instanceof Error ? err.message : '録音の開始に失敗しました');
      setRecordingState('error');
    }
  }, []);

  // 録音停止
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
        durationIntervalRef.current = null;
      }
    }
  }, []);

  // 録音リセット
  const resetRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      stopRecording();
    }
    
    if (audioURL) {
      URL.revokeObjectURL(audioURL);
    }
    
    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
      durationIntervalRef.current = null;
    }

    setRecordingState('idle');
    setAudioURL(null);
    setAudioBlob(null);
    setRecordingDuration(0);
    setError(null);
    chunksRef.current = [];
  }, [audioURL, stopRecording]);

  return {
    recordingState,
    audioURL,
    audioBlob,
    recordingDuration,
    error,
    startRecording,
    stopRecording,
    resetRecording,
  };
}

// 音声認識API用のフック
export function useSpeechRecognition() {
  // 音声認識実行
  const predictMutation = useMutation({
    mutationFn: ({ audioFile, options }: {
      audioFile: File;
      options?: { confidenceThreshold?: number; autoExecute?: boolean };
    }) => apiService.speech.predict(audioFile, options),
    onError: (error) => {
      console.error('音声認識エラー:', error);
    },
  });

  // モデル情報取得
  const modelInfoQuery = useQuery({
    queryKey: ['speechModel', 'info'],
    queryFn: () => apiService.speech.getModelInfo(),
    staleTime: 5 * 60 * 1000, // 5分間キャッシュ
  });

  // サポートコマンド取得
  const supportedCommandsQuery = useQuery({
    queryKey: ['speechModel', 'commands'],
    queryFn: () => apiService.speech.getSupportedCommands(),
    staleTime: 5 * 60 * 1000, // 5分間キャッシュ
  });

  const predictSpeech = useCallback(
    (audioFile: File, options?: { confidenceThreshold?: number; autoExecute?: boolean }) => {
      return predictMutation.mutateAsync({ audioFile, options });
    },
    [predictMutation]
  );

  return {
    predictSpeech,
    isPredicting: predictMutation.isPending,
    predictionResult: predictMutation.data,
    predictionError: predictMutation.error,
    resetPrediction: predictMutation.reset,
    
    modelInfo: modelInfoQuery.data,
    isLoadingModelInfo: modelInfoQuery.isLoading,
    modelInfoError: modelInfoQuery.error,
    
    supportedCommands: supportedCommandsQuery.data,
    isLoadingSupportedCommands: supportedCommandsQuery.isLoading,
    supportedCommandsError: supportedCommandsQuery.error,
  };
}

// 音声ファイル変換ユーティリティ
export function convertBlobToFile(blob: Blob, filename: string = 'recording.webm'): File {
  return new File([blob], filename, {
    type: blob.type,
    lastModified: Date.now(),
  });
}

// 音声継続時間チェック
export function isValidAudioDuration(duration: number): boolean {
  return duration >= 0.5 && duration <= 10.0; // 0.5秒〜10秒
}

// マイクアクセス権限チェック
export async function checkMicrophonePermission(): Promise<boolean> {
  try {
    const permissionStatus = await navigator.permissions.query({ name: 'microphone' as PermissionName });
    return permissionStatus.state === 'granted';
  } catch {
    // permissions APIが利用できない場合は、実際にアクセスを試行
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch {
      return false;
    }
  }
}