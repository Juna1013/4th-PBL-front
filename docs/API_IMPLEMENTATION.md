# API統合

## ✅ 実装内容

### 1. API Routes（Next.js）

#### `/api/ping`
- **メソッド**: GET
- **用途**: サーバーの稼働確認（WiFi接続テスト用）
- **レスポンス**: サーバーステータスとタイムスタンプ

#### `/api/sensor`
- **メソッド**: POST, GET
- **用途**: 
  - POST: ファームウェアからセンサーデータを受信
  - GET: 最新のセンサーデータを取得
- **データ形式**: JSON

#### `/api/stream`
- **メソッド**: GET
- **用途**: Server-Sent Events (SSE) によるリアルタイムストリーミング
- **更新間隔**: 500ms

### 2. フロントエンド統合

#### カスタムフック: `useRealtimeData`
- SSE接続の管理
- 自動再接続
- エラーハンドリング
- ファームウェアデータ形式の変換

#### UI機能
- モックデータ / リアルタイムデータの切り替え
- 接続状態インジケーター
- リアルタイムデータ表示

### 3. ファームウェア統合

#### `line_trace_with_api.py`
- WiFi接続
- センサーデータ収集
- 定期的なAPI送信（500ms間隔）
- エラーハンドリング

#### 設定ファイル
- `config.example.py`: 設定テンプレート
- WiFi SSID/パスワード
- サーバーIP/ポート

### 4. ドキュメント

#### `README_API.md`
- セットアップ手順
- API仕様
- トラブルシューティング
- データフロー図

## 🔧 技術選択の理由

### SSE vs WebSocket
**選択**: Server-Sent Events (SSE)

**理由**:
1. **シンプル**: 一方向通信で十分（ファームウェア → サーバー → ブラウザ）
2. **自動再接続**: ブラウザが自動的に再接続を試みる
3. **HTTP互換**: 特別な設定不要
4. **Vercel対応**: Vercelでも動作可能

### データフロー
```
[Pico W] センサー読み取り
    ↓
[Pico W] POST /api/sensor (500ms間隔)
    ↓
[Next.js API] データ保存（メモリ）
    ↓
[Next.js SSE] GET /api/stream でポーリング
    ↓
[ブラウザ] EventSource で受信
    ↓
[React] リアルタイム表示
```

## 📝 使用方法

### 1. サーバー起動
```bash
cd web
npm run dev
```

### 2. ブラウザで確認
```
http://localhost:3000
```
「リアルタイムデータ (SSE)」を選択

### 3. ファームウェア設定
```python
# config.py
SSID = "your-wifi"
PASSWORD = "your-password"
SERVER_IP = "192.168.x.x"  # npm run dev で表示されるNetwork IP
```

### 4. ファームウェア実行
```python
# Pico W で実行
python line_trace_with_api.py
```

## 🐛 既知の問題

### 1. メモリ保持
- 現状、最新データのみメモリに保持
- サーバー再起動でデータ消失
- **将来の改善**: データベース連携

### 2. スケーラビリティ
- 単一クライアント想定
- 複数台同時接続は未対応
- **将来の改善**: WebSocket + Redis

### 3. エラーリカバリー
- ネットワーク切断時の自動復帰は実装済み
- データ欠損時のフォールバック表示あり

## 🚀 次のステップ

### 短期（1-2週間）
- [ ] 実機テスト
- [ ] パフォーマンス測定
- [ ] エラーケースの検証

### 中期（1ヶ月）
- [ ] データベース連携（履歴保存）
- [ ] 複数台対応
- [ ] アラート機能

### 長期（2-3ヶ月）
- [ ] 機械学習統合
- [ ] 3D可視化
- [ ] PWA化

## 📚 参考資料

- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
- [MicroPython urequests](https://docs.micropython.org/en/latest/library/urequests.html)
- [Zustand](https://github.com/pmndrs/zustand)

**実装者**: Antigravity AI  
**レビュー**: 必要に応じて実施  
**バージョン**: 1.0.0
