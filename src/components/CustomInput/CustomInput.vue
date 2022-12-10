<template>
  <input class="custom-input" placeholder="test" type="text" />
</template>

<style scoped lang="scss">
@use 'scss/variables';

.custom-input {
  font-family: inherit;
  color: variables.$color-red;
  border: 2px solid variables.$color-yellow;
}
</style>
