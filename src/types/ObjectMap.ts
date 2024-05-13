export interface ObjectMap<T> {
  [key: string]: T | undefined
  [key: number]: T | undefined
}
