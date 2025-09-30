# Migration Backup Files

このディレクトリには、Vite から Next.js へのマイグレーション時に作成されたバックアップファイルが格納されています。

## バックアップファイル一覧

### Vite 設定ファイル
- `vite.config.ts.bak` - Vite の設定ファイル
- `eslint.config.js.bak` - Vite 用 ESLint 設定

### TypeScript 設定ファイル
- `tsconfig.app.json.bak` - Vite アプリ用 TypeScript 設定
- `tsconfig.node.json.bak` - Vite Node 用 TypeScript 設定

### React アプリケーションファイル
- `main.tsx.bak` - Vite エントリーポイント
- `App.tsx.bak` - メインアプリケーションコンポーネント

### CSS/スタイル設定ファイル
- `postcss.config.js.backup` - PostCSS 設定
- `tailwind.config.js.backup` - Tailwind CSS 設定

## 安全な削除について

マイグレーションが完全に成功し、Next.js アプリケーションが正常に動作していることを確認した後、このディレクトリ全体を削除しても問題ありません。

```bash
# Next.js アプリケーションのテストが完了後
rm -rf migration-backup/
```

## 復元が必要な場合

万が一、元のファイルに戻す必要がある場合は、各 `.bak` ファイルから `.bak` 拡張子を削除して元の場所に移動してください。

例：
```bash
# App.tsx を復元する場合
cp migration-backup/App.tsx.bak src/App.tsx

# Vite 設定を復元する場合
cp migration-backup/vite.config.ts.bak vite.config.ts
```