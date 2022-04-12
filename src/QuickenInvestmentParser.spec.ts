let fs = require("fs")
import csvParser from "csv-parser"
import { ErrImpl, OkImpl, Result } from "ts-results"
import QuickenInvestmentParser from "./QuickenInvestmentParser"
import TransactionMapped from "./TransactionMapped"
jest.mock("fs")

const quickenInvestmentFileContentsFixture = [
  {
    Date: "3/31/2016",
    Type: "Buy",
    Action: "",
    Security: "FDIC INSURED ACCOUNT - IRA",
    Symbol: "QRETQ",
    Payee: "FDIC INSURED ACCOUNT - IRA",
    "Statement Payee": "",
    Category: "Investments:Buy",
    "Comm/Fee": "",
    "Shares Out": "",
    "Shares In": "0.5",
    Shares: "0.5",
    "Cash Out": "0.50",
    "Cash In": "",
    "Invest Amt": "0.50",
    Amount: "-0.50",
    Account: "Emily's IRA",
    "Statement Memo": "",
    Reference: "",
  },
  {
    Date: "3/31/2016",
    Type: "Buy",
    Action: "",
    Security: "USAA Tax-Exempt Money Market Fund",
    Symbol: "USEXX",
    Payee: "USAA Tax-Exempt Money Market Fund",
    "Statement Payee": "",
    Category: "Investments:Buy",
    "Comm/Fee": "",
    "Shares Out": "",
    "Shares In": "0.09",
    Shares: "0.09",
    "Cash Out": "0.09",
    "Cash In": "",
    "Invest Amt": "0.09",
    Amount: "-0.09",
    Account: "Joint Brokerage",
    "Statement Memo": "",
    Reference: "",
  },
  {
    Date: "3/31/2016",
    Type: "Dividend Income",
    Action: "",
    Security: "USAA Tax-Exempt Money Market Fund",
    Symbol: "USEXX",
    Payee: "USAA Tax-Exempt Money Market Fund",
    "Statement Payee": "",
    Category: "Investments:Dividend Income Tax-Free",
    "Comm/Fee": "",
    "Shares Out": "",
    "Shares In": "",
    Shares: "",
    "Cash Out": "",
    "Cash In": "0.09",
    "Invest Amt": "",
    Amount: "0.09",
    Account: "Joint Brokerage",
    "Statement Memo": "",
    Reference: "",
  },
  {
    Date: "3/31/2016",
    Type: "Interest Income",
    Action: "",
    Security: "",
    Symbol: "",
    Payee: "",
    "Statement Payee": "",
    Category: "Investments:Interest Income",
    "Comm/Fee": "",
    "Shares Out": "",
    "Shares In": "",
    Shares: "",
    "Cash Out": "",
    "Cash In": "0.89",
    "Invest Amt": "",
    Amount: "0.89",
    Account: "Tim's IRA",
    "Statement Memo": "FDIC INSURED ACCOUNT - IRA INTEREST RECEIVED",
    Reference: "",
  },
  {
    Date: "3/31/2016",
    Type: "Buy",
    Action: "",
    Security: "FDIC INSURED ACCOUNT - IRA",
    Symbol: "QRETQ",
    Payee: "FDIC INSURED ACCOUNT - IRA",
    "Statement Payee": "",
    Category: "Investments:Buy",
    "Comm/Fee": "",
    "Shares Out": "",
    "Shares In": "0.89",
    Shares: "0.89",
    "Cash Out": "0.89",
    "Cash In": "",
    "Invest Amt": "0.89",
    Amount: "-0.89",
    Account: "Tim's IRA",
    "Statement Memo": "",
    Reference: "",
  },
  {
    Date: "4/29/2016",
    Type: "Interest Income",
    Action: "",
    Security: "",
    Symbol: "",
    Payee: "",
    "Statement Payee": "",
    Category: "Investments:Interest Income",
    "Comm/Fee": "",
    "Shares Out": "",
    "Shares In": "",
    Shares: "",
    "Cash Out": "",
    "Cash In": "0.49",
    "Invest Amt": "",
    Amount: "0.49",
    Account: "Emily's IRA",
    "Statement Memo": "FDIC INSURED ACCOUNT - IRA INTEREST RECEIVED",
    Reference: "",
  },
  {
    Date: "4/29/2016",
    Type: "Buy",
    Action: "",
    Security: "FDIC INSURED ACCOUNT - IRA",
    Symbol: "QRETQ",
    Payee: "FDIC INSURED ACCOUNT - IRA",
    "Statement Payee": "",
    Category: "Investments:Buy",
    "Comm/Fee": "",
    "Shares Out": "",
    "Shares In": "0.49",
    Shares: "0.49",
    "Cash Out": "0.49",
    "Cash In": "",
    "Invest Amt": "0.49",
    Amount: "-0.49",
    Account: "Emily's IRA",
    "Statement Memo": "",
    Reference: "",
  },
  {
    Date: "4/29/2016",
    Type: "Buy",
    Action: "",
    Security: "USAA Tax-Exempt Money Market Fund",
    Symbol: "USEXX",
    Payee: "USAA Tax-Exempt Money Market Fund",
    "Statement Payee": "",
    Category: "Investments:Buy",
    "Comm/Fee": "",
    "Shares Out": "",
    "Shares In": "0.09",
    Shares: "0.09",
    "Cash Out": "0.09",
    "Cash In": "",
    "Invest Amt": "0.09",
    Amount: "-0.09",
    Account: "Joint Brokerage",
    "Statement Memo": "",
    Reference: "",
  },
  {
    Date: "4/29/2016",
    Type: "Dividend Income",
    Action: "",
    Security: "USAA Tax-Exempt Money Market Fund",
    Symbol: "USEXX",
    Payee: "USAA Tax-Exempt Money Market Fund",
    "Statement Payee": "",
    Category: "Investments:Dividend Income Tax-Free",
    "Comm/Fee": "",
    "Shares Out": "",
    "Shares In": "",
    Shares: "",
    "Cash Out": "",
    "Cash In": "0.09",
    "Invest Amt": "",
    Amount: "0.09",
    Account: "Joint Brokerage",
    "Statement Memo": "",
    Reference: "",
  },
  {
    Date: "4/29/2016",
    Type: "Interest Income",
    Action: "",
    Security: "",
    Symbol: "",
    Payee: "",
    "Statement Payee": "",
    Category: "Investments:Interest Income",
    "Comm/Fee": "",
    "Shares Out": "",
    "Shares In": "",
    Shares: "",
    "Cash Out": "",
    "Cash In": "0.87",
    "Invest Amt": "",
    Amount: "0.87",
    Account: "Tim's IRA",
    "Statement Memo": "FDIC INSURED ACCOUNT - IRA INTEREST RECEIVED",
    Reference: "",
  },
  {
    Date: "4/29/2016",
    Type: "Buy",
    Action: "",
    Security: "FDIC INSURED ACCOUNT - IRA",
    Symbol: "QRETQ",
    Payee: "FDIC INSURED ACCOUNT - IRA",
    "Statement Payee": "",
    Category: "Investments:Buy",
    "Comm/Fee": "",
    "Shares Out": "",
    "Shares In": "0.87",
    Shares: "0.87",
    "Cash Out": "0.87",
    "Cash In": "",
    "Invest Amt": "0.87",
    Amount: "-0.87",
    Account: "Tim's IRA",
    "Statement Memo": "",
    Reference: "",
  },
]

describe("QuickenInvestmentParser", () => {
  it("returns an instance of itself", () => {
    const qp = new QuickenInvestmentParser<TransactionMapped>()

    expect(qp).toBeInstanceOf(QuickenInvestmentParser)
  })
  describe("fileExists", () => {
    it("returns true if file exists", () => {
      const qp = new QuickenInvestmentParser<TransactionMapped>()
      jest.spyOn(fs, "existsSync").mockReturnValue(true)

      expect(qp.fileExists()).toBe(true)
    })
    it("returns false if file is missing", () => {
      const qp = new QuickenInvestmentParser<TransactionMapped>()
      jest.spyOn(fs, "existsSync").mockReturnValue(false)

      expect(qp.fileExists()).toBe(false)
    })
  })
  describe("fileContents", () => {
    it("returns Ok with a successful fetch of file contents", () => {
      const mReadStream = {
        pipe: jest.fn().mockReturnThis(),
        on: jest.fn().mockImplementation((event, handler) => {
          handler()
          return this
        }),
      }
      fs.createReadStream.mockReturnValueOnce(mReadStream)

      const qp = new QuickenInvestmentParser<TransactionMapped>()
      const results = qp.fileContents()

      expect(fs.createReadStream).toBeCalledTimes(1)
      expect(mReadStream.pipe).toBeCalledTimes(1)
      expect(mReadStream.on).toBeCalledWith("data", expect.any(Function))
      expect(results.ok).toBe(true)
    })
    it("handles an error", () => {
      const mReadStream = {
        pipe: jest.fn().mockReturnThis(),
        on: jest.fn().mockImplementation(() => {
          throw new Error()
        }),
      }
      fs.createReadStream.mockReturnValueOnce(mReadStream)

      const qp = new QuickenInvestmentParser<TransactionMapped>()
      const results = qp.fileContents()

      expect(mReadStream.pipe).toBeCalledTimes(1)
      expect(results.err).toBe(true)
    })
  })
  describe("parsedData", () => {
    it("returns an array of length 11", () => {
      jest
        .spyOn(QuickenInvestmentParser.prototype, "fileContents")
        .mockReturnValue(<OkImpl<any>>{
          ok: true,
          err: false,
          val: quickenInvestmentFileContentsFixture,
        })
      const qp = new QuickenInvestmentParser<TransactionMapped>()

      const results = qp.parsedData()

      if (results.ok) {
        expect(results.val.length).toBe(11)
      } else console.error("Test failed!")
    })
    it("returns an Error if there are no data from the file", () => {
      jest
        .spyOn(QuickenInvestmentParser.prototype, "fileContents")
        .mockReturnValue(<ErrImpl<Error>>{
          ok: false,
          err: true,
          val: new Error("No data in csv file."),
        })
      const qp = new QuickenInvestmentParser<TransactionMapped>()

      const results = qp.parsedData()

      expect(results.val).toBeInstanceOf(Error)
      if (results.err) {
        expect(results.val.message).toBe("No data in csv file.")
      } else console.error("Test failed!")
    })
  })
})
