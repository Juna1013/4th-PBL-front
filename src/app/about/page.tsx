

import Navigation from '@/components/Navigation';
import { getMarkdownContent } from '@/lib/markdown';
import MarkdownViewer from '@/components/MarkdownViewer';

export default function About() {
    const { meta, content } = getMarkdownContent('about');

    return (
        <div className="min-h-screen">
            <Navigation />

            <main className="pt-24 px-6 pb-20">
                <div className="max-w-4xl mx-auto">
                    {/* 記事ヘッダー */}
                    <div className="text-center mb-6 space-y-4">
                        <div className="inline-block px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-400 mb-2">
                            {meta.date}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                            {meta.title}
                        </h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                            {meta.description}
                        </p>
                    </div>

                    {/* 記事コンテンツ */}
                    <div className="pb-8">
                        <MarkdownViewer content={content} />
                    </div>
                </div>
            </main>
        </div>
    );
}
