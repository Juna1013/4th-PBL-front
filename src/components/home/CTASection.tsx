import Link from 'next/link';
import { Play, ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          今すぐ体験してみませんか？
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          革新的なAIロボット制御システムで、未来の技術を体験してください
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center space-x-3 bg-white text-blue-600 px-8 py-4 rounded-2xl text-lg font-semibold hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
        >
          <Play className="w-5 h-5" />
          <span>ダッシュボードを開く</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}