# セットアップガイド (Setup Guide)

## 必要要件
- Node.js (v18以上推奨)
- npm または yarn

## インストール

プロジェクトのルートディレクトリ (`web/`) で以下のコマンドを実行し、依存関係をインストールします。

```bash
npm install
# または
yarn install
```

## 開発サーバーの起動

ローカル開発環境を起動します。

```bash
npm run dev
# または
yarn dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) にアクセスするとアプリケーションが表示されます。

## 本番ビルド

本番環境用にアプリケーションをビルドします。

```bash
npm run build
# または
yarn build
```

ビルドされたアプリケーションを起動するには：

```bash
npm start
# または
yarn start
```

## 環境変数 (Optional)
必要に応じて `.env.local` ファイルを作成し、APIのエンドポイントなどを設定可能です（現在はコード内にハードコードされていますが、将来的な拡張のため）。
