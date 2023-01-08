import store from '@/store'
import { ref, Ref, watch } from 'vue'

interface Input {
  amount: number
  from: string
  to: string
}

interface Output {
  feeAmount: number
  rate: number
  amountAfterExchange: number
}

export const useExchange = (input: Ref<Input>) => {
  const output = ref<Output>({
    amountAfterExchange: 0,
    feeAmount: 0,
    rate: 0,
  })

  watch(
    input,
    () => {
      console.log('calling hook')

      const feeAmount = store.getters.feeAmountOf(
        input.value.amount,
        input.value.from
      )
      const leftOver = input.value.amount - feeAmount
      const rate = store.getters.rateBetween(input.value.from, input.value.to)

      const amountAfterExchange = leftOver * rate

      output.value = {
        amountAfterExchange,
        feeAmount,
        rate,
      }
    },
    {
      deep: true,
    }
  )

  return output
}
