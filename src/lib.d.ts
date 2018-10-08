type Omit<T, K extends string> = Pick<T, Exclude<keyof T, K>>;

interface ObjectMap<T> {
  [key: string]: T | undefined;
  [key: number]: T | undefined;
}

