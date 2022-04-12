"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const ts_results_1 = require("ts-results");
const TransactionMapped_1 = __importDefault(require("./TransactionMapped"));
class QuickenInvestmentParser {
    fileExists() {
        return fs_1.default.existsSync("./export.csv") ? true : false;
    }
    fileContents() {
        const results = [];
        try {
            fs_1.default.createReadStream("./export.csv")
                .pipe((0, csv_parser_1.default)())
                .on("data", (data) => results.push(data));
            return (0, ts_results_1.Ok)(results);
        }
        catch (e) {
            console.error(e);
            if (e instanceof Error) {
                return (0, ts_results_1.Err)(e);
            }
            else
                return (0, ts_results_1.Err)(new Error("Unknown error"));
        }
    }
    parsedData() {
        const data = this.fileContents();
        const { ok, err, val } = data;
        if (err)
            return (0, ts_results_1.Err)(val);
        const finalParsed = [];
        if (ok && val === undefined)
            return (0, ts_results_1.Err)(new Error("No data in csv file."));
        if (ok && val != undefined) {
            val.forEach((transaction) => {
                finalParsed.push(JSON.stringify(new TransactionMapped_1.default(transaction)));
            });
        }
        return (0, ts_results_1.Ok)(finalParsed);
    }
}
exports.default = QuickenInvestmentParser;
//# sourceMappingURL=QuickenInvestmentParser.js.map