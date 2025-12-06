<script setup lang="ts">
defineProps<{
  modelValue?: any
}>()

defineEmits<{
  'update:modelValue': [value: any]
}>()
</script>

<template>
  <div class="treeselect">
    <h3>Treeselect Component</h3>
    <p>Selected: {{ modelValue || 'Nothing' }}</p>
    <button @click="$emit('update:modelValue', 'test')">
      Select Test
    </button>
  </div>
</template>

<style>
.treeselect {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  background: white;
}
</style>
