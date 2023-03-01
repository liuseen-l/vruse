import { isSameArray, sleep } from '@vruse/shared'

export interface UsePickOptions<T> {
  /**
   * Search List
   */
  data: T[]

  /**
   * Pick Count
   */
  pickCount: number

  /**
   * Excludes List
   */
  excludes?: T | T[]

  /**
   * Pick Interval
   */
  pickDelay?: number

  /**
   * Fashes Interval
   */
  previewDelay?: number

  /**
   * Fashes Count
   */
  previewCount?: number
}

export type UsePickCallback<V = unknown> = (
  value: V,
  PickList?: V[],
  PickListLength?: number,
) => unknown

function pick<T>(data: T[], limit: number = data.length - 1) {
  const picked = Math.floor(Math.random() * limit)
  ;[data[picked], data[limit]] = [data[limit], data[picked]]
  return data[limit]
}

function normalizeExcludes<T>(e: T | T[] = []) {
  return Array.isArray(e) ? e : [e]
}

class PickRef<T> {
  /**
   * Picked List, the last picked list can be obtained through value
   */
  private pickedList: T[] = []

  private previewDelay: number

  private previewCount: number

  /**
   * Get the original array of the responsive array
   */
  private rawData: T[]

  private pickCount: number

  private excludes: T[] = []

  private pickDelay: number

  /**
   * use run() in React useEffect would be trigger twice
   */
  private flush = false

  constructor(
    options: UsePickOptions<T>,
    private cb: UsePickCallback<T> | null,
  ) {
    this.previewDelay = options.previewDelay || 60
    this.previewCount = options.previewCount || 10
    this.pickDelay = options.pickDelay || 60
    this.pickCount = options.pickCount
    this.rawData = options.data || []
    if (options.excludes) {
      this.excludes = normalizeExcludes(options.excludes)
    }
    isSameArray(this.excludes, this.rawData) &&
      console.error('excludes can not be the same as data, please check!')
  }

  async raffle() {
    const data = this.rawData.filter((item) => !this.excludes?.includes(item))
    let picked
    for (let i = 0; i < this.pickCount; i++) {
      let previewCount = this.previewCount
      while (previewCount--) {
        await sleep(this.previewDelay)
        picked = pick(data, data.length - 1 - i)
        this.cb &&
          this.cb(picked, this.pickedList, this.pickedList.length as number)
      }
      await sleep(this.pickDelay)
      this.pickedList.push(picked as T)
    }
  }

  async run() {
    if (!this.flush) {
      this.flush = true
      await this.raffle()
      this.flush = false
    }
  }

  get value() {
    return this.pickedList
  }
}

export default function usePick<T>(
  options: UsePickOptions<T>,
  cb: UsePickCallback<T> | null = null,
) {
  return new PickRef<T>(options, cb)
}
