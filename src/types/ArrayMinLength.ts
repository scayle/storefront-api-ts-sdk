type BuildArrayMinLength<
  T,
  N extends number,
  Current extends T[],
> = Current['length'] extends N
  ? [...Current, ...T[]]
  : BuildArrayMinLength<T, N, [...Current, T]>;

export type ArrayMinLength<T, N extends number> = BuildArrayMinLength<T, N, []>;
