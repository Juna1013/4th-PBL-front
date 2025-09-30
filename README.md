# Line Tracer Control System - Next.js Frontend

**ライントレースカー制御システム** のフロントエンドアプリケーションです。

## 📋 概要

FastAPI + React + Next.js による音声認識制御システムのWebインターフェースです。

### 機能

- 🎤 **音声認識制御**: Google Colab の FastAPI が音声を処理
- 🌐 **リアルタイム API 通信**: Render でホストされた API サーバーとの通信
- 🚗 **Pico W 制御**: 最新コマンドを取得してライントレースカーを制御
- 📊 **統計表示**: コマンド履歴とシステム統計の表示

## 🚀 セットアップ

### 必要な環境

- Node.js 18.0以上
- npm または yarn

### インストール

```bash
npm install
```

### 開発サーバー起動

```bash
npm run dev
```

アプリケーションは [http://localhost:5173](http://localhost:5173) で起動します。

### ビルド

```bash
npm run build
```

### 本番サーバー起動

```bash
npm start
```

## 🛠 技術スタック

- **Next.js 15** (Pages Router): React フレームワーク
- **TypeScript**: 型安全なJavaScript
- **TailwindCSS 3.4**: ユーティリティファーストCSS フレームワーク
- **React Query**: サーバー状態管理
- **Axios**: HTTP クライアント
- **Lucide React**: アイコンライブラリ
- **PostCSS**: CSS後処理ツール

## 📁 プロジェクト構造

```
web/
├── src/                       # すべてのソースコード
│   ├── pages/                 # Next.js Pages Router
│   │   ├── _app.tsx          # アプリケーションルート
│   │   ├── _document.tsx     # HTMLドキュメント設定
│   │   └── index.tsx         # ホームページ
│   ├── components/           # Reactコンポーネント
│   │   ├── CommandDisplay.tsx # コマンド表示
│   │   ├── TestControl.tsx   # テストコントロール
│   │   └── LogsList.tsx      # ログ一覧
│   ├── hooks/                # カスタムフック
│   │   └── useApi.ts         # API関連フック
│   ├── services/             # API サービス
│   │   └── api.ts            # API クライアント
│   ├── styles/               # スタイルファイル
│   │   └── globals.css       # グローバルスタイル
│   └── providers.tsx         # React Query プロバイダー
├── public/                   # 静的ファイル
├── migration-backup/         # Viteマイグレーション用バックアップ
├── package.json              # プロジェクト設定
├── next.config.js            # Next.js設定
└── tsconfig.json             # TypeScript設定
```

## 🌍 環境変数

### 開発環境 (`.env.development`)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### 本番環境 (`.env.production`)
```env
NEXT_PUBLIC_API_URL=https://your-render-app.onrender.com/api
```

## 📝 API エンドポイント

| エンドポイント | 説明 |
|----------------|------|
| `GET /health` | ヘルスチェック |
| `GET /command` | 最新コマンド取得 |
| `GET /logs` | コマンド履歴取得 |
| `GET /stats` | システム統計取得 |
| `POST /command` | テストコマンド送信 |

## 🔧 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# 本番サーバー起動 
npm start

# リンター実行
npm run lint
```

## 📱 レスポンシブ対応

- デスクトップ、タブレット、モバイルに対応
- モダンブラウザサポート (Chrome, Firefox, Safari, Edge)

## 🔄 Vite → Next.js マイグレーション履歴

2025年1月: Viteプロジェクトから Next.js へマイグレーション完了

### 主な変更点
- Vite → Next.js Pages Router へ移行
- `import.meta.env` → `process.env.NEXT_PUBLIC_*` へ更新
- ESLint設定を Next.js用に更新
- TypeScript設定を Next.js用に最適化
- appディレクトリとsrcディレクトリをsrcに統一
- Pages Router構造へ再編成 (_app.tsx, _document.tsx, index.tsx)
- CSS ファイルを統合・整理（App.css, globals.css, index.css → styles/globals.css）
- **TailwindCSS 3.4** を導入してモダンなUI設計を実現