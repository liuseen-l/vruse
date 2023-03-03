import type { Ref } from 'vue-demi'

export type Tpick = Ref<any[]> | any[]

type Titem<T> = T extends Array<infer U> ? U : T
type Tcalled<K> = K extends Ref<infer Z> ? Titem<Z> : Titem<K>
export type UsePickCallback<V> = (
  value: Tcalled<V>,
  PlickListLength?: number,
) => unknown
