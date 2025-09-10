import { NextResponse } from 'next/server';

// GET /api/test/gemini
// Gemini APIの接続テスト用エンドポイント
export async function GET() {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        
        if (!apiKey) {
            return NextResponse.json({
                success: false,
                error: 'API key not configured'
            }, { status: 500 });
        }

        // 簡単なテストリクエストを送信
        const { GoogleGenerativeAI } = await import('@google/generative-ai');
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });

        // 簡単なテストプロンプト
        const result = await model.generateContent('テスト');
        const response = await result.response;
        
        return NextResponse.json({
            success: true,
            status: 'connected',
            message: 'Gemini API is working'
        });

    } catch (error) {
        console.error('Gemini API test failed:', error);
        return NextResponse.json({
            success: false,
            error: 'API connection failed'
        }, { status: 500 });
    }
}