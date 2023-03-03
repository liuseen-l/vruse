import { isRef, reactive, toRaw } from 'vue-demi'
import { isNumber, isSameArray, sleep } from '@vruse/shared'
import type { Tpick, UsePickCallback } from './types'

export interface UsePickOptions {
  /**
   * Pick Count
   */
  pickCount: number

  /**
   * Excludes List
   */
  excludes?: any[]

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

function pick<T>(target: T[], limit: number = target.length - 1) {
  const picked = Math.floor(Math.random() * limit)
  ;[target[picked], target[limit]] = [target[limit], target[picked]]
  return target[limit]
}

function normalizeExcludes<T>(e: T | T[] = []) {
  return Array.isArray(e) ? e : [e]
}

class PickRef<P extends Tpick> {
  pickedList: any[] = []

  private _rawValue: any[]

  private previewDelay = 60

  private previewCount = 10

  private pickCount: number

  private excludes: any[] = []

  private pickDelay = 60

  private flush = false

  cb?: UsePickCallback<P>

  constructor(
    target: P,
    options: UsePickOptions | number,
    cb?: UsePickCallback<P>,
  ) {
    // 存储原始值,用于过滤
    this._rawValue = isRef(target)
      ? toRaw(target.value)
      : (toRaw(target) as any[])
    this.pickedList = reactive([])

    // 判断是否是传的数值
    if (isNumber(options)) {
      this.pickCount = options
    } else {
      this.pickCount = options.pickCount
      // options为对象类型时设置动画
      this.initPreView(options)
    }

    if (cb) this.cb = cb
  }

  initPreView(options: UsePickOptions) {
    if (options.excludes) {
      this.excludes = normalizeExcludes(options.excludes)
    }
    isSameArray(this.excludes, this._rawValue) &&
      console.error('excludes can not be the same as target, please check!')

    options.previewDelay && (this.previewDelay = options.previewDelay)
    options.previewCount && (this.previewCount = options.previewCount)
    options.pickDelay && (this.pickDelay = options.pickDelay)
  }

  async raffle() {
    const original = this._rawValue.filter(
      (item) => !this.excludes!.includes(item),
    )

    let picked
    for (let i = 0; i < this.pickCount; i++) {
      let previewCount = this.previewCount
      let flag = true
      while (previewCount--) {
        await sleep(this.previewDelay)
        picked = pick(original, original.length - 1 - i)
        if (flag) {
          this.pickedList.push(picked)
          flag = false
        } else {
          this.pickedList[this.pickedList.length - 1] = picked
        }
        this.cb && this.cb(picked, this.pickedList.length)
      }
      await sleep(this.pickDelay)
    }
  }

  async run() {
    if (!this.flush) {
      this.flush = true
      await this.raffle()
      this.flush = false
    }
  }
}

export function usePick<T extends Tpick>(target: T, options: number): PickRef<T>
export function usePick<T extends Tpick>(
  target: T,
  options: UsePickOptions,
): PickRef<T>
export function usePick<T extends Tpick>(
  target: T,
  options: number,
  cb: UsePickCallback<T>,
): PickRef<T>
export function usePick<T extends Tpick>(
  target: T,
  options: UsePickOptions,
  cb: UsePickCallback<T>,
): PickRef<T>
export function usePick<T extends Tpick, O extends UsePickOptions | number>(
  target: T,
  options: O,
  cb?: UsePickCallback<T>,
) {
  if (cb) return new PickRef<T>(target, options, cb)
  return new PickRef<T>(target, options)
}
