import { describe } from 'vitest'

describe('test usePick', () => {
  it('should be called twince', () => {
    function sum(a: number, b: number) {
      return a + b
    }

    expect(sum(1, 2)).toBe(3)
  })
})
