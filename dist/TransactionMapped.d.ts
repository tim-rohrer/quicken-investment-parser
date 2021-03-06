interface InvestmentTransactionFromQuickenExport {
    date: Date;
    type: string;
    action: string;
    securityName: string;
    securitySymbol: string;
    payee: string;
    category: string;
    commissionFee: number;
    sharesOut: number;
    sharesIn: number;
    shares: number;
    cashOut: number;
    cashIn: number;
    investAmt: number;
    amount: number;
    account: string;
    quickenData: Record<string, string>;
}
export default class TransactionMapped implements InvestmentTransactionFromQuickenExport {
    date: Date;
    type: string;
    action: string;
    securityName: string;
    securitySymbol: string;
    payee: string;
    category: string;
    commissionFee: number;
    sharesOut: number;
    sharesIn: number;
    shares: number;
    cashOut: number;
    cashIn: number;
    investAmt: number;
    amount: number;
    account: string;
    quickenData: Record<string, string>;
    constructor(qData: Record<string, string>);
}
export {};
