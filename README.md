# ライントレースカー デジタルツイン システム

ライントレースカーのセンサーとモーターの状況をリアルタイムで可視化するデジタルツインシステム。

## 📋 プロジェクト概要

このプロジェクトは、ライントレースカーから送信されるセンサーデータとモーター情報をリアルタイムで受信し、Webブラウザ上で可視化するシステムです。

### 主な機能

- **リアルタイムダッシュボード**: センサー値、モーター出力、統計情報を一目で確認
- **デジタルツイン2D表示**: Canvas APIを使用した車両の可視化
- **データログ**: タイムスタンプ付きログの記録・表示・エクスポート
- **統計情報**: 走行時間、平均速度、センサー反応回数などの集計

## 🛠️ 技術スタック

- **フレームワーク**: Next.js 16 (App Router)
- **言語**: TypeScript
- **スタイリング**: TailwindCSS
- **状態管理**: Zustand
- **デプロイ**: Vercel (予定)

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

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

### ビルド

```bash
# プロダクションビルド
npm run build

# プロダクションサーバーの起動
npm start
```

## 📁 プロジェクト構造

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

## 📊 実装状況

### ✅ Phase 1: 基盤構築（完了）
- [x] Next.js プロジェクトセットアップ
- [x] TailwindCSS 設定
- [x] TypeScript 型定義
- [x] 基本的なレイアウト作成
- [x] モックデータでのUI実装

### 🚧 Phase 2: データ通信（一部完了）
- [ ] WebSocket接続実装
- [ ] API Routes作成
- [ ] データ受信・パース処理
- [x] 状態管理の実装（Zustand）

### ✅ Phase 3: 可視化機能（完了）
- [x] デジタルツイン2D表示
- [x] センサー・モーター表示
- [x] ログビューア実装

### 🚧 Phase 4: 高度な機能（一部完了）
- [x] データエクスポート機能
- [ ] フィルタリング・検索
- [ ] アラート機能

### ⏳ Phase 5: テスト・デプロイ（未着手）
- [ ] 実機テスト
- [ ] パフォーマンス最適化
- [ ] Vercelデプロイ

## 🔧 開発モード

現在、モックデータを使用してUIの動作を確認できます。実際のライントレースカーと接続する場合は、以下の手順が必要です：

1. WebSocket接続の実装
2. API Routesの作成
3. データ受信・パース処理の実装

詳細は `docs/design.md` を参照してください。

## 📝 ドキュメント

- [設計書](./docs/design.md) - システムの詳細設計

## 🤝 コントリビューション

このプロジェクトは4th-PBLの一環として開発されています。

## 📄 ライセンス

© 2025 4th-PBL Project. All rights reserved.

---

**最終更新**: 2025-12-22  
**バージョン**: 1.0.0
