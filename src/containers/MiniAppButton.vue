<template>
  <div class="proposal-btn" tabindex="0" role="button">
    <img src="Bag.svg" alt="Mini Apps" title="Get mini apps" />
    <span class="proposal-btn__text"> Mini Apps</span>
    <span class="proposal-btn__prerequisite"> Pro </span>
  </div>
</template>

<style lang="scss">
.proposal-btn {
  border: 2px solid #e0f5ff;
  border-radius: 4px;
  padding: 11px 16px;
  display: flex;
  color: #e0f5ff;
  margin: 0 13px 15px 13px;

  img {
    width: 14px;
    height: 16px;
    margin-right: 8px;
  }

  &__text {
    font-size: 18px;
    line-height: 18px;
  }

  &__prerequisite {
    border: 1px solid #e0f5ff;
    border-radius: 3.36px;
    margin-left: auto;
    padding: 3px 5px;
    font-size: 10.5px;
    line-height: 12px;
    letter-spacing: -0.505769px;
  }
}
</style>
