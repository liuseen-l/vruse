import { useState } from 'react'

interface CountDownOptions {
  /**
   * Start immediately
   */
  immediate?: boolean
}

/**
 * Cont down
 * @param time timestamp: endTime - startTime
 * @param options
 */
export const useCountDown = (time: number, options?: CountDownOptions) => {
  if (time <= 0)
    throw new Error('time must be greater than 0')

  if (!options)
    options = { immediate: false }

  const [timeRef, setTimeRef] = useState(time)

  const days = Math.floor(timeRef / (1000 * 60 * 60 * 24))

  const hours = Math.floor((timeRef % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

  const minutes = Math.floor((timeRef % (1000 * 60 * 60)) / (1000 * 60))

  const seconds = Math.floor((timeRef % (1000 * 60)) / 1000)

  let timer: NodeJS.Timer | null

  const countDown = () => {
    if (timeRef <= 0) {
      stop()
      return
    }
    setTimeRef(timeRef - 1000)
  }

  // pause
  function stop() {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  // start
  function start() {
    if (timer)
      return
    timer = setInterval(countDown, 2000)
  }

  if (options?.immediate)
    start()

  return {
    days,
    hours,
    minutes,
    seconds,
    start,
    stop,
  }
}
