import type { Category } from '../../types/Category'
import { Factory } from 'fishery'

export const categoryFactory = Factory.define<Category>(() => {
  return {
    id: 1,
    path: '/women',
    name: 'women',
    slug: 'test',
    parentId: 2048,
    rootlineIds: [2045, 2048, 2058],
    childrenIds: [],
    properties: [],
    isHidden: false,
    depth: 3,
    supportedFilter: ['color', 'brand', 'size'],
    shopLevelCustomData: {},
    countryLevelCustomData: {},
  }
})
