import { usePick } from '../index'

describe('usePick', () => {
  test('original target with number options', async () => {
    const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const pickCount = 5

    const { pickedList, run } = usePick(original, pickCount)
    await run()
    expect(pickedList.length).toBe(pickCount)
  })

  test('can not be executed again during the start of the run method', () => {
    const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const pickCount = 5

    const { run } = usePick(original, pickCount)

    run()
    run()
    expect(
      'Please call it again after the execution is complete',
    ).toHaveBeenWarned()
  })
})
