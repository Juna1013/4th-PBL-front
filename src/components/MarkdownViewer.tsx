'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownViewerProps {
    content: string;
}

export default function MarkdownViewer({ content }: MarkdownViewerProps) {
    return (
        <div className="markdown-content text-slate-600 leading-relaxed space-y-6">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-slate-900 mt-10 mb-6 border-b border-slate-200 pb-2" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4 border-l-4 border-sky-500 pl-4" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="text-xl font-bold text-slate-800 mt-8 mb-3" {...props} />,
                    p: ({ node, ...props }) => <p className="mb-4 text-slate-600 leading-7" {...props} />,
                    ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-2 mb-4 pl-4 marker:text-sky-500" {...props} />,
                    ol: ({ node, ...props }) => <ol className="list-decimal list-inside space-y-2 mb-4 pl-4 marker:text-sky-500" {...props} />,
                    li: ({ node, ...props }) => <li className="pl-2" {...props} />,
                    strong: ({ node, ...props }) => <strong className="font-bold text-sky-600" {...props} />,
                    a: ({ node, ...props }) => <a className="text-blue-600 hover:text-blue-500 underline underline-offset-4" {...props} />,
                    blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-sky-400 pl-4 py-2 my-4 bg-sky-50 italic text-slate-600 rounded-r" {...props} />,
                    code: ({ node, className, children, ...props }) => {
                        const match = /language-(\w+)/.exec(className || '')
                        const isInline = !match && !String(children).includes('\n')
                        return isInline ? (
                            <code className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-sm font-mono border border-slate-200" {...props}>
                                {children}
                            </code>
                        ) : (
                            <div className="relative group">
                                <pre className="bg-[#1e293b] p-4 rounded-lg overflow-x-auto border border-slate-200 text-sm font-mono my-4 text-slate-200 shadow-sm">
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                </pre>
                            </div>
                        )
                    },
                    table: ({ node, ...props }) => <div className="overflow-x-auto my-6 rounded-lg border border-slate-200"><table className="w-full text-left text-sm" {...props} /></div>,
                    thead: ({ node, ...props }) => <thead className="bg-slate-50 text-slate-900 font-bold border-b border-slate-200" {...props} />,
                    tbody: ({ node, ...props }) => <tbody className="divide-y divide-slate-200" {...props} />,
                    tr: ({ node, ...props }) => <tr className="hover:bg-slate-50 transition-colors" {...props} />,
                    th: ({ node, ...props }) => <th className="px-6 py-3" {...props} />,
                    td: ({ node, ...props }) => <td className="px-6 py-3 text-slate-600" {...props} />,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
