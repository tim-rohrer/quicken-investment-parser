import { promises as fsp } from "node:fs"
import neatCsv from "neat-csv"
import { Err, Ok, Result } from "ts-results-es"
import TransactionMapped from "./TransactionMapped.js"

export type CSVData = Record<string, string>[]
export type ParsedData = string[]
type RecordsResult = Result<CSVData, Error>
type StringsResult = Result<ParsedData, Error>

interface InvestmentParser {
  sourceFile: string
  csvFileContents(): Promise<RecordsResult>
  parsedData(): Promise<StringsResult>
}
export default class QuickenInvestmentParser implements InvestmentParser {
  sourceFile: string

  constructor(filePathName: string) {
    this.sourceFile = filePathName // should sanitize this
  }

  async csvFileContents(): Promise<Result<CSVData, Error>> {
    try {
      const data = await fsp.readFile(this.sourceFile, { encoding: "utf-8" })
      return Ok(await neatCsv(data))
    } catch (e) {
      return Err(e)
    }
  }

  async parsedData(): Promise<StringsResult> {
    const { ok, err, val } = await this.csvFileContents()
    if (err) return Err(val)
    const finalParsed: string[] = []
    if (ok && val === undefined) return Err(new Error("No data in csv file."))
    if (ok && val != undefined) {
      val.forEach((transaction: Record<string, string>) => {
        finalParsed.push(JSON.stringify(new TransactionMapped(transaction)))
      })
    }
    return Ok(finalParsed)
  }
}
