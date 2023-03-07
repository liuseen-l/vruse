import type { PackageIndexes } from './types'
import _metadata, {
  categories as _categories,
  functions as _functions,
  packages as _packages,
} from './index.json'

const categoriesOrder = [
  'State',
  'Elements',
  'Browser',
  'Sensors',
  'Network',
  'Animation',
  'Component',
  'Watch',
  'Reactivity',
  'Array',
  'Time',
  'Utilities',
]

// 整个 json 信息
export const metadata = _metadata as PackageIndexes
// 函数
export const functions = _functions as PackageIndexes['functions']
// 包
export const packages = _packages as PackageIndexes['packages']
// 目录
export const categories = _categories as PackageIndexes['categories']

export const functionNames = functions.map((f) => f.name)

// 对目录进行排序
export const categoryNames = Array.from(categories)
  .sort((a, b) => categoriesOrder.indexOf(a) - categoriesOrder.indexOf(b))
  .sort((a, b) => (a.startsWith('@') ? 1 : b.startsWith('@') ? -1 : 0))

// 返回非@开头的目录
export const coreCategoryNames = categoryNames.filter((f) => !f.startsWith('@'))

export const addonCategoryNames = categoryNames.filter((f) => f.startsWith('@'))

export const getFunction = (name: string) =>
  metadata.functions.find((f) => f.name === name)
