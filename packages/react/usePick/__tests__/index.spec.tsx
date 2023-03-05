describe('reacy', () => {
  test('test', () => {
    test('daw', () => {
      let apples = 0
      const obj = {
        getApples: () => 13,
      }

      const spy = vi.spyOn(obj, 'getApples').mockImplementation(() => apples)
      apples = 1

      expect(obj.getApples()).toBe(1)

      expect(spy).toHaveBeenCalled()
      expect(spy).toHaveReturnedWith(1)

      // const getApples = vi.fn(() => 0)

      // getApples()

      // expect(getApples).toHaveBeenCalled()
      // expect(getApples).toHaveReturnedWith(0)

      // getApples.mockReturnValueOnce(5)

      // const res = getApples()
      // expect(res).toBe(5)
      // expect(getApples).toHaveNthReturnedWith(2, 5)
    })
  })
})
