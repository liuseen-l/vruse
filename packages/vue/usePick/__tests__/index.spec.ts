import { usePick } from '../index'

describe('usePick', () => {
  test('original target with number options', async () => {
    const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const pickCount = 5
    const p = usePick(original, pickCount)
    await p.run()
    expect(p.pickedList.length).toBe(pickCount)
  })
})
