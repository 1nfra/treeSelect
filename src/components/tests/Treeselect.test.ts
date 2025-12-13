import type { TreeNode } from '../types';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Treeselect from '../Treeselect.vue';

describe('treeselect', () => {
  const options: TreeNode[] = [
    { id: 1, label: 'Option 1' },
    { id: 2, label: 'Option 2' },
    { id: 3, label: 'Option 3' },
  ];

  it('renders placeholder when no value selected', () => {
    const wrapper = mount(Treeselect, {
      props: {
        options,
        placeholder: 'Select...',
      },
    });

    expect(wrapper.text()).toContain('Select...');
  });

  it('opens menu on click', async () => {
    const wrapper = mount(Treeselect, {
      props: { options },
    });

    await wrapper.find('.treeselect-control').trigger('click');
    expect(wrapper.find('.treeselect-menu').exists()).toBe(true);
  });

  it('emits select event when option clicked', async () => {
    const wrapper = mount(Treeselect, {
      props: { options },
    });

    await wrapper.find('.treeselect-control').trigger('click');
    await wrapper.find('.treeselect-option').trigger('click');

    expect(wrapper.emitted('select')).toBeTruthy();
    expect(wrapper.emitted('select')![0]).toEqual([options[0]]);
  });

  it('does not open when disabled', async () => {
    const wrapper = mount(Treeselect, {
      props: {
        options,
        disabled: true,
      },
    });

    await wrapper.find('.treeselect-control').trigger('click');
    expect(wrapper.find('.treeselect-menu').exists()).toBe(false);
  });
});
