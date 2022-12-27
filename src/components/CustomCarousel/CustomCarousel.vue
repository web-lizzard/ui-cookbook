<script lang="ts" setup>
import { computed, ref, useSlots } from 'vue';
import CustomCarouselItem, {
  type SwipeDirection,
} from './CustomCarouselItem.vue';

const slots = useSlots();

const currentSlide = ref(0);
const content = ref<null | HTMLDivElement>(null);

const slotsName = computed(() =>
  Object.keys(slots).filter((name) => name !== 'header')
);

const itemsLength = computed(() => slotsName.value.length);
const isLeftButtonIsDisabled = computed(() => currentSlide.value === 0);
const isRightButtonIsDisabled = computed(
  () => currentSlide.value === slotsName.value.length - 1
);

const offset = computed(() => {
  if (!content.value) {
    return 0;
  }
  const reducedOffsetValue = [...content.value.children].reduce(
    (value: number, element: Element, index) => {
      if (index < currentSlide.value) {
        return value + element.getBoundingClientRect().width;
      }

      return value;
    },
    0
  );
  return `-${reducedOffsetValue}px`;
});

const setNextSlide = () => {
  changeCurrentSlide(currentSlide.value + 1);
};

const setPreviousSlide = () => {
  changeCurrentSlide(currentSlide.value - 1);
};

const handleSwipe = (direction: SwipeDirection) => {
  direction === 'right' ? setNextSlide() : setPreviousSlide();
};

const changeCurrentSlide = (targetSlide: number) => {
  if (
    targetSlide < 0 ||
    targetSlide >= slotsName.value.length ||
    targetSlide === currentSlide.value
  ) {
    return;
  }

  currentSlide.value = targetSlide;
};
</script>

<template>
  <div aria-label="carousel" class="custom-carousel | grid">
    <span class="sr-only">
      Carousel with {{ itemsLength }} slides shown at a time. Use the Previous
      and Next buttons to navigate.
    </span>

    <slot name="header">
      <header class="custom-carousel__buttons-box | flex" aria-role="toolbar">
        <button
          @click="setPreviousSlide"
          :disabled="isLeftButtonIsDisabled"
          class="custom-carousel__button custom-carousel__button--prev"
        >
          <span class="custom-carousel__icon" aria-hidden="true"></span>
          <span class="sr-only">Previous Slide</span>
        </button>
        <button
          @click="setNextSlide"
          :disabled="isRightButtonIsDisabled"
          class="custom-carousel__button carousel__button--next"
        >
          <span class="custom-carousel__icon" aria-hidden="true"></span>
          <span class="sr-only">Next Slide</span>
        </button>
      </header>
    </slot>

    <div ref="content" class="custom-carousel__slides | grid">
      <slot name="slides">
        <CustomCarouselItem
          @swipe="handleSwipe"
          v-for="(name, key) in slotsName"
          :key="key"
          :index="key"
          :carousel-length="slotsName.length"
          :name="name"
        >
          <template #[name]> <slot :name="name" /> </template>
        </CustomCarouselItem>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use 'scss/variables';

.custom-carousel {
  --grid-gap: 2rem;
  --flex-gap: 2rem;
  --max-width: 100rem;
  --button-width: 5rem;

  &__buttons-box {
    max-width: var(--max-width);
  }

  &__button {
    border-radius: 50%;
    aspect-ratio: 1;
    border: 0;
    background-color: variables.$blue-500;
    cursor: pointer;
    color: white;
    width: var(--button-width);

    &:disabled {
      background-color: variables.$gray-300;
      cursor: not-allowed;
    }

    &--prev {
      transform: rotate(180deg);
    }

    &:hover {
      background-color: darken($color: variables.$blue-500, $amount: 8);
    }

    &:disabled:hover {
      background-color: variables.$gray-300;
    }
  }

  &__icon {
    display: block;
    height: 100%;
    background-image: url(@/assets/icons/chevron.svg);
    background-position: center;
    background-size: 50%;
    background-repeat: no-repeat;
  }

  &__slides {
    --grid-gap: 2rem;
    grid-auto-columns: max-content;
    grid-auto-flow: column;
    transform: translateX(v-bind(offset));
    transition: 0.4s ease-in-out;
  }
}
</style>
