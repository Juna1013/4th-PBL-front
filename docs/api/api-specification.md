# API仕様書

## エンドポイント一覧

### 1. コマンド管理 API

#### GET /api/command
現在のコマンド状態を取得

**レスポンス:**
```json
{
  "success": true,
  "data": {
    "command": "STOP",
    "timestamp": 1694234567890,
    "source": "chat"
  }
}
```

#### POST /api/command
新しいコマンドを設定

**リクエスト:**
```json
{
  "command": "LEFT",
  "source": "chat"
}
```

**レスポンス:**
```json
{
  "success": true,
  "data": {
    "command": "LEFT",
    "timestamp": 1694234567890,
    "source": "chat"
  }
}
```

### 2. コマンド抽出 API

#### POST /api/extract-command
自然言語からコマンドを抽出

**リクエスト:**
```json
{
  "userInput": "左に曲がって"
}
```

**レスポンス:**
```json
{
  "success": true,
  "command": "LEFT",
  "source": "gemini"
}
```

### 3. システムテスト API

#### GET /api/test/gemini
Gemini APIの接続テスト

**レスポンス:**
```json
{
  "success": true,
  "status": "connected",
  "message": "Gemini API is working"
}
```

#### GET /api/test/voice
音声機能のテスト

### 4. ログ管理 API

#### GET /api/log
音声認識ログを取得

**クエリパラメータ:**
- `limit`: 取得件数 (デフォルト: 20)

**レスポンス:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "command": "left",
      "confidence": 0.95,
      "timestamp": 1694234567890
    }
  ]
}
```

## エラーレスポンス

```json
{
  "success": false,
  "error": "エラーメッセージ"
}
```

## 有効なコマンド

- `LEFT`: 左に曲がる
- `RIGHT`: 右に曲がる  
- `FORWARD`: 前進する
- `STOP`: 停止する
- `GO`: 開始/進行する