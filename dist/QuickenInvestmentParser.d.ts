import { Result } from "ts-results-es";
export declare type CSVData = Record<string, string>[];
export declare type ParsedData = string[];
declare type RecordsResult = Result<CSVData, Error>;
declare type StringsResult = Result<ParsedData, Error>;
interface InvestmentParser {
    sourceFile: string;
    csvFileContents(): Promise<RecordsResult>;
    parsedData(): Promise<StringsResult>;
}
export default class QuickenInvestmentParser implements InvestmentParser {
    sourceFile: string;
    constructor(filePathName: string);
    csvFileContents(): Promise<Result<CSVData, Error>>;
    parsedData(): Promise<StringsResult>;
}
export {};
