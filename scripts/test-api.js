// APIエンドポイントのテスト用スクリプト
const API_BASE = 'http://localhost:3000/api';

async function testAPI() {
  console.log('🧪 API テストを開始します...\n');

  // 1. ヘルスチェック
  try {
    const response = await fetch(`${API_BASE}/health`);
    const data = await response.json();
    console.log('✅ Health Check:', data.status);
  } catch (error) {
    console.log('❌ Health Check failed:', error.message);
  }

  // 2. コマンド送信テスト
  try {
    const response = await fetch(`${API_BASE}/command`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command: 'FORWARD', source: 'test' })
    });
    const data = await response.json();
    console.log('✅ Command POST:', data.success ? 'Success' : 'Failed');
  } catch (error) {
    console.log('❌ Command POST failed:', error.message);
  }

  // 3. コマンド取得テスト
  try {
    const response = await fetch(`${API_BASE}/command`);
    const data = await response.json();
    console.log('✅ Command GET:', data.data.command);
  } catch (error) {
    console.log('❌ Command GET failed:', error.message);
  }

  // 4. テスト用音声認識
  try {
    const response = await fetch(`${API_BASE}/test/voice`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command: 'left' })
    });
    const data = await response.json();
    console.log('✅ Test Voice Recognition:', data.success ? 'Success' : 'Failed');
  } catch (error) {
    console.log('❌ Test Voice Recognition failed:', error.message);
  }

  // 5. ログ取得テスト
  try {
    const response = await fetch(`${API_BASE}/log`);
    const data = await response.json();
    console.log('✅ Log GET:', `${data.data.length} logs found`);
  } catch (error) {
    console.log('❌ Log GET failed:', error.message);
  }

  console.log('\n🎉 APIテスト完了');
}

// Node.js環境でfetchを使用するため
if (typeof fetch === 'undefined') {
  global.fetch = require('node-fetch');
}

testAPI();
