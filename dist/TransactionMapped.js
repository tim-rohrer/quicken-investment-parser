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
        this.commissionFee = this.numberOf(qData["Comm/Fee"]);
        this.sharesOut = this.numberOf(qData["Shares Out"]);
        this.sharesIn = this.numberOf(qData["Shares In"]);
        this.shares = this.numberOf(qData.Shares);
        this.cashOut = this.numberOf(qData["Cash Out"]);
        this.cashIn = this.numberOf(qData["Cash In"]);
        this.investAmt = this.numberOf(qData["Invest Amt"]);
        this.amount = this.numberOf(qData.Amount);
        this.account = qData.Account;
    }
    numberOf(value) {
        const newValue = value.length > 0 ? value : "0";
        return parseFloat(newValue);
    }
}
//# sourceMappingURL=TransactionMapped.js.map