
import React from 'react';

interface KpiCardProps {
    label: string;
    value: string;
    footer?: string;
    footerColor?: string;
    footerAsPill?: boolean;
}

export const KpiCard: React.FC<KpiCardProps> = ({ label, value, footer, footerColor = 'text-gray-400', footerAsPill }) => {
    return (
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 flex flex-col justify-between h-full">
            <div>
                <div className="text-sm text-blue-200/80">{label}</div>
                <div className="text-xl sm:text-2xl font-bold text-white mt-1">{value}</div>
            </div>
            {footer && (
                footerAsPill ? (
                    <div className={`text-xs mt-2 ${footerColor}`}>
                        <span className="inline-block border border-gray-700 bg-[#0c1830] text-blue-200 px-2 py-0.5 rounded-full">{footer}</span>
                    </div>
                ) : (
                    <p className={`text-xs mt-2 ${footerColor}`}>{footer}</p>
                )
            )}
        </div>
    );
};
