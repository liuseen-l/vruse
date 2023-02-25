import type { PackageIndexes } from './types'
import _metadata from './index.json'

export const metadata = _metadata

export const _categories = ['biz']

const categoriesOrder = ['业务型', '功能型']

export const categories = categoriesOrder as PackageIndexes['categories']

export const categoryNames = Array.from(categories)
  .sort((a, b) => categoriesOrder.indexOf(a) - categoriesOrder.indexOf(b))
  .sort((a, b) => (a.startsWith('@') ? 1 : b.startsWith('@') ? -1 : 0))

export const coreCategoryNames = categoryNames.filter((f) => !f.startsWith('@'))
