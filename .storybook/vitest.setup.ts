import { setProjectAnnotations } from '@storybook/vue3'
import { beforeAll } from 'vitest'
import * as projectAnnotations from './preview'

// This is needed for @storybook/test to work
beforeAll(() => {
  setProjectAnnotations([projectAnnotations])
})
