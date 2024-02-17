export interface SimpleAnalytics {
    LabelsDates: string[];
    simpleReceitasList: SimpleReceitas[];
    simpleDespesasList: SimpleDespesas[];
}

export interface SimpleReceitas {
    dateMothYear: string;
    valTotMothYear: number;
}
export interface SimpleDespesas {
    dateMothYear: string;
    valTotMothYear: number;
}