import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, Car, Volume2, Mic } from 'lucide-react';
import SpeechRecognition from '../components/SpeechRecognition';
import { useCommand } from '../hooks/useApi';
import { CommandDisplay } from '../components/CommandDisplay';

export default function SpeechPage() {
  const [lastSentCommand, setLastSentCommand] = useState<string | null>(null);
  const { data: currentCommand, refetch: refetchCommand } = useCommand();

  const handleCommandSent = async (command: string) => {
    setLastSentCommand(command);
    // コマンド送信後に現在のコマンドを再取得
    setTimeout(() => {
      refetchCommand();
    }, 500);
  };

  return (
    <>
      <Head>
        <title>音声認識制御 | ライントレースカー制御システム</title>
        <meta name="description" content="音声コマンドでライントレースカーを制御" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* ヘッダー */}
        <header className="bg-white/80 backdrop-blur-md border-b border-white/30 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
                  <ArrowLeft size={20} />
                  <span>戻る</span>
                </Link>
                <div className="h-6 w-px bg-gray-300"></div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Volume2 size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-800">音声認識制御</h1>
                    <p className="text-sm text-gray-600">音声コマンドでカーを制御</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Car size={20} className="text-gray-600" />
                <span className="text-gray-700 font-medium">ライントレースカー</span>
              </div>
            </div>
          </div>
        </header>

        {/* メインコンテンツ */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 音声認識セクション */}
            <div className="lg:col-span-2">
              <SpeechRecognition 
                onCommandSent={handleCommandSent}
                className="h-fit"
              />

              {/* 使用手順 */}
              <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Mic size={20} className="text-blue-600" />
                  使用手順
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">録音開始</h4>
                      <p className="text-gray-600 text-sm">「音声録音開始」ボタンをクリックして録音を開始します。</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">コマンド発話</h4>
                      <p className="text-gray-600 text-sm">以下のいずれかのコマンドを明瞭に発話してください：</p>
                      <ul className="text-sm text-gray-600 mt-1 ml-4 space-y-1">
                        <li>• <strong>go</strong> - 前進</li>
                        <li>• <strong>right</strong> - 右折</li>
                        <li>• <strong>left</strong> - 左折</li>
                        <li>• <strong>stop</strong> - 停止</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">録音停止・認識実行</h4>
                      <p className="text-gray-600 text-sm">「録音停止」をクリックし、「音声認識実行」ボタンで解析を開始します。</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">結果確認・実行</h4>
                      <p className="text-gray-600 text-sm">認識結果を確認し、信頼度が十分であればコマンドが自動実行されます。</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <h4 className="font-medium text-amber-800 mb-2">📝 録音のコツ</h4>
                  <ul className="text-sm text-amber-700 space-y-1">
                    <li>• 静かな環境で録音してください</li>
                    <li>• マイクに近づいて明瞭に発話してください</li>
                    <li>• 録音時間は1-3秒程度が最適です</li>
                    <li>• ブラウザのマイク許可が必要です</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* サイドバー：現在のコマンド表示 */}
            <div className="space-y-6">
              {/* 現在のコマンド */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">現在のコマンド</h3>
                <CommandDisplay 
                  command={currentCommand?.command || null}
                  timestamp={currentCommand?.timestamp}
                />
              </div>

              {/* 最後に送信したコマンド */}
              {lastSentCommand && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-green-800 mb-2">送信完了</h3>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Car size={20} className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-green-800">{lastSentCommand.toUpperCase()}</p>
                      <p className="text-sm text-green-600">コマンドを送信しました</p>
                    </div>
                  </div>
                </div>
              )}

              {/* システム状態 */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">システム状態</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">音声認識</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-green-600 text-sm font-medium">利用可能</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">API接続</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-600 text-sm font-medium">接続中</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">マイク</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-blue-600 text-sm font-medium">準備完了</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* クイックアクション */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">クイックナビ</h3>
                <div className="space-y-3">
                  <Link 
                    href="/monitor" 
                    className="block w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="font-medium text-gray-800">リアルタイム監視</div>
                    <div className="text-sm text-gray-600">コマンド状況を監視</div>
                  </Link>
                  
                  <Link 
                    href="/logs" 
                    className="block w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="font-medium text-gray-800">実行履歴</div>
                    <div className="text-sm text-gray-600">過去のコマンド履歴</div>
                  </Link>
                  
                  <Link 
                    href="/overview" 
                    className="block w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="font-medium text-gray-800">システム情報</div>
                    <div className="text-sm text-gray-600">構成と詳細情報</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}