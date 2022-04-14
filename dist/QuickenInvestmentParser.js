import { promises as fsp } from "node:fs";
import neatCsv from "neat-csv";
import { Err, Ok } from "ts-results-es";
import TransactionMapped from "./TransactionMapped.js";
export default class QuickenInvestmentParser {
    constructor(filePathName) {
        this.sourceFile = filePathName; // should sanitize this
    }
    async csvFileContents() {
        try {
            const data = await fsp.readFile(this.sourceFile, { encoding: "utf-8" });
            return Ok(await neatCsv(data));
        }
        catch (e) {
            return Err(e);
        }
    }
    async parsedData() {
        const { ok, err, val } = await this.csvFileContents();
        if (err)
            return Err(val);
        const finalParsed = [];
        if (ok && val === undefined)
            return Err(new Error("No data in csv file."));
        if (ok && val != undefined) {
            val.forEach((transaction) => {
                finalParsed.push(JSON.stringify(new TransactionMapped(transaction)));
            });
        }
        return Ok(finalParsed);
    }
}
//# sourceMappingURL=QuickenInvestmentParser.js.map