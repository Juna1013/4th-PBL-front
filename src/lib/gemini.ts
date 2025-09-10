import { GoogleGenerativeAI } from '@google/generative-ai';
import { CommandType, VALID_COMMANDS } from '@/types';
import { Forward } from 'lucide-react';

// Gemini AI クライアントの初期化
// クライアントサイドでは環境変数にアクセスできないため、
// API経由でコマンド処理を行う
const genAI = null; // クライアントサイドでは常にnull

// ユーザーのテキスト入力からライントレースカーのコマンドを抽出
export async function extractCommandFromText(userInput: string): Promise<CommandType> {
    try {
        // APIエンドポイント経由でコマンド抽出を実行
        const response = await fetch('/api/extract-command', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userInput })
        });

        if (response.ok) {
            const result = await response.json();
            if (result.success) {
                return result.command as CommandType;
            }
        }

        throw new Error('API call failed');
    } catch (error) {
        console.error('Command extraction error:', error);
        
        // APIエラー時は簡易的なルールベース処理でフォールバック
        const input = userInput.toLowerCase();
        if (input.includes('左') || input.includes('ひだり')) return 'LEFT';
        if (input.includes('右') || input.includes('みぎ')) return 'RIGHT';
        if (input.includes('前') || input.includes('進') || input.includes('まえ')) return 'FORWARD';
        if (input.includes('開始') || input.includes('スタート') || input.includes('go')) return 'GO';
        if (input.includes('停止') || input.includes('止') || input.includes('ストップ') || input.includes('stop')) return 'STOP';
        
        // エラー時はSTOPコマンドを返す
        return 'STOP';
    }
}

// コマンドの日本語説明を取得
export function getCommandDescription(command: CommandType): string {
    const description: Record<CommandType, string> = {
        LEFT: '左に曲がります',
        RIGHT: '右に曲がります',
        FORWARD: '前進します',
        STOP: '停止します',
        GO: '動作を開始します'
    };

    return description[command] || '不明なコマンド';
}
