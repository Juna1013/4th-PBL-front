import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { CommandType, VALID_COMMANDS } from '@/types';

// POST /api/extract-command
// ユーザーの入力からコマンドを抽出するためのエンドポイント
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userInput } = body;

        if (!userInput) {
            return NextResponse.json({
                success: false,
                error: 'User input is required'
            }, { status: 400 });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        
        // APIキーがある場合はGemini APIを使用
        if (apiKey) {
            try {
                const genAI = new GoogleGenerativeAI(apiKey);
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
                    return NextResponse.json({
                        success: true,
                        command: extractedCommand,
                        source: 'gemini'
                    });
                }
            } catch (error) {
                console.error('Gemini API error:', error);
            }
        }

        // フォールバック: ルールベース処理
        const input = userInput.toLowerCase();
        let command: CommandType = 'STOP';
        
        if (input.includes('左') || input.includes('ひだり')) command = 'LEFT';
        else if (input.includes('右') || input.includes('みぎ')) command = 'RIGHT';
        else if (input.includes('前') || input.includes('進') || input.includes('まえ')) command = 'FORWARD';
        else if (input.includes('開始') || input.includes('スタート') || input.includes('go')) command = 'GO';
        else if (input.includes('停止') || input.includes('止') || input.includes('ストップ') || input.includes('stop')) command = 'STOP';

        return NextResponse.json({
            success: true,
            command,
            source: 'fallback'
        });

    } catch (error) {
        console.error('Command extraction error:', error);
        return NextResponse.json({
            success: false,
            error: 'Internal server error'
        }, { status: 500 });
    }
}