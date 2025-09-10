<div align="center">

# 🤖 AI制御ライントレースカー

**音声認識とAIチャットによる高精度ロボット制御システム**

[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)

</div>

---

## 📖 概要

このプロジェクトは、**音声認識技術**と**AI自然言語処理**を組み合わせた次世代ライントレースカー制御システムです。直感的な音声コマンドやチャット入力でロボットを操作でき、リアルタイムでの状態監視も可能です。

### ✨ 主な機能

- 🎙️ **音声制御** - 高精度音声認識でロボットを直感操作
- 💬 **AIチャット制御** - 自然言語処理による知的制御システム  
- 📊 **リアルタイム監視** - 高度なテレメトリーシステム搭載
- 🎮 **手動制御** - 直接的なボタン操作も可能
- 📱 **レスポンシブUI** - モバイル・デスクトップ対応

## 🏗️ システム構成

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   🎙️ Pico W     │    │   🧠 Colab      │    │   💻 Web App    │
│                 │    │                 │    │                 │
│ ・音声録音      │────│ ・CNN音声認識   │────│ ・AIチャット    │
│ ・モーター制御  │    │ ・コマンド変換  │    │ ・可視化        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🛠️ 技術スタック

### フロントエンド

- **Framework**: Next.js 15.5.2 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Lucide React
- **State Management**: React Hooks

### バックエンド

- **API**: Next.js API Routes
- **AI**: Google Gemini API
- **Hardware**: Raspberry Pi Pico W

### 開発ツール

- **Package Manager**: npm
- **Linting**: ESLint
- **Formatting**: Prettier
- **Version Control**: Git

## 🚀 セットアップ

### 前提条件

- Node.js 18.0 以上
- npm または yarn
- Git

### インストール手順

1. **リポジトリのクローン**

   ```bash
   git clone https://github.com/juna1013/4th-PBL-front.git
   cd 4th-PBL-front
   ```

2. **依存関係のインストール**

   ```bash
   npm install
   ```

3. **環境変数の設定**

   ```bash
   cp .env.example .env.local
   # .env.localを編集して必要なAPIキーを設定
   ```

4. **開発サーバーの起動**

   ```bash
   npm run dev
   ```

   ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションを確認

## 📝 環境変数

`.env.local` ファイルに以下の環境変数を設定してください：

```env
# Gemini API キー
GEMINI_API_KEY=your_gemini_api_key_here

# ColabサーバーURL
COLAB_SERVER_URL=http://localhost:5000

# アプリの基本設定
NEXT_PUBLIC_APP_NAME="4th-PBL"
NEXT_PUBLIC_APP_VERSION="1.0.0"
```

## 🎯 使用方法

### 1. チャット制御

1. ダッシュボードにアクセス
2. チャット入力欄に自然言語でコマンドを入力
   - 例: 「左に曲がって」「前進して」「停止して」
3. AIが自動でコマンドに変換・実行

### 2. 手動制御  

1. 手動制御パネルのボタンをクリック
2. 方向キー風のレイアウトで直感的操作

### 3. 音声制御

1. Raspberry Pi Pico Wをセットアップ
2. 音声でコマンドを発話
3. CNNによる音声認識でコマンド実行

## 📊 API仕様

詳細なAPI仕様は [`docs/api/api-specification.md`](./docs/api/api-specification.md) を参照してください。

### 主要エンドポイント

- `GET /api/command` - 現在のコマンド状態取得
- `POST /api/command` - 新しいコマンド設定
- `POST /api/extract-command` - 自然言語からコマンド抽出
- `GET /api/log` - 音声認識ログ取得

## 📁 プロジェクト構造

```
4th-PBL-front/
├── 📁 src/
│   ├── 📁 app/              # Next.js App Router
│   ├── 📁 components/       # Reactコンポーネント
│   ├── 📁 lib/             # ユーティリティ関数
│   └── 📁 types/           # TypeScript型定義
├── 📁 docs/                # プロジェクト文書
├── 📁 public/              # 静的ファイル
└── 📄 README.md            # このファイル
```

## 🧪 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build

# 本番サーバー起動
npm start

# リンター実行
npm run lint

# 型チェック
npm run type-check
```

## 📚 ドキュメント

- [システム設計書](./docs/design/system-design.md)
- [API仕様書](./docs/api/api-specification.md)
- [ユーザーマニュアル](./docs/user-manual/usage.md)

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📜 ライセンス

このプロジェクトは [MIT License](LICENSE) の下で公開されています。

## 👥 開発チーム

- **開発者**: [juna1013](https://github.com/juna1013)
- **プロジェクト**: 4th PBL (Project Based Learning)
