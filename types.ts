
export interface SimulationInputs {
  age: number;
  retireAge: number;
  salary: number;
  salaryGrowth: number;
  aeStartPot: number;
  ppStartPot: number;
  growth: number;
  fees: number;
  aePhase: boolean;
  aeEmpRate: number;
  ppEmpRate: number;
  ppErRate: number;
  ppTaxRelief: number;
}

export interface YearlyData {
  year: number;
  salary: number;
  aeRateEmp: number;
  aeRateEr: number;
  aeEmp: number;
  aeEr: number;
  aeState: number;
  aeCredited: number;
  aeNetCost: number;
  ppEmpRate: number;
  ppErRate: number;
  ppEmp: number;
  ppEr: number;
  ppCredited: number;
  ppNetCost: number;
  aePot: number;
  ppPot: number;
}

export interface SimulationResult {
  rows: YearlyData[];
  aePot: number;
  ppPot: number;
}
