<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { computed } from 'vue';

export interface Props {
  error: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  error: false,
});

const errorClass = computed(() => props.error && 'custom-input--error');
</script>

<template>
  <div :class="['custom-input', errorClass]">
    <input v-bind="$attrs" class="custom-input__field" placeholder="test" />
    <span class="custom-input__border-bottom" />
    <span class="custom-input__border-right" />
    <span class="custom-input__border-top" />
    <span class="custom-input__border-left" />
  </div>
</template>

<style scoped lang="scss">
@use 'scss/variables';

.custom-input {
  $self: &;

  position: relative;
  max-width: fit-content;
  overflow: hidden;

  &__field {
    background-color: transparent;
    border: 0;
    font: inherit;
    padding: 1rem 1.5rem;
    border-bottom: 2px solid variables.$blue-700;
    color: variables.$blue-500;

    &:focus {
      outline: none;
    }

    &:focus ~ #{ $self }__border-bottom,
    &:focus ~ #{ $self }__border-top {
      transform: translateX(0);
    }

    &:focus ~ #{ $self }__border-right,
    &:focus ~ #{ $self }__border-left {
      transform: translateY(0);
    }
  }

  &__border-bottom {
    bottom: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: variables.$blue-400;
    transform: translateX(-100%);
    transition: transform 0.2s ease-in-out;
  }

  &__border-right {
    bottom: 0;
    right: 0;
    position: absolute;
    width: 2px;
    height: 100%;
    background-color: variables.$blue-400;
    transform: translateY(100%);
    transition: transform 0.2s 0.2s ease-in-out;
  }

  &__border-top {
    top: 0;
    right: 0;
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: variables.$blue-400;
    transform: translateX(100%);
    transition: transform 0.2s 0.4s ease-in-out;
  }

  &__border-left {
    top: 0;
    left: 0;
    position: absolute;
    height: 100%;
    width: 2px;
    background-color: variables.$blue-400;
    transform: translateY(-100%);
    transition: transform 0.2s 0.6s ease-in-out;
  }

  &--error {
    #{$self}__border-left,
    #{$self}__border-right,
    #{$self}__border-top,
    #{$self}__border-bottom {
      background-color: variables.$red-400;
    }
  }
}
</style>
