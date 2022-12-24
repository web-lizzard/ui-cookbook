<script lang="ts" setup>
import { computed, ref } from 'vue';
export interface Props {
  name: string;
  index: number;
  carouselLength: number;
}

export type SwipeDirection = 'left' | 'right';

const props = defineProps<Props>();
const emit = defineEmits<{ (e: 'swipe', direction: SwipeDirection): void }>();
const xTouch = ref(0);

const ariaLabel = computed(
  () => `Slide ${props.index + 1} of ${props.carouselLength}`
);

const handleTouchMove = (e: TouchEvent) => {
  const { clientX } = e.touches[0];
  const xDiff = clientX - xTouch.value;
  const direction = xDiff > 0 ? 'right' : 'left';
  emit('swipe', direction);
};

const handleTouchStart = (e: TouchEvent) => {
  xTouch.value = e.touches[0].clientX;
};
</script>

<template>
  <div
    @touchmove.passive="handleTouchMove"
    @touchstart.passive="handleTouchStart"
    class="custom-carousel-item"
    :aria-label="ariaLabel"
    role="group"
  >
    <slot :name="name"> </slot>
  </div>
</template>

<style lang="scss" scoped>
.custom-carousel-item {
}
</style>
