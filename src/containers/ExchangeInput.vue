<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import store from '@/store'
import { toNumber } from '@/utils'
import CurrencyInput from '@/components/CurrencyInput.vue'
import CurrencySelector from '@/components/CurrencySelector.vue'

const NOT_ENOUGH_MONEY = "You don't have enough money!"

interface InputState {
  amount: number
  from: string
}

const emit = defineEmits<{
  (name: 'change', state: InputState): void
}>()

const inputState = ref<InputState>({
  amount: 0,
  from: store.getters.baseCurrency(),
})

const error = ref('')

const userAmount = computed(() =>
  store.getters.userAmountOf(inputState.value.from)
)

const availableCurrencies = computed(() => store.getters.availableCurrencies())

const onAmountChange = (amount: number) => {
  if (amount > userAmount.value) {
    error.value = NOT_ENOUGH_MONEY
    return
  } else {
    error.value = ''
  }

  inputState.value.amount = amount
  emit('change', inputState.value)
}

const onCurrencyChange = (currency: string) => {
  inputState.value.from = currency
  onAmountChange(inputState.value.amount)
}
</script>

<template>
  <div class="ce-amount-currency ce-amount-currency-input">
    <div class="ce-currency">
      <CurrencySelector
        @change="onCurrencyChange"
        :currency="inputState.from"
        class="ce-input-selector"
        :available-currencies="availableCurrencies"
      >
        <template #label>
          <div class="cs-user-amount">
            <span :title="userAmount.toString()" class="cs-user-amount__amount">
              {{ userAmount }}
            </span>
            <span class="cs-user-amount__caption"> Available </span>
          </div>
        </template>
      </CurrencySelector>
    </div>
    <div class="ce-amount">
      <div class="ce-amount__input">
        <CurrencyInput
          :value="inputState.amount"
          @input="onAmountChange"
          label="You send"
        />
        <span class="ce-input-error" role="error">
          {{ error }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.ce-amount__input {
  position: relative;

  .ce-input-error {
    position: absolute;
    display: block;
    bottom: -15px;
    font-size: 11px;
    line-height: 12px;
    opacity: 1;
    transition: opacity 0.3s linear;
    color: #ff6a00;
    padding-left: 14px;

    &:empty {
      opacity: 0;
    }
  }
}
</style>
