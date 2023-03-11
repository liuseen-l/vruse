export interface IMutableRefObject {
  current: any[]
}

export type SetStateType<D> = React.Dispatch<React.SetStateAction<D>>
export type UseSateType<D> = [D, SetStateType<D>]
