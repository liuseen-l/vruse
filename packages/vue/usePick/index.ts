// import { toRaw } from 'vue-demi'
// import { sleep } from '@vruse/shared'

// export interface UsePickOptions<T> {
//   /**
//    * Search List
//    */
//   data: T[]

//   /**
//    * Pick Count
//    */
//   pickCount: number

//   /**
//    * Excludes List
//    */
//   excludes?: T | T[]

//   /**
//    * Pick Interval
//    */
//   pickDelay?: number

//   /**
//    * Fashes Interval
//    */
//   previewDelay?: number

//   /**
//    * Fashes Count
//    */
//   previewCount?: number
// }

// export type UsePickCallback<V = any> = (
//   value: V,
//   PickList?: V[],
//   PlickListLength?: number,
// ) => any

// function pick<T>(data: T[], limit: number = data.length - 1) {
//   const picked = Math.floor(Math.random() * limit)
//   ;[data[picked], data[limit]] = [data[limit], data[picked]]
//   return data[limit]
// }

// function normalizeExcludes<T>(e: T | T[] | undefined) {
//   if (!e)
//     return []
//   return Array.isArray(e) ? e : [e]
// }

// class PickRef<T> {
//   /**
//    * Picked List, the last picked list can be obtained through value
//    */
//   private pickedList: T[] = []

//   private previewDelay: number

//   private previewCount: number

//   /**
//    * Get the original array of the responsive array
//    */
//   private rawData: T[]

//   private pickCount: number

//   private excludes: T[] = []

//   private pickDelay: number

//   /**
//    * use run() in React useEffect would be trigger twice
//    */
//   private flush = false

//   constructor(
//     options: UsePickOptions<T>,
//     private cb: UsePickCallback<T> | null,
//   ) {
//     if (options.excludes)
//       this.excludes = normalizeExcludes(options.excludes)

//     this.rawData = toRaw(options.data)

//     this.previewDelay = options.previewDelay ? options.previewDelay : 60
//     this.previewCount = options.previewCount ? options.previewCount : 10

//     this.pickDelay = options.pickDelay ? options.pickDelay : 60
//     this.pickCount = options.pickCount
//   }

//   async raffle() {
//     const data = this.rawData.filter(item => !this.excludes!.includes(item))

//     let picked
//     for (let i = 0; i < this.pickCount; i++) {
//       let previewCount = this.previewCount
//       while (previewCount--) {
//         await sleep(this.previewDelay)
//         picked = pick(data, data.length - 1 - i)
//         this.cb!(picked, this.pickedList, this.pickedList.length as number)
//       }
//       await sleep(this.pickDelay)
//       this.pickedList.push(picked as T)
//     }
//   }

//   async run() {
//     if (this.flush === false) {
//       this.flush = true
//       await this.raffle()
//       this.flush = false
//     }
//   }

//   get value() {
//     return this.pickedList
//   }
// }

// export default function usePick<T>(
//   options: UsePickOptions<T>,
//   cb: UsePickCallback<T> | null = null,
// ) {
//   return new PickRef<T>(options, cb)
// }
import type { Ref } from 'vue-demi'
import { isRef, reactive, toRaw } from 'vue-demi'
import { isNumber, sleep } from '@vruse/shared'

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

export type UsePickCallback<V = any> = (
  value: V,
  PlickListLength?: number,
) => any

function pick<T>(data: T[], limit: number = data.length - 1) {
  const picked = Math.floor(Math.random() * limit)
  ;[data[picked], data[limit]] = [data[limit], data[picked]]
  return data[limit]
}

function normalizeExcludes<T>(e: T | undefined) {
  if (!e) return []
  return Array.isArray(e) ? e : [e]
}

type Tpick = Ref<any[]> | any[]

class PickRef<P extends Tpick> {
  pickedList: any[] = []

  private _rawValue: any[]

  private previewDelay = 60

  private previewCount = 10

  private pickCount: number

  private excludes: any[] = []

  private pickDelay = 60

  private flush = false

  cb?: UsePickCallback<Tcalled<P>>

  constructor(
    target: P,
    options: UsePickOptions | number,
    cb?: UsePickCallback<Tcalled<P>>,
  ) {
    // 存储原始值
    this._rawValue = isRef(target)
      ? toRaw(target.value)
      : (toRaw(target) as any[])
    this.pickedList = reactive([])

    // 判断是否是传的数值
    if (isNumber(options)) {
      this.pickCount = options
    } else {
      this.pickCount = options.pickCount
      // 对象类型设置动画
      this.initPreView(options)
    }

    if (cb) this.cb = cb
  }

  initPreView(options: UsePickOptions) {
    if (options.excludes) this.excludes = normalizeExcludes(options.excludes)

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
        if (this.cb) this.cb(picked, this.pickedList.length)
      }
      await sleep(this.pickDelay)
    }
  }

  async run() {
    if (this.flush === false) {
      this.flush = true
      await this.raffle()
      this.flush = false
    }
  }
}

type Tcalled<K> = K extends Ref<infer Z>
  ? Z extends Array<infer U>
    ? U
    : Z
  : K extends Array<infer U>
  ? U
  : K

export function usePick<T extends Tpick>(target: T, options: number): PickRef<T>
export function usePick<T extends Tpick>(
  target: T,
  options: UsePickOptions,
): PickRef<T>
export function usePick<T extends Tpick>(
  target: T,
  options: number,
  cb: UsePickCallback<Tcalled<T>>,
): PickRef<T>
export function usePick<T extends Tpick>(
  target: T,
  options: UsePickOptions,
  cb: UsePickCallback<Tcalled<T>>,
): PickRef<T>
export function usePick<T extends Tpick, O extends UsePickOptions | number>(
  target: T,
  options: O,
  cb?: UsePickCallback<Tcalled<T>>,
) {
  if (cb) return new PickRef<T>(target, options, cb)
  return new PickRef<T>(target, options)
}
