export interface IMutableRefObject {
  current: any[]
}

export function isRef(v: any): v is IMutableRefObject {
  return !!(v && Object.hasOwnProperty.call(v, 'current'))
}
