import { Result } from "ts-results";
interface InvestmentParser<T> {
    fileExists(): boolean;
    fileContents(): Result<Record<string, string>[] | undefined, Error>;
    parsedData(): Result<string[], Error>;
}
export default class QuickenInvestmentParser<T> implements InvestmentParser<T> {
    fileExists(): boolean;
    fileContents(): Result<Record<string, string>[] | undefined, Error>;
    parsedData(): Result<string[], Error>;
}
export {};
