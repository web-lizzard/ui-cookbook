// Button.stories.ts

import CustomInput from './CustomInput.vue';

import type { Meta, StoryFn } from '@storybook/vue3';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'CustomInput',
  component: CustomInput,
} as Meta<typeof CustomInput>;

export const Primary: StoryFn<typeof CustomInput> = () => ({
  components: { CustomInput },
  template: '<CustomInput />',
});
