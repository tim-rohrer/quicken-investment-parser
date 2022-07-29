import { nanoid } from "nanoid";
export default class TransactionMapped {
    constructor(qData) {
        this.transactionId = nanoid(10);
        this.quickenData = qData;
        this.date = new Date(qData.Date);
        this.type = qData.Type;
        this.action = qData.Action;
        this.securityName = qData.Security;
        this.securitySymbol = qData.Symbol;
        this.payee = qData.Payee;
        this.category = qData.Category;
        this.commissionFee = parseFloat(qData["Comm/Fee"]);
        this.sharesOut = parseFloat(qData["Shares Out"]);
        this.sharesIn = parseFloat(qData["Shares In"]);
        this.shares = parseFloat(qData.Shares);
        this.cashOut = parseFloat(qData["Cash Out"]);
        this.cashIn = parseFloat(qData["Cash In"]);
        this.investAmt = parseFloat(qData["Invest Amt"]);
        this.amount = parseFloat(qData.Amount);
        this.account = qData.Account;
    }
}
//# sourceMappingURL=TransactionMapped.js.map