export interface TreeNode {
  [key: string]: any // Позволяет дополнительные свойства
  id: string | number
  label: string
  children?: TreeNode[]
  isDisabled?: boolean
  isDefaultExpanded?: boolean
  isDefaultSelected?: boolean
}

export interface TreeselectProps {
  // Основные
  modelValue?: any
  options: TreeNode[]
  // Базовые настройки
  multiple?: boolean
  flat?: boolean
  searchable?: boolean
  disabled?: boolean
  clearable?: boolean
  placeholder?: string
  alwaysOpen?: boolean
  // Настройки дерева
  valueFormat?: 'id' | 'object' | 'branch'
  idKey?: string
  labelKey?: string
  childrenKey?: string
  disabledKey?: string
  expandKey?: string
  selectKey?: string
  // Поиск
  searchNested?: boolean
  searchQuery?: string
  minSearchLength?: number
  searchPlaceholder?: string
  // Отображение
  limit?: number
  limitText?: (count: number) => string
  maxHeight?: number
  appendToBody?: boolean
  zIndex?: number
  // Асинхронная загрузка
  async?: boolean
  loadOptions?: (action: LoadOptionsAction) => Promise<TreeNode[]>
  cacheOptions?: boolean
  autoLoad?: boolean
  loadingText?: string
  noOptionsText?: string
  noChildrenText?: string
  // Кастомизация
  showCount?: boolean
  showCountOnSearch?: boolean
  normalizer?: (node: any) => TreeNode
  sortValueBy?: 'ORDER_SELECTED' | 'LEVEL' | 'INDEX'
  // Accessibility
  tabindex?: number
  autofocus?: boolean
  openDirection?: 'auto' | 'above' | 'below'
  closeOnSelect?: boolean
  closeOnClickOutside?: boolean
}

export interface LoadOptionsAction {
  action: () => void
  parentNode: TreeNode
  callback: (nodes: TreeNode[]) => void
  instanceId: string
}
