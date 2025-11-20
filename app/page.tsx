'use client';

import { useState, useEffect, useRef } from 'react';

interface RecognitionResult {
  command: string;
  confidence: number;
  timestamp: string;
}

interface ServerStatus {
  isConnected: boolean;
  lastUpdate: string;
  error?: string;
}

const COMMANDS = ['前進', '後退', '左折', '右折', '停止', 'スタート'];
const COMMAND_COLORS: Record<string, string> = {
  '前進': 'from-blue-500 to-blue-600',
  '後退': 'from-yellow-500 to-yellow-600',
  '左折': 'from-red-500 to-red-600',
  '右折': 'from-green-500 to-green-600',
  '停止': 'from-gray-500 to-gray-600',
  'スタート': 'from-purple-500 to-purple-600',
};

export default function VoiceRecognitionDashboard() {
  const [recognition, setRecognition] = useState<RecognitionResult | null>(null);
  const [history, setHistory] = useState<RecognitionResult[]>([]);
  const [serverStatus, setServerStatus] = useState<ServerStatus>({
    isConnected: false,
    lastUpdate: '',
  });
  const [isListening, setIsListening] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // サーバー接続確認
  useEffect(() => {
    const checkServerConnection = async () => {
      try {
        const response = await fetch('http://localhost:8000/health', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        }).catch(() => null);

        if (response?.ok) {
          setServerStatus({
            isConnected: true,
            lastUpdate: new Date().toLocaleTimeString('ja-JP'),
          });
        } else {
          setServerStatus({
            isConnected: false,
            lastUpdate: new Date().toLocaleTimeString('ja-JP'),
            error: 'サーバーに接続できません',
          });
        }
      } catch (error) {
        setServerStatus({
          isConnected: false,
          lastUpdate: new Date().toLocaleTimeString('ja-JP'),
          error: 'サーバー接続エラー',
        });
      }
    };

    checkServerConnection();
    const interval = setInterval(checkServerConnection, 5000);
    return () => clearInterval(interval);
  }, []);

  // マイクアクセス
  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      setIsListening(true);

      // 音量レベルの監視
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyserRef.current = analyser;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateLevel = () => {
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        setAudioLevel(Math.min(100, (average / 255) * 100));

        if (isListening) {
          requestAnimationFrame(updateLevel);
        }
      };
      updateLevel();
    } catch (error) {
      console.error('マイクアクセスエラー:', error);
      alert('マイクへのアクセスが拒否されました');
    }
  };

  const stopListening = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setIsListening(false);
    setAudioLevel(0);
  };

  // テスト用に音声認識結果をシミュレート
  const simulateRecognition = (command: string) => {
    const confidence = Math.random() * 0.2 + 0.8; // 0.8 ~ 1.0
    const result: RecognitionResult = {
      command,
      confidence,
      timestamp: new Date().toLocaleTimeString('ja-JP'),
    };
    setRecognition(result);
    setHistory([result, ...history.slice(0, 9)]);
  };

  // ファイルアップロード
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('audio', file);

    try {
      const response = await fetch('http://localhost:8000/recognize', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('認識失敗');

      const data = await response.json();
      const result: RecognitionResult = {
        command: data.command,
        confidence: data.confidence,
        timestamp: new Date().toLocaleTimeString('ja-JP'),
      };
      setRecognition(result);
      setHistory([result, ...history.slice(0, 9)]);
    } catch (error) {
      console.error('音声認識エラー:', error);
      alert('音声認識に失敗しました');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* ヘッダー */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">🎤 音声認識ダッシュボード</h1>
          <p className="text-slate-400">Raspberry Pi Pico W 音声認識システム</p>
        </header>

        {/* ステータスバー */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`rounded-lg p-4 border-2 ${
            serverStatus.isConnected
              ? 'border-green-500 bg-green-500/10'
              : 'border-red-500 bg-red-500/10'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full ${
                serverStatus.isConnected ? 'bg-green-500' : 'bg-red-500'
              } animate-pulse`}></div>
              <div>
                <p className="text-sm text-slate-400">サーバー状態</p>
                <p className="text-lg font-semibold text-white">
                  {serverStatus.isConnected ? '接続済み' : '未接続'}
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-2">最終確認: {serverStatus.lastUpdate}</p>
          </div>

          <div className="rounded-lg p-4 border-2 border-blue-500 bg-blue-500/10">
            <p className="text-sm text-slate-400 mb-2">最新認識結果</p>
            {recognition ? (
              <div>
                <p className="text-2xl font-bold text-white">{recognition.command}</p>
                <p className="text-sm text-slate-400">信頼度: {(recognition.confidence * 100).toFixed(1)}%</p>
              </div>
            ) : (
              <p className="text-slate-500">未認識</p>
            )}
          </div>
        </div>

        {/* メインディスプレイ */}
        <div className="mb-8 rounded-lg border-2 border-slate-700 bg-slate-800/50 p-8">
          {recognition ? (
            <div className="text-center">
              <div className={`inline-block bg-gradient-to-r ${
                COMMAND_COLORS[recognition.command] || 'from-slate-500 to-slate-600'
              } rounded-full p-8 mb-6`}>
                <p className="text-6xl font-bold text-white">{recognition.command}</p>
              </div>
              <p className="text-3xl font-bold text-slate-300 mb-4">
                信頼度: {(recognition.confidence * 100).toFixed(1)}%
              </p>
              <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full transition-all duration-300"
                  style={{ width: `${recognition.confidence * 100}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-2xl text-slate-400">音声を入力してください</p>
              <p className="text-slate-500 mt-2">マイクからの入力またはファイルアップロード</p>
            </div>
          )}
        </div>

        {/* オーディオレベル表示 */}
        {isListening && (
          <div className="mb-8 rounded-lg border-2 border-yellow-500 bg-yellow-500/10 p-4">
            <p className="text-sm text-slate-400 mb-3">マイク入力レベル</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-slate-700 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 h-full transition-all duration-100"
                  style={{ width: `${audioLevel}%` }}
                ></div>
              </div>
              <span className="text-white font-semibold w-12 text-right">{Math.round(audioLevel)}%</span>
            </div>
          </div>
        )}

        {/* コントロール */}
        <div className="mb-8 rounded-lg border-2 border-slate-700 bg-slate-800/50 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">コントロール</h2>
          
          <div className="space-y-4">
            {/* マイク入力 */}
            <div>
              <p className="text-sm text-slate-400 mb-2">マイク入力</p>
              <button
                onClick={isListening ? stopListening : startListening}
                className={`w-full py-3 rounded-lg font-semibold text-white transition-colors ${
                  isListening
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isListening ? '🛑 停止' : '🎤 マイク入力開始'}
              </button>
            </div>

            {/* ファイルアップロード */}
            <div>
              <p className="text-sm text-slate-400 mb-2">ファイルアップロード</p>
              <label className="w-full block">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <span className="w-full py-3 rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors block text-center cursor-pointer">
                  📁 音声ファイルを選択
                </span>
              </label>
            </div>

            {/* テスト用コマンド */}
            <div>
              <p className="text-sm text-slate-400 mb-2">テストコマンド</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {COMMANDS.map(cmd => (
                  <button
                    key={cmd}
                    onClick={() => simulateRecognition(cmd)}
                    className={`py-2 rounded-lg font-semibold text-white bg-gradient-to-r ${
                      COMMAND_COLORS[cmd]
                    } hover:shadow-lg transition-shadow`}
                  >
                    {cmd}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 認識履歴 */}
        <div className="rounded-lg border-2 border-slate-700 bg-slate-800/50 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">認識履歴</h2>
          {history.length > 0 ? (
            <div className="space-y-2">
              {history.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-700/50 border border-slate-600">
                  <div>
                    <p className="font-semibold text-white">{item.command}</p>
                    <p className="text-xs text-slate-400">{item.timestamp}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-blue-400">
                      {(item.confidence * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-center py-6">履歴がありません</p>
          )}
        </div>
      </div>
    </div>
  );
}
