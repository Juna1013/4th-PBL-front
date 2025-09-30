import React from 'react';
import { Car, Github, ExternalLink, AlertTriangle } from 'lucide-react';
import { CommandDisplay } from './components/CommandDisplay';
import { TestControls } from './components/TestControl';
import { LogsList } from './components/LogsList';
import { useHealthCheck } from './hooks/useApi';

function App() {
  const { isError: healthError } = useHealthCheck();

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* API接続エラー時のグローバル通知 */}
      {healthError && (
        <div className="notification-bar">
          <AlertTriangle size={16} />
          <span>
            デモモード: APIサーバーに接続できません（本番環境では正常動作）
          </span>
        </div>
      )}

      {/* ヘッダー */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <div className="logo-icon">
                <Car size={24} />
              </div>
              <div>
                <h1 className="title">
                  ライントレースカー制御システム
                </h1>
                <p className="subtitle">
                  FastAPI + React による音声認識制御システム
                </p>
              </div>
            </div>
            
            <div className="nav-links">
              <a
                href={import.meta.env.VITE_API_URL?.replace('/api', '/docs') || 'http://localhost:8000/docs'}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                <ExternalLink size={16} />
                API Docs
              </a>

              <a
                href="https://github.com/your-username/line-tracer-control"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
              >
                <Github size={16} />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="main-content">
        <div className="container">
          {/* システム概要カード */}
          <div className="card">
            <div className="feature-grid">
              <div className="feature-item">
                <div className="feature-icon mic">
                  <span>🎤</span>
                </div>
                <h3 className="feature-title">音声認識</h3>
                <p className="feature-desc">
                  Colab の FastAPI が音声を処理
                </p>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon web">
                  <span>🌐</span>
                </div>
                <h3 className="feature-title">Web API</h3>
                <p className="feature-desc">
                  Render でホストされた API サーバー
                </p>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon car">
                  <span>🚗</span>
                </div>
                <h3 className="feature-title">Pico W</h3>
                <p className="feature-desc">
                  最新コマンドを取得して制御
                </p>
              </div>
            </div>
          </div>

          {/* 最新コマンド表示 */}
          <CommandDisplay />

          {/* テストコントロール */}
          <TestControls />

          {/* ログと統計 */}
          <LogsList />
        </div>
      </main>

      {/* フッター */}
      <footer className="footer">
        <div className="container">
          <p>
            © 2025 Line Tracer Control System - Built with FastAPI & React
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
