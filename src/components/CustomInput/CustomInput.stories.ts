import CustomInput from './CustomInput.vue';

import type { Meta, StoryFn } from '@storybook/vue3';

export default {
  title: 'CustomInput',
  component: CustomInput,
} as Meta<typeof CustomInput>;

export const Primary: StoryFn<typeof CustomInput> = () => ({
  components: { CustomInput },
  template: '<CustomInput />',
});
