# システム設計書

## 1. プロジェクト概要

### 1.1 目的
ライントレースカーのセンサーとモーターの状況をリアルタイムで取得し、WiFiモジュール経由でWebサーバーに送信。受信したデータを元にデジタルツインを実装し、走行状況の可視化とデータ分析を行う。

### 1.2 スコープ
- **対象**: ライントレースカー（センサー搭載車両）
- **範囲**: Webフロントエンド側のみで完結（バックエンドサーバーは最小限）
- **目標**: リアルタイムデータの可視化とログ記録

## 2. システムアーキテクチャ

### 2.1 全体構成

```
[ライントレースカー]
    ├─ センサー（ライン検出）
    ├─ モーター（左右）
    └─ WiFiモジュール
         ↓ (HTTP/WebSocket)
[Next.js Webアプリケーション]
    ├─ リアルタイムダッシュボード
    ├─ データログビューア
    └─ デジタルツイン3D表示
```

### 2.2 データフロー

1. **データ収集**: ライントレースカー → WiFiモジュール
2. **データ送信**: WiFiモジュール → Next.js API Routes (WebSocket/HTTP)
3. **データ処理**: Next.js Server → State Management
4. **データ表示**: React Components → ユーザーインターフェース

## 3. 機能要件

### 3.1 コア機能

#### 3.1.1 リアルタイムダッシュボード
- **走行状況の可視化**
  - 現在の速度（左右モーター）
  - センサー値（ライン検出状態）
  - 車両の位置・方向（推定）
  - ステータスインジケーター（接続状態、エラー）

#### 3.1.2 デジタルツイン表示
- **2D/3D可視化**
  - トップビュー: コース上の車両位置
  - センサー状態の視覚的表現
  - モーター出力のリアルタイム表示
  - 走行軌跡の描画

#### 3.1.3 データログ機能
- **ログ表示**
  - タイムスタンプ付きデータストリーム
  - フィルタリング機能（時間範囲、データタイプ）
  - エクスポート機能（CSV/JSON）
  - 検索機能

### 3.2 追加機能

- **統計情報**
  - 走行時間
  - 平均速度
  - センサー反応回数
  - エラー発生回数

- **アラート機能**
  - 接続切断時の通知
  - 異常値検出時の警告
  - モーター停止時の通知

## 4. データ構造

### 4.1 受信データフォーマット

```typescript
interface SensorData {
  timestamp: number;           // Unix timestamp (ms)
  sensors: {
    left: number;             // 0-1023 (アナログ値)
    center: number;
    right: number;
    lineDetected: boolean;    // ライン検出フラグ
  };
  motors: {
    left: {
      speed: number;          // 0-255 (PWM値)
      direction: 'forward' | 'backward' | 'stop';
    };
    right: {
      speed: number;
      direction: 'forward' | 'backward' | 'stop';
    };
  };
  position?: {
    x: number;                // 推定位置（オプション）
    y: number;
    heading: number;          // 方向（度）
  };
  battery?: number;           // バッテリー残量（オプション）
  status: 'running' | 'stopped' | 'error';
}
```

### 4.2 ログデータ構造

```typescript
interface LogEntry {
  id: string;
  timestamp: number;
  data: SensorData;
  eventType: 'normal' | 'warning' | 'error';
  message?: string;
}
```

## 5. 技術スタック詳細

### 5.1 フロントエンド

| 技術 | バージョン | 用途 |
|------|-----------|------|
| Next.js | 14.x | フレームワーク（App Router） |
| TypeScript | 5.x | 型安全性 |
| TailwindCSS | 3.x | スタイリング |
| React | 18.x | UI構築 |
| Zustand / Jotai | latest | 状態管理 |
| Recharts / Chart.js | latest | データ可視化 |
| Three.js / React Three Fiber | latest | 3D表示（オプション） |
| Socket.io-client | latest | WebSocket通信 |

### 5.2 API / 通信

- **Next.js API Routes**: データ受信エンドポイント
- **WebSocket**: リアルタイム双方向通信
- **Server-Sent Events (SSE)**: 代替案（一方向ストリーミング）

### 5.3 デプロイ

- **Vercel**: ホスティング・CI/CD
- **環境変数管理**: Vercel Environment Variables

## 6. 実装計画

### Phase 1: 基盤構築（✅ 完了）
- [x] Next.js プロジェクトセットアップ
- [x] TailwindCSS 設定
- [x] TypeScript 型定義
- [x] 基本的なレイアウト作成
- [x] モックデータでのUI実装

### Phase 2: データ通信（✅ 完了）
- [x] Server-Sent Events (SSE) 実装
- [x] API Routes作成
- [x] データ受信・パース処理
- [x] 状態管理の実装（Zustand）

### Phase 3: 可視化機能（✅ 完了）
- [ ] リアルタイムチャート実装
- [x] デジタルツイン2D表示
- [x] センサー・モーター表示
- [x] ログビューア実装

### Phase 4: 高度な機能（🚧 一部完了）
- [x] データエクスポート機能
- [ ] フィルタリング・検索
- [ ] アラート機能
- [ ] 3D表示（オプション）

### Phase 5: テスト・デプロイ（⏳ 未着手）
- [ ] 実機テスト
- [ ] パフォーマンス最適化
- [ ] Vercelデプロイ
- [ ] ドキュメント整備

## 7. 技術的考慮事項

### 7.1 パフォーマンス
- **データ更新頻度**: 100ms - 500ms（調整可能）
- **ログ保持**: クライアント側で最大1000件（古いものから削除）
- **メモリ管理**: 定期的なガベージコレクション

### 7.2 エラーハンドリング
- 接続切断時の自動再接続（指数バックオフ）
- データ欠損時のフォールバック表示
- エラーログの記録

### 7.3 セキュリティ
- CORS設定（開発環境のみ緩和）
- 環境変数での設定管理
- 入力データのバリデーション

## 8. 今後の拡張性

### 8.1 将来的な機能
- 複数台の車両の同時監視
- 走行データの永続化（データベース連携）
- 機械学習による異常検知
- コース設計エディター
- リプレイ機能

### 8.2 技術的改善
- PWA化（オフライン対応）
- リアルタイム協調編集
- AR/VR対応

## 9. 参考資料

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)

## 10. 注意事項

- **Webサーバー側のみで完結**: バックエンドは最小限（Next.js API Routesのみ）
- **リアルタイム性重視**: 低レイテンシーな通信を優先
- **スケーラビリティ**: 将来的な機能拡張を考慮した設計
- **ユーザビリティ**: 直感的で分かりやすいUI/UX

**最終更新**: 2025-12-22  
**バージョン**: 1.0  
**作成者**: Juna1013