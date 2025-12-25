'use client';

import { ReactNode } from 'react';

interface CardProps {
    title: string;
    icon?: string;
    children: ReactNode;
}

export default function Card({ title, icon, children }: CardProps) {
    return (
        <div className="bg-white/95 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-5 pb-3 border-b-2 border-purple-500">
                {icon && <span className="mr-2">{icon}</span>}
                {title}
            </h2>
            {children}
        </div>
    );
}
