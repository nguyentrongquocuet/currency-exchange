<script setup lang="ts">
import { ref } from 'vue'
import store from '@/store'
import { useExchange } from '@/composable'
import FeesSection from '@/components/FeesSection.vue'
import CurrencySelector from '@/components/CurrencySelector.vue'
import TextInput from '@/components/TextInput.vue'
import ExchangeInput from './ExchangeInput.vue'

interface InputState {
  amount: number
  from: string
  to: string
}

const inputState = ref<InputState>({
  amount: 0,
  from: 'USD',
  to: 'USD',
})

const debounce = (fn: any, time = 500) => {
  let timeout: number

  const newFn = (...inputs: any) => {
    window.clearTimeout(timeout)
    timeout = window.setTimeout(fn, time, ...inputs)
  }

  return newFn
}

const isLoading = ref(false)
const hasError = ref(false)

const output = useExchange(inputState)
const availableCurrencies = store.getters.availableCurrencies()

const debouncedSetState = debounce((newState: InputState) => {
  isLoading.value = false
  inputState.value = newState
}, 500)

const onPickInputMoney = (update: Pick<InputState, 'amount' | 'from'>) => {
  const newState = {
    ...inputState.value,
    ...update,
  }
  isLoading.value = true
  hasError.value = false
  debouncedSetState(newState)
}

const onError = () => (hasError.value = true)
</script>

<template>
  <div class="ce-container">
    <!-- Input -->
    <ExchangeInput @change="onPickInputMoney" @error="onError" />
    <!-- Fees -->
    <FeesSection
      class="ce-fees"
      :in-currency="inputState.from"
      :out-currency="inputState.to"
      :fee-amount="output.feeAmount"
      :rate="output.rate"
      :loading="isLoading || hasError"
    />

    <!-- Output -->
    <div class="ce-amount-currency ce-amount-currency-output">
      <div class="ce-currency">
        <CurrencySelector
          :currency="inputState.to"
          @change="(c) => (inputState.to = c)"
          :available-currencies="availableCurrencies"
        />
      </div>
      <div class="ce-amount">
        <TextInput
          :readonly="true"
          :value="hasError ? 0 : output.amountAfterExchange"
          label="Recipient gets"
          help-text="Exchange rate might change when user receives the fund"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.ce-container {
  position: relative;
  z-index: 1;

  &::before {
    content: '';
    display: block;
    background-color: #edf6ff;
    height: 100%;
    width: calc(100% - 2 * 37px);
    height: calc(100% - 8px);
    position: absolute;
    top: 4px;
    left: 37px;
  }
}

.ce-amount-currency {
  display: flex;
  gap: 6px;
  position: relative;
  z-index: 1;
}

.ce-amount-currency-input {
  z-index: 2;
  /* Make it pixel perfect :D */
  .ce-cs__selected-currency {
    position: relative;
    /* 28 - 24(padding) */
    top: 4px;
  }

  .cs-user-amount {
    position: relative;
    top: -3px;
  }
}

.ce-amount-currency-output {
  /* Make it pixel perfect :D */
  .ce-cs__selected-currency {
    position: relative;
    /* 27 - 24(padding) */
    top: 3px;
    /* 76 - 15(padding) */
    left: 61px;
  }

  .ce-cs__arrow {
    position: relative;
    /* 38(auto center) - 31 */
    top: -7px;
  }
}

.ce-currency {
  flex-grow: 1;
  background: #ffffff;
}

.ce-amount {
  box-shadow: 0px 3px 7px #d7d9de;
  border-radius: 0 8px 8px 0;
  display: flex;
  align-items: center;
  width: 307px;
  padding-left: 27px;
  padding-right: 24px;
  background: #ffffff;
}

.ce-input-selector {
  .ce-cs__label {
    padding-left: 26px;
  }
}

.cs-user-amount {
  display: flex;
  flex-direction: column;
  font-family: Montserrat;
  margin-left: 20px;
  margin-right: 10px;

  &__amount {
    font-size: 22px;
    line-height: 27px;
    font-weight: 600;
    width: 70px;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &__cation {
    font-size: 15px;
    line-height: 27px;
    font-weight: 600;
  }
}

.ce-fees {
  margin-left: 37px;
  margin-right: 37px;
}

@media screen and (max-width: 767px) {
  .ce-container {
    &::before {
      width: 100%;
      padding: 0;
      left: 0;
    }
  }

  .ce-amount-currency {
    flex-direction: column;

    .ce-amount {
      width: 100%;
      padding: 20px;
      border-radius: 0 0 8px 8px;
    }

    .ce-currency {
      width: 100%;
    }
  }
  .cs-user-amount {
    &__amount {
      width: 160px;
    }
  }
}
</style>
