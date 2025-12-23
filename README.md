# 4年 PBL実験（ライントレースカー）

ライントレースカーのセンサーとモーターの状況をリアルタイムで可視化するデジタルツインシステム。

## Overview

このプロジェクトは、ライントレースカーから送信されるセンサーデータとモーター情報をリアルタイムで受信し、Webブラウザ上で可視化するシステムです。

### 主な機能

- **リアルタイムダッシュボード**: センサー値、モーター出力、統計情報を一目で確認
- **デジタルツイン2D表示**: Canvas APIを使用した車両の可視化
- **データログ**: タイムスタンプ付きログの記録・表示・エクスポート
- **統計情報**: 走行時間、平均速度、センサー反応回数などの集計

## Tech Stack

- **フレームワーク**: Next.js 16 (App Router)
- **言語**: TypeScript
- **スタイリング**: TailwindCSS
- **状態管理**: Zustand
- **デプロイ**: Vercel (予定)

## Setup

### 必要な環境

- Node.js 18.x 以上
- npm または yarn

### インストール

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

### ビルド

```bash
# プロダクションビルド
npm run build

# プロダクションサーバーの起動
npm start
```

## Project Structure

```
web/
├── docs/               # ドキュメント
│   └── design.md      # 設計書
├── src/
│   ├── app/           # Next.js App Router
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/    # Reactコンポーネント
│   │   ├── Header.tsx
│   │   ├── DigitalTwin.tsx
│   │   ├── SensorDisplay.tsx
│   │   ├── MotorDisplay.tsx
│   │   ├── StatisticsDisplay.tsx
│   │   └── DataLog.tsx
│   ├── lib/           # ユーティリティ・ストア
│   │   ├── store.ts
│   │   └── mockData.ts
│   └── types/         # TypeScript型定義
│       └── sensor.ts
└── public/            # 静的ファイル
```

## API

### エンドポイント

#### 1. Ping（接続確認）
```
GET /api/ping
```

#### 2. センサーデータ送信
```
POST /api/sensor
Content-Type: application/json

{
  "timestamp": 1703251200000,
  "sensors": {
    "values": [0, 0, 1, 1, 1, 1, 0, 0],
    "lineDetected": true
  },
  "motors": {
    "left": { "speed": 10000, "direction": "forward" },
    "right": { "speed": 12000, "direction": "forward" }
  },
  "error": -2.5,
  "status": "running"
}
```

#### 3. リアルタイムストリーム（SSE）
```
GET /api/stream
```

### ファームウェア統合

ファームウェアからデータを送信するには、`firmware/pico-w/line_trace_with_api.py`を使用してください。

詳細は [`firmware/pico-w/README_API.md`](../firmware/pico-w/README_API.md) を参照。

## Development Mode

現在、モックデータを使用してUIの動作を確認できます。実際のライントレースカーと接続する場合は、以下の手順が必要です：

1. WebSocket接続の実装
2. API Routesの作成
3. データ受信・パース処理の実装

詳細は `docs/design.md` を参照してください。

## Documentation

- [設計書](./docs/design.md) - システムの詳細設計

## Contribution

このプロジェクトは4th-PBLの一環として開発されています。
