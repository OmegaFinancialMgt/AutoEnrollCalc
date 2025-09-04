
import type { SimulationInputs, SimulationResult, YearlyData } from '../types';

const clamp = (x: number, min: number, max: number): number => Math.min(Math.max(x, min), max);

// Phase-in schedule: yrs 1-3:1.5%, 4-6:3%, 7-9:4.5%, 10+:6%
function getAeEmployeeRateForYear(year: number, isPhased: boolean, fixedRate: number): number {
    if (!isPhased) return fixedRate / 100;
    if (year <= 3) return 0.015;
    if (year <= 6) return 0.03;
    if (year <= 9) return 0.045;
    return 0.06;
}

export const simulatePension = (inputs: SimulationInputs): SimulationResult => {
    const years = clamp(inputs.retireAge - inputs.age, 0, 60);
    const netGrowth = (inputs.growth - inputs.fees) / 100;
    const salaryGrowth = inputs.salaryGrowth / 100;

    let salary = inputs.salary;
    let aePot = inputs.aeStartPot;
    let ppPot = inputs.ppStartPot;

    const rows: YearlyData[] = [];
    if (years === 0) {
        return { rows: [], aePot, ppPot };
    }

    for (let y = 1; y <= years; y++) {
        const aeRateEmp = getAeEmployeeRateForYear(y, inputs.aePhase, inputs.aeEmpRate);
        const aeRateEr = aeRateEmp; // Mirrors employee contribution
        const aeEmp = salary * aeRateEmp;
        const aeEr = salary * aeRateEr;
        const aeState = aeEmp / 3; // €1 for every €3 from employee
        const aeCredited = aeEmp + aeEr + aeState;
        const aeNetCost = aeEmp; // Paid after-tax, so net cost is the full amount

        const ppRateEmp = inputs.ppEmpRate / 100;
        const ppRateEr = inputs.ppErRate / 100;
        const ppEmp = salary * ppRateEmp;
        const ppEr = salary * ppRateEr;
        const ppCredited = ppEmp + ppEr;
        const ppNetCost = ppEmp * (1 - inputs.ppTaxRelief); // Cost reduced by tax relief

        aePot = (aePot + aeCredited) * (1 + netGrowth);
        ppPot = (ppPot + ppCredited) * (1 + netGrowth);

        rows.push({
            year: y,
            salary,
            aeRateEmp,
            aeRateEr,
            aeEmp,
            aeEr,
            aeState,
            aeCredited,
            aeNetCost,
            ppEmpRate: ppRateEmp,
            ppErRate: ppRateEr,
            ppEmp,
            ppEr,
            ppCredited,
            ppNetCost,
            aePot,
            ppPot,
        });

        // Increase salary for the next year
        salary *= (1 + salaryGrowth);
    }

    return { rows, aePot, ppPot };
};
