# プロジェクト構成 (Project Structure)

このドキュメントでは、Webフロントエンドプロジェクトのディレクトリ構成と各ファイルの役割について説明します。

## ディレクトリ構成

```
web/
├── app/                      # Next.js App Router のメインディレクトリ
│   ├── favicon.ico          # ファビコン
│   ├── globals.css          # グローバルスタイル
│   ├── layout.tsx           # ルートレイアウト
│   └── page.tsx             # トップページ（音声認識ダッシュボード）
├── docs/                     # プロジェクトドキュメント
│   ├── api_integration.md   # API連携仕様
│   ├── features.md          # 機能詳細
│   ├── setup.md             # セットアップガイド
│   └── project_structure.md # このファイル
├── public/                   # 静的ファイル
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── .gitignore               # Git除外設定
├── eslint.config.mjs        # ESLint設定
├── next-env.d.ts            # Next.js型定義
├── next.config.ts           # Next.js設定
├── package.json             # npm依存関係
├── package-lock.json        # npm依存関係ロック
├── postcss.config.mjs       # PostCSS設定
├── tsconfig.json            # TypeScript設定
├── vercel.json              # Vercelデプロイ設定
└── README.md                # プロジェクト概要
```

## 主要ファイルの説明

### アプリケーションコア

#### `app/page.tsx`
メインの音声認識ダッシュボードコンポーネントです。

**主な機能:**
- サーバー接続状態の監視
- マイク入力とオーディオビジュアライザー
- 音声ファイルのアップロード
- コマンドシミュレーション
- 認識結果の表示と履歴管理

**主要な状態管理:**
- `recognition`: 最新の認識結果
- `history`: 認識履歴（最大10件）
- `serverStatus`: バックエンドサーバーの接続状態
- `isListening`: マイク入力の状態
- `audioLevel`: マイク入力レベル

#### `app/layout.tsx`
アプリケーション全体のレイアウトを定義します。

**機能:**
- メタデータ設定（タイトル、説明）
- フォント設定（Geist Sans, Geist Mono）
- グローバルスタイルの適用

#### `app/globals.css`
Tailwind CSSのインポートとグローバルスタイルを定義します。

**内容:**
- Tailwind CSSのインポート
- カラーテーマ変数（ライト/ダークモード対応）
- カスタムフォント変数

### 設定ファイル

#### `next.config.ts`
Next.jsの設定ファイルです。現在はデフォルト設定のみです。

#### `tsconfig.json`
TypeScriptコンパイラの設定です。

**主要設定:**
- `target`: ES2017
- `jsx`: react-jsx（React 17+の新しいJSX変換）
- `paths`: `@/*` エイリアスでプロジェクトルートを参照可能
- `strict`: 厳格な型チェック有効

#### `package.json`
プロジェクトの依存関係とスクリプトを定義します。

**主要な依存関係:**
- `next`: 16.0.3
- `react`: 19.2.0
- `react-dom`: 19.2.0
- `tailwindcss`: ^4

**スクリプト:**
- `dev`: 開発サーバー起動
- `build`: 本番ビルド
- `start`: 本番サーバー起動
- `lint`: ESLintによるコードチェック

#### `vercel.json`
Vercelへのデプロイ設定です。

**内容:**
```json
{
  "framework": "nextjs"
}
```

#### `eslint.config.mjs`
ESLintの設定ファイルです。Next.jsの推奨設定を使用しています。

#### `postcss.config.mjs`
PostCSSの設定ファイルです。Tailwind CSSのプラグインを有効化しています。

### 静的ファイル

#### `public/`
静的アセットを格納するディレクトリです。

**ファイル:**
- `favicon.ico`: ブラウザタブのアイコン
- `*.svg`: Next.jsやVercelのロゴなど（デフォルトで生成されたもの）

### ドキュメント

#### `docs/`
プロジェクトのドキュメントを格納するディレクトリです。

- `features.md`: 各機能の詳細説明
- `api_integration.md`: バックエンドAPIとの連携仕様
- `setup.md`: セットアップとインストール手順
- `project_structure.md`: このファイル

## 開発時の注意点

### ファイル追加時のルール

1. **新しいページを追加する場合**
   - `app/` 内に新しいディレクトリを作成し、`page.tsx` を配置します
   - 例: `app/settings/page.tsx` → `/settings` ルート

2. **コンポーネントを追加する場合**
   - `app/components/` ディレクトリを作成し、そこに配置することを推奨します
   - または各ページディレクトリ内に配置します

3. **APIルートを追加する場合**
   - `app/api/` 内に `route.ts` ファイルを作成します
   - 例: `app/api/health/route.ts` → `/api/health` エンドポイント

### ビルド成果物

- `.next/`: Next.jsのビルド成果物（Gitに含めない）
- `node_modules/`: npm依存関係（Gitに含めない）

これらは `.gitignore` で除外されています。
