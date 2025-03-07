import type {
  NavigationItemCategory,
  NavigationItemExternal,
  NavigationItemPage,
} from '../../types/navigation'
import { Factory } from 'fishery'
import { categoryFactory } from './category'

export const navigationItemExternalFactory: Factory<NavigationItemExternal> =
  Factory.define<
    NavigationItemExternal
  >(() => ({
    id: 1,
    assets: {},
    languages: {},
    name: 'Home',
    visibleFrom: null,
    visibleTo: null,
    children: [],
    type: 'individual-link',
    options: { url: 'https://google.com', isOpenInNewWindow: true },
  }))

export const navigationItemPageFactory: Factory<NavigationItemPage> = Factory
  .define<NavigationItemPage>(
    () => ({
      id: 2,
      assets: {},
      languages: {},
      name: 'PageName',
      visibleFrom: null,
      visibleTo: null,
      children: [],
      type: 'page',
      page: '/page',
    }),
  )

export const navigationItemCategoryFactory: Factory<NavigationItemCategory> =
  Factory.define<
    NavigationItemCategory
  >(() => ({
    id: 3,
    assets: {},
    name: 'CategoryName',
    visibleFrom: null,
    visibleTo: null,
    children: [],
    extraFilters: {},
    filters: [],
    type: 'category',
    categoryId: 1,
    category: categoryFactory.build({ id: 1, path: '/path' }),
  }))
