import type { Meta, StoryObj } from '@storybook/vue3'
import type { TreeNode } from '../components/types'
import { ref } from 'vue'
import Treeselect from '../components/Treeselect.vue'

const meta: Meta<typeof Treeselect> = {
  title: 'Components/Treeselect',
  component: Treeselect,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Treeselect>

// Базовые данные
const basicOptions: TreeNode[] = [
  { id: 1, label: 'Apple' },
  { id: 2, label: 'Banana' },
  { id: 3, label: 'Orange' },
  { id: 4, label: 'Grape' },
  { id: 5, label: 'Mango' },
]

// Базовый пример
export const Basic: Story = {
  render: () => ({
    components: { Treeselect },
    setup() {
      const selected = ref(null)
      return { selected, options: basicOptions }
    },
    template: `
      <div style="padding: 20px; max-width: 300px;">
        <Treeselect 
          v-model="selected"
          :options="options"
          placeholder="Select a fruit"
        />
        <div style="margin-top: 20px; font-size: 12px; color: #666;">
          Selected: {{ selected }}
        </div>
      </div>
    `,
  }),
}

// Множественный выбор
export const MultipleSelection: Story = {
  render: () => ({
    components: { Treeselect },
    setup() {
      const selected = ref([])
      return { selected, options: basicOptions }
    },
    template: `
      <div style="padding: 20px; max-width: 300px;">
        <Treeselect 
          v-model="selected"
          :options="options"
          :multiple="true"
          placeholder="Select multiple fruits"
        />
        <div style="margin-top: 20px; font-size: 12px; color: #666;">
          Selected: {{ selected }}
        </div>
      </div>
    `,
  }),
}

// Отключенное состояние
export const Disabled: Story = {
  render: () => ({
    components: { Treeselect },
    setup() {
      const selected = ref(null)
      return { selected, options: basicOptions }
    },
    template: `
      <div style="padding: 20px; max-width: 300px;">
        <Treeselect 
          v-model="selected"
          :options="options"
          :disabled="true"
          placeholder="Disabled select"
        />
      </div>
    `,
  }),
}
