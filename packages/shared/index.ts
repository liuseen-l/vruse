export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const isArray = Array.isArray

export const NOOP = () => {}

export const isNumber = (val: unknown): val is number => typeof val === 'number'
