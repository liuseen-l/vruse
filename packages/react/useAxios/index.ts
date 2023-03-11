import axios from 'axios'
import { useState } from 'react'
import type {
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  GenericAbortSignal,
} from 'axios'

let globalInstance: AxiosInstance | undefined

export function useAxiosCreate(config?: CreateAxiosDefaults) {
  globalInstance = axios.create(config)
  return globalInstance
}

export function useAxiosInstance(config?: CreateAxiosDefaults) {
  return globalInstance || useAxiosCreate(config)
}

// TODO: 这些工具类型移动到 util 或 shared
export type SetStateType<D> = React.Dispatch<React.SetStateAction<D>>
export type UseSateType<D> = [D, SetStateType<D>]

export interface AxiosControler<D> {
  loadingState?: UseSateType<boolean>
  dataState?: UseSateType<D | undefined>
  cancelController?: GenericAbortSignal
  instance?: AxiosInstance
}

export interface RequestResponse<D> {
  loading: boolean
  data: D | undefined
  setLoading: SetStateType<boolean>
  setData: SetStateType<D | undefined>
  abort: AbortController['abort']
  response: AxiosResponse<D> | undefined
}

export interface RequestControler<D> {
  loadingState?: UseSateType<boolean>
  dataState?: UseSateType<D | undefined>
  instance?: AxiosInstance
  cancelController?: AbortController
}

export type RequestConfig<D = any> = AxiosRequestConfig & {
  controller?: RequestControler<D>
}

export function useAxiosController<D>(initialController?: RequestControler<D>) {
  const [loading, setLoading] = initialController?.loadingState || useState<boolean>(true)
  const [data, setData] = initialController?.dataState || useState<D>()
  return {
    loading,
    setLoading,
    data,
    setData,
    instance: initialController?.instance || useAxiosInstance(),
    cancelController: initialController?.cancelController || new AbortController(),
  }
}

export function useGet<D>(url: string, opt: RequestConfig<D> = {}) {
  return useAxios<D>(url, {
    method: 'GET',
    ...opt,
  })
}

export function usePost<D>(url: string, opt: RequestConfig<D> = {}) {
  return useAxios<D>(url, {
    method: 'POST',
    ...opt,
  })
}

export function useAxios<D = any>(
  url: string,
  opt: RequestConfig<D> = {},
): RequestResponse<D> & Promise<RequestResponse<D>> {
  const [response, setResponse] = useState<AxiosResponse<D>>()

  const controller = useAxiosController<D>(opt.controller)

  opt.signal = controller.cancelController.signal

  /** auto add timerstamp */
  const timerstamp = Date.now().toString()
  if (opt.params)
    opt.params.timerstamp = timerstamp
  if (opt.data)
    opt.data.timerstamp = timerstamp

  const instance = controller.instance

  const p = instance(url, opt) as AxiosPromise<D>

  const result = {
    response,
    ...controller,
    abort: controller.cancelController.abort,
  }

  p.catch((e) => {
    const { setLoading } = controller
    setLoading(false)
    throw e
  })

  const rp = p.then((r) => {
    const { setLoading } = controller
    const { setData } = controller
    setLoading(false)
    setData(r.data)
    setResponse(r)
    return result
  })

  return Object.assign(rp, result)
}
