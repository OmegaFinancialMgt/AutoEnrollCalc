
import React, { useState, useCallback, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { SimulationInputs, SimulationResult, YearlyData } from './types';
import { simulatePension } from './services/pensionService';
import { Card } from './components/Card';
import { InputGroup, SelectGroup, SwitchGroup } from './components/FormControls';
import { KpiCard } from './components/KpiCard';
import { ResultsTable } from './components/ResultsTable';

const initialInputs: SimulationInputs = {
    age: 30,
    retireAge: 66,
    salary: 60000,
    salaryGrowth: 3,
    aeStartPot: 0,
    ppStartPot: 0,
    growth: 5,
    fees: 0.8,
    aePhase: true,
    aeEmpRate: 6,
    ppEmpRate: 10,
    ppErRate: 6,
    ppTaxRelief: 0.40,
};

const App: React.FC = () => {
    const [inputs, setInputs] = useState<SimulationInputs>(initialInputs);
    const [results, setResults] = useState<SimulationResult | null>(null);
    const [showTable, setShowTable] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        
        let processedValue: string | number | boolean;
        if (type === 'checkbox') {
            processedValue = (e.target as HTMLInputElement).checked;
        } else if (type === 'number') {
            processedValue = value === '' ? '' : Number(value);
        } else {
            processedValue = value;
        }

        setInputs(prev => ({ ...prev, [name]: processedValue }));
    };

    const calculate = useCallback(() => {
        const result = simulatePension(inputs);
        setResults(result);
    }, [inputs]);

    const reset = () => {
        setInputs(initialInputs);
        setResults(null);
        setShowTable(false);
    };

    // Perform initial calculation on load
    React.useEffect(() => {
        calculate();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { delta, deltaNote, isPrivateHigher } = useMemo(() => {
        if (!results) return { delta: 0, deltaNote: '', isPrivateHigher: false };
        const delta = results.ppPot - results.aePot;
        const isPrivateHigher = delta >= 0;
        const deltaNote = isPrivateHigher ? 'Private projects higher than AE.' : 'AE projects higher than Private.';
        return { delta, deltaNote, isPrivateHigher };
    }, [results]);

    const formatCurrency = (value: number) => new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#050914] via-[#0a1224] to-[#0b1427] text-gray-200 font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h1 className="text-xl sm:text-2xl font-bold text-white">Auto-Enrolment vs Private Pension — Ireland</h1>
                    <span className="text-xs font-medium bg-[#0a2540] border border-[#194569] text-[#c6e1ff] px-3 py-1.5 rounded-full">
                        Illustrative calculator • Not financial advice
                    </span>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Inputs Column */}
                    <Card title="Inputs">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputGroup label="Current Age" name="age" type="number" value={inputs.age} onChange={handleInputChange} />
                            <InputGroup label="Target Retirement Age" name="retireAge" type="number" value={inputs.retireAge} onChange={handleInputChange} />
                            <InputGroup label="Gross Annual Salary (€)" name="salary" type="number" value={inputs.salary} onChange={handleInputChange} step={1000} />
                            <InputGroup label="Expected Salary Growth (%/yr)" name="salaryGrowth" type="number" value={inputs.salaryGrowth} onChange={handleInputChange} step={0.1} />
                            <InputGroup label="Current Pension Pot – AE (€)" name="aeStartPot" type="number" value={inputs.aeStartPot} onChange={handleInputChange} step={100} />
                            <InputGroup label="Current Pension Pot – Private (€)" name="ppStartPot" type="number" value={inputs.ppStartPot} onChange={handleInputChange} step={100} />
                            <InputGroup label="Expected Investment Return (%/yr)" name="growth" type="number" value={inputs.growth} onChange={handleInputChange} step={0.1} />
                            <InputGroup label="Annual Fees/Charges (%/yr)" name="fees" type="number" value={inputs.fees} onChange={handleInputChange} step={0.05} help="Applied to both scenarios." />
                        </div>
                        
                        <div className="h-px bg-gray-800 my-6"></div>

                        <h3 className="text-lg font-semibold mb-3 text-white">Auto-Enrolment Settings</h3>
                        <SwitchGroup label="Use statutory phase-in" name="aePhase" checked={inputs.aePhase} onChange={handleInputChange} help="Yrs 1-3: 1.5%, 4-6: 3%, 7-9: 4.5%, 10+: 6%" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <InputGroup label="AE Employee Rate (if not phased) %" name="aeEmpRate" type="number" value={inputs.aeEmpRate} onChange={handleInputChange} step={0.1} disabled={inputs.aePhase} />
                            <InputGroup label="AE Employer Rate (mirrors employee) %" name="aeErRate" type="number" value={inputs.aeEmpRate} onChange={() => {}} disabled={true} />
                        </div>
                        <p className="text-xs text-blue-300 mt-2">State top-up = €1 per €3 employee contribution (≈33.33%) is added automatically.</p>


                        <div className="h-px bg-gray-800 my-6"></div>
                        <h3 className="text-lg font-semibold mb-3 text-white">Private Pension Settings</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputGroup label="Employee Contribution %" name="ppEmpRate" type="number" value={inputs.ppEmpRate} onChange={handleInputChange} step={0.1} />
                            <InputGroup label="Employer Contribution %" name="ppErRate" type="number" value={inputs.ppErRate} onChange={handleInputChange} step={0.1} />
                            <SelectGroup label="Income Tax Relief Rate" name="ppTaxRelief" value={inputs.ppTaxRelief} onChange={handleInputChange} options={[ {value: 0.20, label: '20%'}, {value: 0.40, label: '40%'} ]} />
                            <SelectGroup label="Show Year-by-Year Table" name="showTable" value={showTable.toString()} onChange={(e) => setShowTable(e.target.value === 'true')} options={[ {value: 'false', label: 'No'}, {value: 'true', label: 'Yes'} ]} />
                        </div>

                        <div className="mt-6 flex flex-wrap items-center gap-4">
                            <button onClick={calculate} className="px-5 py-2.5 font-semibold text-white bg-gradient-to-r from-blue-600 to-green-500 rounded-lg hover:opacity-90 transition-opacity">Calculate</button>
                            <button onClick={reset} className="px-5 py-2.5 font-semibold text-white bg-[#111f3a] border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors">Reset</button>
                            <p className="text-xs text-blue-300 flex-1 min-w-[200px]">AE pot is locked until State Pension Age; Private typically accessible earlier.</p>
                        </div>
                    </Card>

                    {/* Summary Column */}
                    <div className="flex flex-col gap-6">
                        <Card title="Summary">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                               <KpiCard label="Projected Pot at Retirement — Auto-Enrolment" value={formatCurrency(results?.aePot ?? 0)} footer="Includes employer match + State top-up" footerAsPill />
                               <KpiCard label="Projected Pot at Retirement — Private" value={formatCurrency(results?.ppPot ?? 0)} footer="Includes tax relief + employer contributions" footerAsPill />
                               <KpiCard label="Difference (Private − AE)" value={`${isPrivateHigher ? '▲' : '▼'} ${formatCurrency(Math.abs(delta))}`} footer={deltaNote} footerColor={isPrivateHigher ? 'text-green-400' : 'text-red-400'} />
                            </div>
                            <div className="mt-6 h-64 sm:h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={results?.rows} margin={{ top: 5, right: 10, left: -5, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                                        <XAxis dataKey="year" tick={{ fill: '#9ca3af' }} tickLine={{ stroke: '#374151' }} />
                                        <YAxis tickFormatter={(val) => formatCurrency(val as number)} tick={{ fill: '#9ca3af', fontSize: '0.75rem' }} tickLine={{ stroke: '#374151' }} width={80} />
                                        <Tooltip contentStyle={{ backgroundColor: '#0b1220', border: '1px solid #1f2937' }} labelStyle={{ color: '#e5e7eb' }} />
                                        <Legend wrapperStyle={{ color: '#d1d5db' }} />
                                        <Line type="monotone" dataKey="aePot" name="Auto-Enrolment" stroke="#3b82f6" strokeWidth={2} dot={false} />
                                        <Line type="monotone" dataKey="ppPot" name="Private" stroke="#22c55e" strokeWidth={2} dot={false} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                        <Card title="Annual Out-of-Pocket (Employee, Year 1)">
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <KpiCard label="AE Net Employee Cost" value={formatCurrency(results?.rows[0]?.aeNetCost ?? 0)} footer="No tax relief; State adds ~33.33% to your contribution inside the pot." />
                                <KpiCard label="Private Net Employee Cost" value={formatCurrency(results?.rows[0]?.ppNetCost ?? 0)} footer="Tax relief reduces take-home cost." />
                            </div>
                        </Card>
                    </div>
                </main>
                
                {showTable && results && (
                    <div className="mt-6">
                         <Card title="Year-by-Year Projection">
                            <p className="text-sm text-gray-400 mb-4">All amounts are approximate. Salary grows annually by the chosen rate.</p>
                            <ResultsTable rows={results.rows} />
                         </Card>
                    </div>
                )}

                <footer className="mt-8 text-center text-xs text-gray-500">
                    Disclaimer: For education/illustration only. It does not account for Revenue limits, provider-specific charges, PRSI/USC, or future rule changes. Seek regulated financial advice before making decisions.
                </footer>
            </div>
        </div>
    );
};

export default App;
