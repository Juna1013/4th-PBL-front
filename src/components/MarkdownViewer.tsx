'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownViewerProps {
    content: string;
}

export default function MarkdownViewer({ content }: MarkdownViewerProps) {
    return (
        <div className="markdown-content text-slate-300 leading-relaxed space-y-6">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-white mt-10 mb-6 border-b border-slate-700 pb-2" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-l-4 border-amber-400 pl-4" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="text-xl font-bold text-slate-100 mt-8 mb-3" {...props} />,
                    p: ({ node, ...props }) => <p className="mb-4 text-slate-300 leading-7" {...props} />,
                    ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-2 mb-4 pl-4 marker:text-amber-500" {...props} />,
                    ol: ({ node, ...props }) => <ol className="list-decimal list-inside space-y-2 mb-4 pl-4 marker:text-amber-500" {...props} />,
                    li: ({ node, ...props }) => <li className="pl-2" {...props} />,
                    strong: ({ node, ...props }) => <strong className="font-bold text-amber-400" {...props} />,
                    a: ({ node, ...props }) => <a className="text-blue-400 hover:text-blue-300 underline underline-offset-4" {...props} />,
                    blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-slate-600 pl-4 py-2 my-4 bg-slate-800/50 italic text-slate-400 rounded-r" {...props} />,
                    code: ({ node, className, children, ...props }) => {
                        const match = /language-(\w+)/.exec(className || '')
                        const isInline = !match && !String(children).includes('\n')
                        return isInline ? (
                            <code className="bg-slate-800 text-amber-200 px-1.5 py-0.5 rounded text-sm font-mono border border-slate-700" {...props}>
                                {children}
                            </code>
                        ) : (
                            <div className="relative group">
                                <pre className="bg-[#0d1117] p-4 rounded-lg overflow-x-auto border border-slate-800 text-sm font-mono my-4 text-slate-300 shadow-lg">
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                </pre>
                            </div>
                        )
                    },
                    table: ({ node, ...props }) => <div className="overflow-x-auto my-6 rounded-lg border border-slate-700"><table className="w-full text-left text-sm" {...props} /></div>,
                    thead: ({ node, ...props }) => <thead className="bg-slate-800/80 text-white font-bold" {...props} />,
                    tbody: ({ node, ...props }) => <tbody className="divide-y divide-slate-700/50" {...props} />,
                    tr: ({ node, ...props }) => <tr className="hover:bg-slate-800/30 transition-colors" {...props} />,
                    th: ({ node, ...props }) => <th className="px-6 py-3" {...props} />,
                    td: ({ node, ...props }) => <td className="px-6 py-3 text-slate-300" {...props} />,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
