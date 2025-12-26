

import Navigation from '@/components/Navigation';
import { getMarkdownContent } from '@/lib/markdown';
import MarkdownViewer from '@/components/MarkdownViewer';

export default function Features() {
    const { meta, content } = getMarkdownContent('features');

    return (
        <div className="min-h-screen">
            <Navigation />

            <main className="pt-24 px-6 pb-20">
                {/* 背景の装飾的な光 */}
                <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-sky-200/40 rounded-full blur-[100px] pointer-events-none" />
                <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-4xl mx-auto relative z-10">
                    {/* 記事ヘッダー */}
                    <div className="text-center mb-6 space-y-4">
                        <div className="inline-block px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs text-sky-600 mb-2 font-medium">
                            {meta.date}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
                            {meta.title}
                        </h1>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
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


