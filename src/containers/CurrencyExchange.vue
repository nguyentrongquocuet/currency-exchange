<script setup lang="ts">
import FeesSection from '@/components/FeesSection.vue'
import SelectInput from '@/components/SelectInput.vue'
import TextInput from '@/components/TextInput.vue'
</script>

<template>
  <div class="ce-container">
    <!-- Input -->
    <div class="ce-amount-currency">
      <div class="ce-currency">
        <SelectInput />
      </div>
      <div class="ce-amount">
        <TextInput label="You send" />
      </div>
    </div>

    <!-- Fees -->
    <FeesSection class="ce-fees" />
    <!-- Output -->
    <div class="ce-amount-currency">
      <div class="ce-currency">
        <SelectInput />
      </div>
      <div class="ce-amount">
        <TextInput label="You get" />
      </div>
    </div>

    <TextInput
      label="Title"
      default-value="Please buy new clothes and have fund!"
      help-text="Optional."
    />

    <div class="ce-process ce-btn-group">
      <button>Back</button>
      <button>Continue</button>
    </div>
  </div>
</template>

<style lang="scss">
.ce-container {
  width: 520px;
}

.ce-amount-currency {
  display: flex;
  gap: 6px;
}
</style>
