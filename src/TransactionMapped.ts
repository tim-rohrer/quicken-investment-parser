import { nanoid } from "nanoid"

interface InvestmentTransactionFromQuickenExport {
  transactionId: string
  date: Date
  type: string
  action: string
  securityName: string
  securitySymbol: string
  payee: string
  category: string
  commissionFee: number
  sharesOut: number
  sharesIn: number
  shares: number
  cashOut: number
  cashIn: number
  investAmt: number
  amount: number
  account: string
  quickenData: Record<string, string>
}

export default class TransactionMapped
  implements InvestmentTransactionFromQuickenExport
{
  transactionId: string
  date: Date
  type: string
  action: string
  securityName: string
  securitySymbol: string
  payee: string
  category: string
  commissionFee: number
  sharesOut: number
  sharesIn: number
  shares: number
  cashOut: number
  cashIn: number
  investAmt: number
  amount: number
  account: string
  quickenData: Record<string, string>

  constructor(qData: Record<string, string>) {
    this.transactionId = nanoid(10)
    this.quickenData = qData
    this.date = new Date(qData.Date)
    this.type = qData.Type
    this.action = qData.Action
    this.securityName = qData.Security
    this.securitySymbol = qData.Symbol
    this.payee = qData.Payee
    this.category = qData.Category
    this.commissionFee = parseFloat(qData["Comm/Fee"])
    this.sharesOut = parseFloat(qData["Shares Out"])
    this.sharesIn = parseFloat(qData["Shares In"])
    this.shares = parseFloat(qData.Shares)
    this.cashOut = parseFloat(qData["Cash Out"])
    this.cashIn = parseFloat(qData["Cash In"])
    this.investAmt = parseFloat(qData["Invest Amt"])
    this.amount = parseFloat(qData.Amount)
    this.account = qData.Account
  }
}
