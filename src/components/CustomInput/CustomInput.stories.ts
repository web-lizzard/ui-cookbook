// Button.stories.ts

import CustomInput from './CustomInput.vue';

import type { Meta, StoryFn } from '@storybook/vue3';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Custom Input',
  component: CustomInput,
} as Meta<typeof CustomInput>;

const Template: StoryFn<typeof CustomInput> = (args) => ({
  components: { CustomInput },
  setup() {
    //👇 The args will now be passed down to the template
    return { args };
  },
  template: '<CustomInput v-bind="args" />',
});

export const Primary = Template.bind({});
