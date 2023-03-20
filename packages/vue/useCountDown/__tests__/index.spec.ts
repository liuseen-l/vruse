import { useCountDown } from '../index'

describe('useCountDown', () => {
  it('should be defined', () => {
    expect(useCountDown).toBeDefined()
  })
  it('test count down for seconds', async () => {
    const { seconds } = useCountDown(1000 * 10, { immediate: true })
    await new Promise((resolve) => setTimeout(resolve, 1000))
    expect(seconds.value).toBe(9)
  })

  it('test count down for minutes', async () => {
    const { minutes } = useCountDown(1000 * 60 * 10, { immediate: true })
    await new Promise((resolve) => setTimeout(resolve, 1000))
    expect(minutes.value).toBe(9)
  })

  it('test count down for hours', async () => {
    const { hours } = useCountDown(1000 * 60 * 60 * 10, { immediate: true })
    await new Promise((resolve) => setTimeout(resolve, 1000))
    expect(hours.value).toBe(9)
  })

  it('test count down for days', async () => {
    const { days } = useCountDown(1000 * 60 * 60 * 24 * 10, { immediate: true })
    await new Promise((resolve) => setTimeout(resolve, 1000))
    expect(days.value).toBe(9)
  })
})
