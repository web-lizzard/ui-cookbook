// Button.stories.ts

import CustomCarousel from './CustomCarousel.vue';

import type { Meta, StoryFn } from '@storybook/vue3';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Custom Carousel',
  component: CustomCarousel,
} as Meta<typeof CustomCarousel>;

const Template: StoryFn<typeof CustomCarousel> = (args) => ({
  components: { CustomCarousel },
  setup() {
    //👇 The args will now be passed down to the template
    return { args };
  },
  template: '<CustomCarousel v-bind="args" />',
});

export const Base = Template.bind({});
