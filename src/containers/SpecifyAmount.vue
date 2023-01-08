<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import TextInput from '@/components/TextInput.vue'
import CurrencyExchange from './CurrencyExchange.vue'
</script>
<template>
  <div class="container">
    <CurrencyExchange />
    <TextInput
      class="ce-message"
      default-value="Please buy new clothes and have fun!"
      label="Title"
      help-text="Optional"
    />
    <div class="ce-cta-group">
      <AppButton class="ce-cta--left" variant="outlined"> Back </AppButton>
      <AppButton class="ce-cta--right" variant="contained" :disabled="true">
        Continue
      </AppButton>
    </div>
  </div>
</template>

<style lang="scss">
.container {
  width: 520px;
  background: #ffffff;
}

.ce-message {
  margin-top: 29px;
}

.ce-cta-group {
  display: flex;
  padding-left: 40px;
  padding-right: 40px;
  gap: 20px;
  margin-top: 20px;

  .ce-cta--left {
    flex-grow: 1;
    flex-basis: 40%;
  }

  .ce-cta--right {
    flex-grow: 1;
    flex-basis: 60%;
  }
}

@media screen and (max-width: 767px) {
  .container {
    width: 100%;
    padding-left: 16px;
    padding-right: 16px;
  }

  .ce-cta-group {
    padding: 0;
  }
}
</style>
