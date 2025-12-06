import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Treeselect from '../components/Treeselect.vue'

const meta: Meta<typeof Treeselect> = {
  title: 'Components/Treeselect',
  component: Treeselect,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'Selected value',
    },
  },
}

export default meta

type Story = StoryObj<typeof Treeselect>

export const Basic: Story = {
  render: args => ({
    components: { Treeselect },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: `
      <div style="padding: 20px; max-width: 300px;">
        <Treeselect 
          v-model="value" 
          v-bind="args"
        />
        <p style="margin-top: 20px;">Value: {{ value }}</p>
      </div>
    `,
  }),
  args: {
    modelValue: null,
  },
}

export const WithValue: Story = {
  args: {
    modelValue: 'selected-value',
  },
}
