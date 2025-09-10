import { NextResponse } from 'next/server';

export async function GET() {
  const healthData = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      nextjs: 'operational',
      gemini: process.env.GEMINI_API_KEY ? 'operational' : 'no_api_key',
      database: 'memory_storage', // メモリストレージ使用中
    },
    uptime: process.uptime(),
    version: '1.0.0'
  };

  return NextResponse.json(healthData);
}
