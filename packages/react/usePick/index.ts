import { isNumber, isRef, sleep } from '@vruse/shared'
import { useState } from 'react'
import type { Titem, Tpick, Tunwrap, UsePickCallback } from './types'

export interface UsePickOptions<T> {
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

class PickRef<P> {
  pickedList: any[] = []

  private setPickedList: any

  private _rawValue: any[]

  private previewDelay = 60

  private previewCount = 10

  private pickCount: number

  private excludes: Tunwrap<P> | Titem<Tunwrap<P>>[] | [] = []

  private pickDelay = 60

  private flush = false

  cb?: UsePickCallback<P>

  constructor(
    target: Tpick,
    options: UsePickOptions<P> | number,
    cb?: UsePickCallback<P>,
  ) {
    this._rawValue = isRef(target) ? target.current : target

    const s = useState([])
    this.pickedList = s[0]
    this.setPickedList = s[1]

    if (isNumber(options)) {
      this.pickCount = options
    } else {
      if (options.excludes)
        this.excludes = normalizeExcludes<P>(options.excludes)
        // isSameArray(this.excludes, this._rawValue) &&
        //   console.error('excludes can not be the same as target, please check!')

      this.pickCount = options.pickCount
      this.initPreView(options)
    }

    cb && (this.cb = cb)
  }

  initPreView(options: UsePickOptions<P>) {
    options.previewDelay && (this.previewDelay = options.previewDelay)
    options.previewCount && (this.previewCount = options.previewCount)
    options.pickDelay && (this.pickDelay = options.pickDelay)
  }

  async raffle() {
    const original
      = (this.excludes as []).length > 0
        ? this._rawValue.filter(
          item => !(this.excludes as []).includes(item as never),
        )
        : this._rawValue

    let picked
    const temp = []
    for (let i = 0; i < this.pickCount; i++) {
      let previewCount = this.previewCount
      while (previewCount--) {
        await sleep(this.previewDelay)
        picked = pick(original, original.length - 1 - i)
        this.setPickedList([...temp, picked])
        // console.log(this.pickedList);
        this.cb && this.cb(picked, this.pickedList.length)
      }
      await sleep(this.pickDelay)
      temp.push(picked)
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

async function run(this: any) {
  if (!this.flush) {
    this.flush = true
    await this.raffle()
    this.flush = false
  }
}

function wrapRun(v: any) {
  v.run = run.bind(v)
  return v
}

export function usePick<T>(
  target: Tpick,
  options: UsePickOptions<T> | number,
): PickRef<T>
export function usePick<T>(
  target: Tpick,
  options: UsePickOptions<T> | number,
  cb: UsePickCallback<T>,
): PickRef<T>
export function usePick<T>(
  target: Tpick,
  options: UsePickOptions<T> | number,
  cb?: UsePickCallback<T>,
): PickRef<T> {
  if (cb)
    return wrapRun(new PickRef<T>(target, options, cb))

  return wrapRun(new PickRef<T>(target, options))
}
