import type { Ref } from 'vue-demi'

export type Tpick = Ref<any[]> | any[]

export type Titem<T> = T extends Array<infer U> ? U : T
export type Tcalled<K> = K extends Ref<infer Z> ? Titem<Z> : Titem<K>

export type UsePickCallback<V> = (
  value: Tcalled<V>,
  PlickListLength?: number,
) => unknown

export type Tunwrap<K> = K extends Ref<infer Z> ? Z : K
