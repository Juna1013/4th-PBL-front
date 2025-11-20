# 4th-PBL Web Frontend

## 概要
Raspberry Pi Pico W ライントレースカーを制御・監視するためのWebダッシュボードです。
Next.js と Tailwind CSS を使用して構築されており、音声コマンドの認識状態やサーバーとの接続状況を可視化します。

## 主な機能
- 🎤 **音声認識表示**: マイク入力やファイルアップロードによるコマンド認識
- 📊 **ステータス監視**: バックエンドサーバーとの接続状態確認
- 📝 **履歴管理**: 認識されたコマンドのログ表示
- 🛠 **デバッグ機能**: コマンドの手動シミュレーション

## ドキュメント
詳細な情報は `docs/` ディレクトリ内の以下のファイルを参照してください。

- **[機能詳細 (Features)](docs/features.md)**: ダッシュボードの各機能についての説明
- **[API連携 (API Integration)](docs/api_integration.md)**: バックエンドとの通信仕様
- **[セットアップガイド (Setup)](docs/setup.md)**: インストールと実行方法
- **[プロジェクト構成 (Project Structure)](docs/project_structure.md)**: ディレクトリ構成とファイルの説明

## 技術スタック
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
