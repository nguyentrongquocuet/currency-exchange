import { GlobalState, MarketRates, UserAmount } from '@/types'
import { computed, reactive } from 'vue'

const repository = reactive<{ state: GlobalState }>({
  state: {
    baseCurrency: 'USD',
    user: {
      amount: {
        USD: 564.43,
      },
      name: 'quoc',
    },
    fees: {
      constrains: [
        {
          amount: 0,
          fee: 0.005,
        },
        {
          amount: 10,
          fee: 0.008,
        },
        {
          amount: 100,
          fee: 0.011,
        },
      ],
    },
    rates: {
      USD: 1,
      EUR: 0.815894,
      CAD: 1.204355,
      GBP: 0.70602,
      MXN: 19.88162,
      PLN: 3.66121,
    },
    currencyNames: {
      USD: 'Us dollar',
      EUR: 'Euro',
      PLN: 'Polish Zlotych',
      CAD: 'Canadian Dollars',
      MXN: 'Mexican Pesos',
      GBP: 'British pound sterling',
    },
  },
})

const methods = {
  init: (state: GlobalState) => {
    repository.state = state
  },
  setAmount: (amount: UserAmount) => {
    repository.state.user.amount = amount
  },
  updateAmount: (amount: UserAmount) => {
    repository.state.user.amount = {
      ...repository.state.user.amount,
      ...amount,
    }
  },
  setAmountFor: (input: { currency: string; amount: number }) => {
    repository.state.user.amount[input.currency] = input.amount
  },
  setRates: (rates: MarketRates) => {
    repository.state.rates = rates
  },
  updateRates: (rates: MarketRates) => {
    repository.state.rates = {
      ...repository.state.rates,
      ...rates,
    }
  },
} as const

type Methods = typeof methods

function commit<M extends keyof Methods, I = Parameters<Methods[M]>[0]>(
  method: M,
  input: I
) {
  methods[method](input as any)
}

const getters = {
  userAmount: () => repository.state.user.amount,
  userAmountOf: (currency: string) =>
    repository.state.user.amount[currency] || 0,
  /**
   * @returns Rate of 1 base currency to current currency
   */
  rateOf: (currency: string) => repository.state.rates[currency] || 0,
  /**
   * @param amount Amount of base currency
   */
  feeOf: (amount: number, currency: string) => {
    const rate = getters.rateOf(currency)
    const baseCurrencyAmount = amount / rate

    let fee = 0

    repository.state.fees.constrains.forEach((contrain) => {
      if (contrain.amount <= baseCurrencyAmount) {
        fee = contrain.fee
      }
    })

    return fee
  },
  feeAmountOf: (amount: number, currency: string) => {
    const fee = getters.feeOf(amount, currency)

    return amount * fee
  },
  /**
   * @returns Rate to convert from `currency1` to `currency2`
   */
  rateBetween: (currency1: string, currency2: string) => {
    const rateOfCurrency1 = getters.rateOf(currency1)
    const rateOfCurrency2 = getters.rateOf(currency2)

    return rateOfCurrency2 / rateOfCurrency1
  },
  currencyNameOf: (currency: string) => {
    return repository.state.currencyNames[currency] || ''
  },
  baseCurrency: () => repository.state.baseCurrency,
  availableCurrencies: () => Object.keys(repository.state.rates),
}

const store = {
  getters,
  commit,
  repository,
}

setInterval(() => {
  repository.state.user.amount.USD += 1
}, 2000)

export default store
