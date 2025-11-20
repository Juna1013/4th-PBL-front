# API連携 (API Integration)

フロントエンドはバックエンドサーバーと以下のエンドポイントで通信します。

## 前提設定
デフォルトのサーバーURLは `http://localhost:8000` です。

## エンドポイント詳細

### 1. ヘルスチェック (Health Check)
サーバーの稼働状況を確認します。

- **URL**: `/health`
- **Method**: `GET`
- **Polling Interval**: 5秒ごと
- **Response**:
  - `200 OK`: 接続成功

### 2. 音声認識 (Recognize)
音声ファイルを送信し、認識結果を取得します。

- **URL**: `/recognize`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`
- **Body**:
  - `audio`: 音声ファイルデータ
- **Response (JSON)**:
  ```json
  {
    "command": "前進",
    "confidence": 0.95
  }
  ```

## エラーハンドリング
- ネットワークエラーやサーバーエラーが発生した場合、ダッシュボード上のステータス表示が「未接続」に切り替わります。
- 音声認識失敗時はアラートでユーザーに通知されます。
