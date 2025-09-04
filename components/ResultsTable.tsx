
import React from 'react';
import type { YearlyData } from '../types';

interface ResultsTableProps {
    rows: YearlyData[];
}

const formatCurrency = (value: number) => new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
const formatPercent = (value: number) => `${(value * 100).toFixed(1)}%`;

export const ResultsTable: React.FC<ResultsTableProps> = ({ rows }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] border-collapse text-sm">
                <thead>
                    <tr className="border-b border-gray-700">
                        <th className="p-2 sm:p-3 text-left font-semibold text-gray-300">Yr</th>
                        <th className="p-2 sm:p-3 text-right font-semibold text-gray-300">Salary</th>
                        <th className="p-2 sm:p-3 text-right font-semibold text-gray-300">AE Emp%</th>
                        <th className="p-2 sm:p-3 text-right font-semibold text-gray-300">AE Emp €</th>
                        <th className="p-2 sm:p-3 text-right font-semibold text-gray-300">AE Er €</th>
                        <th className="p-2 sm:p-3 text-right font-semibold text-gray-300">State €</th>
                        <th className="p-2 sm:p-3 text-right font-semibold text-gray-300">AE Pot</th>
                        <th className="p-2 sm:p-3 text-right font-semibold text-gray-300">PP Emp%</th>
                        <th className="p-2 sm:p-3 text-right font-semibold text-gray-300">PP Emp €</th>
                        <th className="p-2 sm:p-3 text-right font-semibold text-gray-300">PP Er €</th>
                        <th className="p-2 sm:p-3 text-right font-semibold text-gray-300">PP Pot</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((r) => (
                        <tr key={r.year} className="border-b border-gray-800 hover:bg-gray-800/50">
                            <td className="p-2 sm:p-3 text-left">{r.year}</td>
                            <td className="p-2 sm:p-3 text-right">{formatCurrency(r.salary)}</td>
                            <td className="p-2 sm:p-3 text-right">{formatPercent(r.aeRateEmp)}</td>
                            <td className="p-2 sm:p-3 text-right">{formatCurrency(r.aeEmp)}</td>
                            <td className="p-2 sm:p-3 text-right">{formatCurrency(r.aeEr)}</td>
                            <td className="p-2 sm:p-3 text-right">{formatCurrency(r.aeState)}</td>
                            <td className="p-2 sm:p-3 text-right font-semibold text-blue-400">{formatCurrency(r.aePot)}</td>
                            <td className="p-2 sm:p-3 text-right">{formatPercent(r.ppEmpRate)}</td>
                            <td className="p-2 sm:p-3 text-right">{formatCurrency(r.ppEmp)}</td>
                            <td className="p-2 sm:p-3 text-right">{formatCurrency(r.ppEr)}</td>
                            <td className="p-2 sm:p-3 text-right font-semibold text-green-400">{formatCurrency(r.ppPot)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
