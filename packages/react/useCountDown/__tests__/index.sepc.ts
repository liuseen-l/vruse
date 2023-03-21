import { renderHook } from '@testing-library/react-hooks'
import { useCountDown } from '../index'

describe('useAxios', () => {
  test('params: url with await', async () => {
    const { result } = renderHook(() => useCountDown(1000 * 10, { immediate: true }))
  })
})
