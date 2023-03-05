import { isRef, reactive, toRaw } from 'vue-demi'
import { isNumber, isSameArray, sleep } from '@vruse/shared'
import type { Titem, Tpick, Tunwrap, UsePickCallback } from './types'

export interface UsePickOptions<T extends Tpick> {
  /**
   * Pick Count
   */
  pickCount: number

  /**
   * Excludes List
   */
  excludes?: Tunwrap<T> | Titem<Tunwrap<T>>

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

function normalizeExcludes<K>(e: Tunwrap<K> | Titem<Tunwrap<K>>) {
  return Array.isArray(e) ? (e as Tunwrap<K>) : ([e] as Titem<Tunwrap<K>>[])
}

interface IpickRef {
  run: () => void
}

class PickRef<P extends Tpick> {
  pickedList: any[] = []

  private flush = false

  private cb?: UsePickCallback<P>

  private _rawValue: Tunwrap<P>

  private previewDelay = 60

  private previewCount = 10

  private pickCount: number

  private excludes: Tunwrap<P> | Titem<Tunwrap<P>>[] | [] = []

  private pickDelay = 60

  constructor(
    target: P,
    options: UsePickOptions<P> | number,
    cb?: UsePickCallback<P>,
  ) {
    this._rawValue = (
      isRef(target) ? toRaw(target.value) : toRaw(target)
    ) as Tunwrap<P>

    this.pickedList = reactive([])

    if (isNumber(options)) {
      this.pickCount = options
    } else {
      if (options.excludes) {
        this.excludes = normalizeExcludes<P>(options.excludes)
        isSameArray(this.excludes, this._rawValue) &&
          console.error('excludes can not be the same as target, please check!')
      }
      this.pickCount = options.pickCount
      this.initPreView(options)
    }

    cb && (this.cb = cb)
  }

  private initPreView(options: UsePickOptions<P>) {
    options.previewDelay && (this.previewDelay = options.previewDelay)
    options.previewCount && (this.previewCount = options.previewCount)
    options.pickDelay && (this.pickDelay = options.pickDelay)
  }

  private async raffle() {
    const original =
      this.excludes.length > 0
        ? this._rawValue.filter(
            (item) => !this.excludes.includes(item as never),
          )
        : this._rawValue

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
}

async function run(this: any) {
  if (!this.flush) {
    this.flush = true
    await this.raffle()
    this.flush = false
  } else {
    console.warn('Please call it again after the execution is complete')
  }
}

function wrapRun(v: any) {
  v.run = run.bind(v)
  return v
}

export function usePick<T extends Tpick>(
  target: T,
  options: UsePickOptions<T> | number,
): PickRef<T> & IpickRef
export function usePick<T extends Tpick>(
  target: T,
  options: UsePickOptions<T> | number,
  cb: UsePickCallback<T>,
): PickRef<T> & IpickRef
export function usePick<T extends Tpick>(
  target: T,
  options: UsePickOptions<T> | number,
  cb?: UsePickCallback<T>,
): PickRef<T> & IpickRef {
  if (cb) {
    return wrapRun(new PickRef<T>(target, options, cb))
  }
  return wrapRun(new PickRef<T>(target, options))
}
