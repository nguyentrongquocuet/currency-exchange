export interface User {
  name: string
  amount: UserAmount
}

export interface UserAmount {
  // TODO: deal with big number
  [Currency: string]: number
}

/**
 * Apply `fee` when user amount greater than or equal(considering 6 digits of decimal) `amount`
 */
export interface FeeConstrain {
  amount: number
  fee: number
}

export interface MarketFees {
  constrains: FeeConstrain[]
}

export interface MarketRates {
  [Currency: string]: number
}

export interface CurrencyNames {
  [Currency: string]: string
}

export interface GlobalState {
  user: User
  fees: MarketFees
  rates: MarketRates
  baseCurrency: string
  currencyNames: CurrencyNames
}
