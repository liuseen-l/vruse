import type { IMutableRefObject } from '../utils-types/react'

export function isRef(v: any): v is IMutableRefObject {
  return !!(v && Object.hasOwnProperty.call(v, 'current'))
}

export type SetStateType<D> = React.Dispatch<React.SetStateAction<D>>
export type UseSateType<D> = [D, SetStateType<D>]
