interface IMutableRefObject<T = any> {
  current: T
}

export function isRef(v: any): v is IMutableRefObject {
  return !!(v && Object.hasOwnProperty.call(v, 'current'))
}
