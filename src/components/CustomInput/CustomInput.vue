<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { computed } from 'vue';

export interface Props {
  error?: boolean;
  id?: string;
  label?: string;
  modelValue?: string;
  isError?: boolean;
  hint?: string;
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Default Label',
});

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();

const changeInputValue = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  emit('update:modelValue', value);
};

const errorClass = computed(() => props.error && 'custom-input--error');
const idHint = computed(() => props.id && `${props.id}-hint`);
</script>

<template>
  <div :class="['custom-input', errorClass]">
    <input
      @input="changeInputValue"
      v-bind="$attrs"
      :id="id"
      :aria-invalid="isError"
      :value="modelValue"
      class="custom-input__field"
      :aria-describedby="idHint"
      :placeholder="label"
    />
    <label class="custom-input__label" :for="id">{{ label }}</label>
    <span class="custom-input__border-bottom" aria-hidden="true" />
    <span class="custom-input__border-right" aria-hidden="true" />
    <span class="custom-input__border-top" aria-hidden="true" />
    <span class="custom-input__border-left" aria-hidden="true" />
    <span class="custom-input__hint-message" :id="idHint" v-show="isError">{{
      hint
    }}</span>
  </div>
</template>

<style scoped lang="scss">
@use 'scss/variables';

$animation-duration: 0.2s;
$border-thickness: 2px;
$input-padding-left: 1.5rem;

@mixin input-border-values($width, $height, $transition-delay: 0s) {
  position: absolute;
  background-color: variables.$blue-400;
  width: $width;
  height: $height;
  transition: transform $animation-duration $transition-delay ease-in-out;
}

.custom-input {
  $self: &;

  position: relative;
  max-width: fit-content;
  overflow: hidden;
  color: variables.$blue-500;

  &__field {
    background-color: transparent;
    border: 0;
    padding: 1.5rem $input-padding-left 1.5rem $input-padding-left;
    border-bottom: 2px solid variables.$blue-700;
    color: inherit;

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

    &:focus ~ #{$self}__label,
    &:not(:placeholder-shown) ~ #{$self}__label {
      transform: translate(60%, -110%) scale(0.7);
    }

    &::placeholder {
      opacity: 0;
    }
  }

  &__label {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate($input-padding-left, -50%);
    color: variables.$blue-500;
    transition: transform 0.2s ease-in;
  }

  &__border-bottom {
    @include input-border-values(100%, $border-thickness);
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
  }

  &__border-right {
    @include input-border-values($border-thickness, 100%, 0.2s);
    bottom: 0;
    right: 0;
    transform: translateY(100%);
  }

  &__border-top {
    @include input-border-values(100%, $border-thickness, 0.4s);
    top: 0;
    right: 0;
    transform: translateX(100%);
  }

  &__border-left {
    @include input-border-values($border-thickness, 100%, 0.6s);
    top: 0;
    left: 0;
    transform: translateY(-100%);
  }

  &--error {
    #{$self}__field {
      border-color: variables.$red-300;
    }

    #{$self}__border-left,
    #{$self}__border-right,
    #{$self}__border-top,
    #{$self}__border-bottom {
      background-color: variables.$red-400;
    }
  }
}
</style>
