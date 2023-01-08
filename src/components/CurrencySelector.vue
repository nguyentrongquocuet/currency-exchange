<script setup lang="ts">
import { ref } from 'vue'
import store from '@/store'
import { useClickOutside } from '@/composable'
import ArrowDown from '@/assets/ArrowDown.svg?component'

const props = defineProps<{
  currency?: string
  label?: string
  availableCurrencies: string[]
}>()

const emit = defineEmits<{
  (name: 'change', currency: string): void
}>()

const getCurrencyIconUrl = (currency: string) => `./${currency}_Balance.svg`

const expanded = ref(false)

const wrapperRef = ref<HTMLDivElement | null>(null)

const closeDropdown = () => (expanded.value = false)
const openDropdown = () => (expanded.value = true)

useClickOutside(wrapperRef, closeDropdown)

const onSelectCurrency = (newCurrency: string) => {
  emit('change', newCurrency)
  closeDropdown()
}
</script>

<template>
  <div
    :aria-label="props.label"
    :aria-expanded="expanded"
    class="ce-cs"
    ref="wrapperRef"
  >
    <!-- Label -->
    <div @click.prevent="openDropdown" class="ce-cs__label">
      <div class="ce-cs__selected-currency" v-if="props.currency">
        <img
          :src="getCurrencyIconUrl(props.currency)"
          alt="currency"
          :title="store.getters.currencyNameOf(props.currency)"
        />
        <span> {{ props.currency }}</span>
      </div>
      <div class="ce-cs__placeholder" v-else>
        <span>Currency</span>
      </div>
      <slot name="label" />
      <span class="ce-cs__arrow">
        <ArrowDown />
      </span>
    </div>
    <!-- Dropdown -->
    <div v-if="expanded" class="ce-popover">
      <ul class="ce-cs__dropdown">
        <template :key="currency" v-for="currency in props.availableCurrencies">
          <li
            :class="{ selected: currency === props.currency }"
            @click="() => onSelectCurrency(currency)"
          >
            <img :src="getCurrencyIconUrl(currency)" />
            <span class="ce-cs__currency-code">
              {{ currency }}
            </span>
            <span class="ce-cs__currency-name">
              {{ store.getters.currencyNameOf(currency) }}
            </span>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
.ce-cs {
  position: relative;
  z-index: 1;
  overflow: visible;
  height: 100%;

  .ce-cs__arrow {
    margin-left: auto;
    transition: transform 0.2s ease-in-out;
  }

  &[aria-expanded='true'] .ce-cs__arrow {
    transform: rotate(180deg);
    color: #234afb;
  }
}

.ce-cs__label {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 24px 15px;
  cursor: pointer;
  box-shadow: 0px 3px 7px #d7d9de;
  border-radius: 8px 0 0 8px;
  overflow: hidden;
}

.ce-cs__selected-currency {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  font-family: Montserrat;
  font-size: 15px;
  line-height: 27px;
  text-align: center;

  img {
    width: 40px;
    height: 24px;
  }
}

.ce-popover {
  width: fit-content;
  position: absolute;
  left: 0;
  top: 120px;
  display: block;
  z-index: 1000;
}

.ce-cs__dropdown {
  list-style: none;
  background: #ffffff;
  box-shadow: 0px 3px 7px #d7d9de;
  border-radius: 4px;
  max-width: 300px;
  height: 150px;
  overflow-y: auto;
  padding: 4px;
  width: max-content;

  &::-webkit-scrollbar {
    display: none;
  }

  li {
    padding: 8px;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;

    img {
      width: 32px;
    }

    .ce-cs__currency-code {
      width: 3ch;
    }

    &:hover,
    &.selected {
      background-color: #edf6ff;
    }

    &:not(:first-child) {
      margin-top: 4px;
    }
  }
}

@media screen and (max-width: 767px) {
  .ce-cs__label {
    padding: 16px 15px;
    border-radius: 8px 8px 0 0;
  }

  .ce-cs__selected-currency {
    flex-direction: row;
    gap: 8px;
  }

  .ce-cs__dropdown {
    width: 280px;
  }
}
</style>
