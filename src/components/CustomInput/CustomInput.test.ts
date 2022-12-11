import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CustomInput from './CustomInput.vue';

describe('custom-input', () => {
  it('should display input', () => {
    mount(CustomInput);
  });

  it('should display default label', () => {
    const wrapper = mount(CustomInput);

    expect(wrapper.find('label').text()).toBe('Default Label');
  });

  it('should display label, when user pass label props', () => {
    const label = 'New Label';
    const wrapper = mount(CustomInput, {
      props: {
        label,
      },
    });

    expect(wrapper.find('label').text()).toBe(label);
  });

  it('should update modelValue', async () => {
    const wrapper = mount(CustomInput, {
      props: {
        modelValue: 'Initial Value',
        'onUpdate:modelValue': (e: string) =>
          wrapper.setProps({ modelValue: e }),
      },
    });

    await wrapper.find('input').setValue('test');
    expect(wrapper.props('modelValue')).toBe('test');
  });

  it('should have error class, when pass error props', () => {
    const wrapper = mount(CustomInput, {
      props: {
        error: true,
      },
    });

    expect(wrapper.classes('custom-input--error')).toBeTruthy();
  });
});
