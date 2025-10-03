import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Play, Square, RotateCcw, Send, Volume2, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { useAudioRecording, useSpeechRecognition, convertBlobToFile, isValidAudioDuration } from '../hooks/useSpeechRecognition';
import { SpeechPrediction } from '../services/api';

interface SpeechRecognitionProps {
  onCommandSent?: (command: string) => void;
  className?: string;
}

const SpeechRecognition: React.FC<SpeechRecognitionProps> = ({
  onCommandSent,
  className = '',
}) => {
  const [autoExecute, setAutoExecute] = useState(false);
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.7);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const {
    recordingState,
    audioURL,
    audioBlob,
    recordingDuration,
    error: recordingError,
    startRecording,
    stopRecording,
    resetRecording,
  } = useAudioRecording();

  const {
    predictSpeech,
    isPredicting,
    predictionResult,
    predictionError,
    resetPrediction,
    supportedCommands,
  } = useSpeechRecognition();

  // 録音完了時に自動で音声認識を実行
  useEffect(() => {
    if (recordingState === 'completed' && audioBlob && autoExecute) {
      handlePredict();
    }
  }, [recordingState, audioBlob, autoExecute]);

  // 音声認識実行
  const handlePredict = async () => {
    if (!audioBlob) return;

    try {
      const audioFile = convertBlobToFile(audioBlob);
      const result = await predictSpeech(audioFile, {
        confidenceThreshold,
        autoExecute: false, // フロントエンドから手動制御
      });

      if (result.success && result.predicted_command && onCommandSent) {
        onCommandSent(result.predicted_command);
      }
    } catch (error) {
      console.error('音声認識エラー:', error);
    }
  };

  // 録音時間の表示フォーマット
  const formatDuration = (seconds: number): string => {
    return `${seconds.toFixed(1)}s`;
  };

  // 信頼度のカラークラス
  const getConfidenceColor = (confidence?: number): string => {
    if (!confidence) return 'text-gray-500';
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Volume2 size={24} className="text-blue-600" />
          音声認識制御
        </h2>
        
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          <Info size={16} />
          {showAdvanced ? '簡易表示' : '詳細設定'}
        </button>
      </div>

      {/* サポートコマンド表示 */}
      {supportedCommands?.success && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800 mb-2">サポートコマンド:</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {Object.entries(supportedCommands.commands_info?.command_mapping || {}).map(([cmd, desc]) => (
              <div key={cmd} className="text-blue-700">
                <span className="font-mono bg-blue-100 px-2 py-1 rounded">{cmd}</span>
                <span className="ml-2">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 詳細設定 */}
      {showAdvanced && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-3">設定</h3>
          
          <div className="space-y-4">
            {/* 信頼度閾値 */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                信頼度閾値: {confidenceThreshold}
              </label>
              <input
                type="range"
                min="0.5"
                max="0.95"
                step="0.05"
                value={confidenceThreshold}
                onChange={(e) => setConfidenceThreshold(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0.5 (低)</span>
                <span>0.95 (高)</span>
              </div>
            </div>

            {/* 自動実行 */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="autoExecute"
                checked={autoExecute}
                onChange={(e) => setAutoExecute(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="autoExecute" className="text-sm text-gray-600">
                録音完了時に自動で音声認識を実行
              </label>
            </div>
          </div>
        </div>
      )}

      {/* 録音コントロール */}
      <div className="space-y-4">
        {/* 録音ボタン */}
        <div className="flex items-center justify-center">
          {recordingState === 'idle' || recordingState === 'completed' ? (
            <button
              onClick={startRecording}
              className="flex items-center gap-3 px-6 py-4 bg-red-600 hover:bg-red-700 text-white rounded-full font-medium transition-colors"
              disabled={isPredicting}
            >
              <Mic size={24} />
              音声録音開始
            </button>
          ) : recordingState === 'recording' ? (
            <button
              onClick={stopRecording}
              className="flex items-center gap-3 px-6 py-4 bg-gray-600 hover:bg-gray-700 text-white rounded-full font-medium transition-colors animate-pulse"
            >
              <Square size={24} />
              録音停止 ({formatDuration(recordingDuration)})
            </button>
          ) : null}
        </div>

        {/* 録音状態表示 */}
        {recordingState === 'recording' && (
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-red-600">
              <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
              <span className="font-medium">録音中... {formatDuration(recordingDuration)}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              コマンドを明確に発話してください
            </p>
          </div>
        )}

        {/* エラー表示 */}
        {(recordingError || predictionError) && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <AlertCircle size={20} />
            <span>{recordingError || (predictionError as Error)?.message}</span>
          </div>
        )}

        {/* 録音完了時のコントロール */}
        {recordingState === 'completed' && audioURL && (
          <div className="space-y-4">
            {/* 音声プレビュー */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4 mb-3">
                <span className="text-sm font-medium text-gray-700">録音された音声:</span>
                <span className="text-sm text-gray-500">
                  {formatDuration(recordingDuration)}
                  {!isValidAudioDuration(recordingDuration) && (
                    <span className="text-red-500 ml-2">
                      (推奨: 0.5-10秒)
                    </span>
                  )}
                </span>
              </div>
              
              <audio controls className="w-full mb-3">
                <source src={audioURL} type="audio/webm" />
                お使いのブラウザは音声再生をサポートしていません。
              </audio>

              <div className="flex gap-2">
                <button
                  onClick={handlePredict}
                  disabled={isPredicting}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50 transition-colors"
                >
                  {isPredicting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      認識中...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      音声認識実行
                    </>
                  )}
                </button>
                
                <button
                  onClick={resetRecording}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                >
                  <RotateCcw size={16} />
                  リセット
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 音声認識結果 */}
        {predictionResult && (
          <div className="space-y-4">
            {predictionResult.success ? (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle size={20} className="text-green-600" />
                  <span className="font-medium text-green-800">認識結果</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-green-800">
                      コマンド: {predictionResult.predicted_command}
                    </span>
                    <span className={`font-medium ${getConfidenceColor(predictionResult.confidence)}`}>
                      信頼度: {predictionResult.confidence_percentage}
                    </span>
                  </div>
                  
                  {predictionResult.is_confident !== undefined && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">判定:</span>
                      <span className={`text-sm font-medium ${predictionResult.is_confident ? 'text-green-600' : 'text-yellow-600'}`}>
                        {predictionResult.is_confident ? '信頼度高' : '信頼度低'}
                      </span>
                    </div>
                  )}

                  {predictionResult.all_predictions && showAdvanced && (
                    <div className="mt-3 pt-3 border-t border-green-200">
                      <span className="text-sm font-medium text-green-800 block mb-2">
                        全ての予測結果:
                      </span>
                      <div className="space-y-1">
                        {predictionResult.all_predictions.map((pred, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="font-mono">{pred.command}</span>
                            <span className={getConfidenceColor(pred.confidence)}>
                              {pred.percentage}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertCircle size={20} className="text-red-600" />
                  <span className="font-medium text-red-800">認識エラー</span>
                </div>
                <p className="text-red-700 mt-2">{predictionResult.error}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 使用方法のヒント */}
      {supportedCommands?.success && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">使用のヒント:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {supportedCommands.commands_info?.usage_notes?.map((note, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">•</span>
                {note}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SpeechRecognition;