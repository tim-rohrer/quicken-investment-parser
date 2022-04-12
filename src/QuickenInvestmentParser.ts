import fs from "fs"
import csv from "csv-parser"
import { Err, Ok, Result } from "ts-results"
import TransactionMapped from "./TransactionMapped"

interface InvestmentParser<T> {
  fileExists(): boolean
  fileContents(): Result<Record<string, string>[] | undefined, Error>
  parsedData(): Result<string[], Error>
}
export default class QuickenInvestmentParser<T> implements InvestmentParser<T> {
  fileExists(): boolean {
    return fs.existsSync("./export.csv") ? true : false
  }

  fileContents(): Result<Record<string, string>[] | undefined, Error> {
    const results: Record<string, string>[] = []

    try {
      fs.createReadStream("./export.csv")
        .pipe(csv())
        .on("data", (data) => results.push(data))
      return Ok(results)
    } catch (e) {
      console.error(e)
      if (e instanceof Error) {
        return Err(e)
      } else return Err(new Error("Unknown error"))
    }
  }

  parsedData(): Result<string[], Error> {
    const data = this.fileContents()
    const { ok, err, val } = data
    if (err) return Err(val)
    const finalParsed: string[] = []
    if (ok && val === undefined) return Err(new Error("No data in csv file."))
    if (ok && val != undefined) {
      val.forEach((transaction) => {
        finalParsed.push(JSON.stringify(new TransactionMapped(transaction)))
      })
    }
    return Ok(finalParsed)
  }
}
