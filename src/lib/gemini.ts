import { GoogleGenerativeAI } from '@google/generative-ai';
import { CommandType, VALID_COMMANDS } from '@/types';
import { Forward } from 'lucide-react';

// Gemini AI クライアントの初期化
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// ユーザーのテキスト入力からライントレースカーのコマンドを抽出
export async function extractCommandFromText(userInput: string): Promise<CommandType> {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });

        const prompt = `
            あなたはライントレースカーの制御システムです。
            以下のユーザー入力から、最も適切な制御コマンドを1つ抽出してください。

            利用可能なコマンド:
            - LEFT:左に曲がる
            - RIGHT:右に曲がる
            - FORWARD:前進する
            - STOP:停止する
            - GO:開始/進行する

            ユーザー入力: "${userInput}"

            ルール:
            1. コマンド名のみを返してください（説明不要）
            2. 必ず上記5つのコマンドのいずれかを返してください
            3. 判断できない場合は "STOP" を返してください

            抽出したコマンド:`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const extractedCommand = response.text().trim().toUpperCase() as CommandType;

        // 有効なコマンドかチェック
        if (VALID_COMMANDS.includes(extractedCommand)) {
            return extractedCommand;
        } else {
            console.warn(`Invalid command extracted: ${extractedCommand}, defaulting to STOP`);
            return 'STOP';
        }
    } catch (error) {
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
