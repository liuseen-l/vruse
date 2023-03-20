import { computed, ref } from 'vue-demi'

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

  const timeRef = ref(time)

  const days = computed(() => Math.floor(timeRef.value / (1000 * 60 * 60 * 24)))
  const hours = computed(() =>
    Math.floor((timeRef.value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  )
  const minutes = computed(() =>
    Math.floor((timeRef.value % (1000 * 60 * 60)) / (1000 * 60)),
  )
  const seconds = computed(() =>
    Math.floor((timeRef.value % (1000 * 60)) / 1000),
  )
  let timer: NodeJS.Timer | null

  const countDown = () => {
    if (timeRef.value <= 0) {
      stop()
      return
    }
    timeRef.value -= 1000
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
    timer = setInterval(countDown, 1000)
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
