<script setup lang="ts">
import store from '@/store'
import FeesSection from '@/components/FeesSection.vue'
import CurrencySelector from '@/components/CurrencySelector.vue'
import TextInput from '@/components/TextInput.vue'
import { useExchange } from '@/composable'
import { ref } from 'vue'
import CurrencyInput from '@/components/CurrencyInput.vue'

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
const output = useExchange(inputState)

const userAmount = store.getters.userAmountOf(inputState.value.from)
</script>

<template>
  <div class="container">
    <div class="ce-container">
      <!-- Input -->
      <div class="ce-amount-currency ce-amount-currency-input">
        <div class="ce-currency">
          <CurrencySelector
            @change="(c) => (inputState.from = c)"
            :currency="inputState.from"
            class="ce-input-selector"
          >
            <template #label>
              <div class="cs-user-amount">
                <span
                  :title="userAmount.toString()"
                  class="cs-user-amount__amount"
                >
                  {{ userAmount }}
                </span>
                <span class="cs-user-amount__caption"> Available </span>
              </div>
            </template>
          </CurrencySelector>
        </div>
        <div class="ce-amount">
          <CurrencyInput
            :value="inputState.amount"
            @input="(v) => (inputState.amount = Number.parseFloat(v))"
            label="You send"
          />
        </div>
      </div>

      <!-- Fees -->
      <FeesSection
        class="ce-fees"
        :in-currency="inputState.from"
        :out-currency="inputState.to"
        :fee-amount="output.feeAmount"
        :rate="output.rate"
      />

      <!-- Output -->
      <div class="ce-amount-currency ce-amount-currency-output">
        <div class="ce-currency">
          <CurrencySelector
            :currency="inputState.to"
            @change="(c) => (inputState.to = c)"
          />
        </div>
        <div class="ce-amount">
          <TextInput
            :readonly="true"
            :value="output.amountAfterExchange"
            label="You get"
          />
        </div>
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

  .ce-amount {
    padding-top: 18px;
    align-items: flex-start;
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
    max-width: 75px;
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

.message {
  margin-top: 29px;
}

@media screen and (max-width: 767px) {
  .ce-container {
    width: 100%;
    padding-left: 16px;
    padding-right: 16px;

    &::before {
      width: calc(100% - 2 * 16px);
      left: 16px;
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
      max-width: 160px;
    }
  }
}
</style>