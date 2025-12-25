# 4th-PBL Web Frontend

ライントレースカーのテレメトリデータをリアルタイムで可視化するNext.jsアプリケーション。

## 📋 概要

Raspberry Pi Pico Wから送信されるセンサーデータとモーター情報をリアルタイムで受信し、Webブラウザ上で可視化するシステムです。**Next.jsのみで完結**し、バックエンドサーバー（FastAPI等）は不要です。

### ✨ 主な機能

- **テレメトリダッシュボード**: センサー値、モーター速度、制御パラメータをリアルタイム表示
- **8chセンサーグリッド**: ラインセンサーの状態を視覚的に表示
- **モーター速度バー**: 左右モーターの速度をバー表示
- **統計情報**: 平均エラー値、最大速度、稼働時間などを自動計算
- **データ管理**: 履歴保存（最新100件）、エクスポート、クリア機能
- **API Routes**: Next.js内蔵のサーバーサイド機能でデータ受信

---

## 🛠️ 技術スタック

### フロントエンド
- **Next.js 16** (App Router)
- **TypeScript** - 型安全性
- **Tailwind CSS** - スタイリング
- **React Hooks** - 状態管理

### バックエンド（Next.js API Routes）
- **Next.js API Routes** - サーバーサイドAPI
- **TypeScript** - 型安全なAPI実装
- **シングルトンストア** - メモリ内データ管理

### デプロイ
- **Vercel** - 簡単デプロイ対応

---

## 🚀 セットアップ

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

ブラウザで以下のURLにアクセス:
- **ダッシュボード**: http://localhost:3000/telemetry
- **ホーム**: http://localhost:3000

### ビルド

```bash
# プロダクションビルド
npm run build

# プロダクションサーバーの起動
npm start
```

---

## 📁 プロジェクト構造

```
web/
├── docs/                      # ドキュメント
│   └── design.md             # 設計書
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── layout.tsx        # レイアウト
│   │   ├── page.tsx          # ホームページ
│   │   ├── telemetry/
│   │   │   └── page.tsx      # テレメトリダッシュボード
│   │   └── api/              # API Routes（サーバーサイド）
│   │       ├── ping/
│   │       │   └── route.ts  # ヘルスチェック
│   │       └── telemetry/
│   │           ├── route.ts          # データ受信・履歴取得
│   │           ├── latest/route.ts   # 最新データ取得
│   │           ├── stats/route.ts    # 統計情報
│   │           ├── export/route.ts   # データエクスポート
│   │           └── clear/route.ts    # 履歴クリア
│   ├── components/           # Reactコンポーネント
│   │   └── telemetry/
│   │       ├── Card.tsx              # カードコンテナ
│   │       ├── SensorGrid.tsx        # センサーグリッド
│   │       ├── MotorBar.tsx          # モーターバー
│   │       └── DataRow.tsx           # データ行
│   ├── hooks/                # カスタムフック
│   │   └── useTelemetry.ts   # テレメトリデータ取得
│   ├── lib/                  # ユーティリティ
│   │   └── telemetryStore.ts # データストア（シングルトン）
│   └── types/                # TypeScript型定義
│       └── telemetry.ts      # テレメトリデータ型
└── public/                   # 静的ファイル
```

---

## 🔌 API エンドポイント

### 1. ヘルスチェック
```http
GET /api/ping
```

**レスポンス:**
```json
{
  "status": "ok",
  "message": "Server is running",
  "timestamp": "2025-12-25T12:00:00.000Z"
}
```

---

### 2. テレメトリデータ受信
```http
POST /api/telemetry
Content-Type: application/json
```

**リクエストボディ:**
```json
{
  "timestamp": 12345,
  "sensors": [1, 1, 0, 0, 0, 1, 1, 1],
  "motor": {
    "left_speed": 6160,
    "right_speed": 8000
  },
  "control": {
    "error": -2.5,
    "turn": -10500,
    "base_speed": 8000
  },
  "wifi": {
    "ip": "192.168.1.101",
    "rssi": -45
  }
}
```

**レスポンス:**
```json
{
  "status": "success",
  "received": true
}
```

---

### 3. 最新データ取得
```http
GET /api/telemetry/latest
```

**レスポンス:** 最新のテレメトリデータ

---

### 4. 履歴取得
```http
GET /api/telemetry?count=10
```

**パラメータ:**
- `count` (optional): 取得件数（デフォルト: 10）

**レスポンス:** テレメトリデータの配列

---

### 5. 統計情報取得
```http
GET /api/telemetry/stats
```

**レスポンス:**
```json
{
  "total_records": 100,
  "avg_error": 1.25,
  "max_left_speed": 8000,
  "max_right_speed": 8000,
  "min_left_speed": 0,
  "min_right_speed": 0
}
```

---

### 6. データエクスポート
```http
GET /api/telemetry/export
```

**レスポンス:**
```json
{
  "status": "success",
  "filename": "telemetry_2025-12-25T12-00-00.json",
  "count": 100,
  "data": [...]
}
```

---

### 7. 履歴クリア
```http
POST /api/telemetry/clear
```

**レスポンス:**
```json
{
  "status": "success",
  "cleared": 100
}
```

---

## 🔗 Raspberry Pi Pico Wとの連携

### ファームウェア側の設定

`firmware/src/config.py`を編集:
```python
# WiFi設定
SSID = "your_wifi_ssid"
PASSWORD = "your_wifi_password"

# サーバー設定（あなたのPCのIPアドレス）
SERVER_IP = "192.168.1.100"
```

`firmware/src/main.py`の35行目を編集:
```python
TELEMETRY_URL = f"http://{config.SERVER_IP}:3000/api/telemetry"
```

### 動作確認

1. Next.jsサーバーを起動: `npm run dev`
2. Raspberry Pi Pico Wで`main.py`を実行
3. ブラウザで `http://localhost:3000/telemetry` を開く
4. リアルタイムでデータが表示される

---

## 🎨 ダッシュボード機能

### 表示内容

- **ラインセンサー (8ch)**: 各センサーの状態（白/黒）
- **モーター速度**: 左右のモーター速度（バー表示）
- **制御情報**: エラー値、ターン値、ベース速度
- **WiFi情報**: IPアドレス、信号強度
- **統計情報**: 平均エラー値、最大速度、稼働時間

### 更新頻度

- **500ms**ごとに自動更新（カスタマイズ可能）

---

## 🚢 Vercelへのデプロイ

```bash
# Vercel CLIのインストール
npm i -g vercel

# デプロイ
vercel
```

デプロイ後、Raspberry Pi Pico Wの`SERVER_IP`をVercelのURLに変更してください。

---

## 📚 ドキュメント

- [設計書](./docs/design.md) - システムの詳細設計

---

## 🤝 コントリビューション

このプロジェクトは4th-PBLの一環として開発されています。

---

## 📝 ライセンス

このプロジェクトは教育目的で作成されています。
