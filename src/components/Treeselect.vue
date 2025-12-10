<script setup lang="ts">
import type { TreeNode, TreeselectProps } from './types'
import { computed, ref } from 'vue'

const props = withDefaults(defineProps<TreeselectProps>(), {
  multiple: false,
  disabled: false,
  placeholder: 'Select...',
  clearable: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: any]
  'select': [node: TreeNode]
  'clear': []
}>()

const isOpen = ref(false)

const hasValue = computed(() => {
  if (props.multiple) {
    return Array.isArray(props.modelValue) && props.modelValue.length > 0
  }
  return props.modelValue != null
})

const displayValue = computed(() => {
  if (props.multiple && Array.isArray(props.modelValue)) {
    if (props.modelValue.length === 0)
      return props.placeholder
    if (props.modelValue.length === 1) {
      const option = props.options.find(opt => opt.id === props.modelValue[0])
      return option ? option.label : '1 item selected'
    }
    return `${props.modelValue.length} items selected`
  }

  const option = props.options.find(opt => opt.id === props.modelValue)
  return option ? option.label : props.placeholder
})

const containerClasses = computed(() => ({
  'vue-treeselect--open': isOpen.value,
  'vue-treeselect--disabled': props.disabled,
  'vue-treeselect--multiple': props.multiple,
  'vue-treeselect--has-value': hasValue.value,
}))

function toggleMenu() {
  if (props.disabled)
    return
  isOpen.value = !isOpen.value
}

function closeMenu() {
  isOpen.value = false
}

function selectOption(option: TreeNode) {
  if (option.isDisabled)
    return

  let newValue
  if (props.multiple) {
    const current = Array.isArray(props.modelValue) ? props.modelValue : []
    const index = current.indexOf(option.id)

    if (index > -1) {
      newValue = [...current.slice(0, index), ...current.slice(index + 1)]
    }
    else {
      newValue = [...current, option.id]
    }
  }
  else {
    newValue = option.id
    closeMenu()
  }

  emit('update:modelValue', newValue)
  emit('select', option)
}

function optionClasses(option: TreeNode) {
  return {
    'treeselect-option--disabled': option.isDisabled,
    'treeselect-option--selected': isSelected(option),
  }
}

function isSelected(option: TreeNode): boolean {
  if (props.multiple && Array.isArray(props.modelValue)) {
    return props.modelValue.includes(option.id)
  }
  return props.modelValue === option.id
}
</script>

<template>
  <div class="vue-treeselect" :class="containerClasses">
    <div
      class="treeselect-control"
      :class="{ 'treeselect-control--disabled': disabled }"
      @click="toggleMenu"
    >
      <div class="treeselect-value">
        <span v-if="!hasValue" class="treeselect-placeholder">
          {{ placeholder }}
        </span>
        <span v-else class="treeselect-value-label">
          {{ displayValue }}
        </span>
      </div>
      <div class="treeselect-indicator">
        <svg class="treeselect-arrow" :class="{ 'treeselect-arrow--open': isOpen }">
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </div>
    </div>
    <div
      v-if="isOpen && !disabled"
      v-click-outside="closeMenu"
      class="treeselect-menu"
    >
      <div
        v-for="option in options"
        :key="option.id"
        class="treeselect-option"
        :class="optionClasses(option)"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.vue-treeselect {
  position: relative;
  width: 100%;
  max-width: 300px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 14px;
}

.treeselect-control {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  transition: all 0.2s;
  min-height: 40px;
}

.treeselect-control:hover {
  border-color: #c0c4cc;
}

.treeselect-control--disabled {
  background-color: #f5f7fa;
  cursor: not-allowed;
  opacity: 0.6;
}

.vue-treeselect--open .treeselect-control {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
}

.treeselect-value {
  flex: 1;
  overflow: hidden;
}

.treeselect-placeholder {
  color: #c0c4cc;
}

.treeselect-value-label {
  color: #606266;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.treeselect-indicator {
  display: flex;
  align-items: center;
  margin-left: 8px;
}

.treeselect-arrow {
  width: 16px;
  height: 16px;
  fill: #c0c4cc;
  transition: transform 0.2s;
}

.treeselect-arrow--open {
  transform: rotate(180deg);
}

.treeselect-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: white;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
}

.treeselect-option {
  padding: 8px 12px;
  cursor: pointer;
  color: #606266;
  transition: background-color 0.2s;
}

.treeselect-option:hover {
  background-color: #f5f7fa;
}

.treeselect-option--selected {
  background-color: #f0f9eb;
  color: #67c23a;
}

.treeselect-option--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
