# quicken-investment-parser

Parses an exported csv file from Quicken into a manageable form.

The purpose is to specifically take exported investment information and use nodejs to clean it up into a form compliant with the following interface:

## ESM

This module is pure ESM
## Note: interfaces are not currently implemented as below

```ts
interface InvestmentPositions {
  date: Date
  type: string // should be an enum to be defined
  action: string // ditto
  payee: string
  accountName: string
  securityName: string
  ticker: string
  cashIn: number
  cashOut: number
  investAmount: number // this probably isn't right yet
  statementMemo: string
  reference: string
  lotInfo: LotInfo[]
}
```

where `LotInfo` is of:

```ts
type LotInfo = {
  dateModified = Date
  sharesIn = number
  sharesOut = number
  shares
 }
```
