import type { IMutableRefObject } from '@vruse/shared'

export type Tpick = any[] | IMutableRefObject

export type Titem<T> = T extends Array<infer U> ? U : T
export type Tcalled<K> = K extends {
  current: infer Z
}
  ? Titem<Z>
  : Titem<K>

export type UsePickCallback<V> = (
  value: Tcalled<V>,
  PlickListLength?: number,
) => unknown

export type Tunwrap<K> = K extends {
  current: infer Z
}
  ? Z
  : K

export type Test<
  K extends
  | any[]
  | {
    current: any[]
  },
> = K extends {
  current: infer Z
}
  ? Z
  : K
