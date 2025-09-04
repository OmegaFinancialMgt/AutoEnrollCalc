
import React from 'react';

interface CardProps {
    title: string;
    children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, children }) => {
    return (
        <div className="bg-[#0b1220] border border-gray-800 rounded-xl p-4 sm:p-6 shadow-lg h-full">
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-white">{title}</h2>
            {children}
        </div>
    );
};
