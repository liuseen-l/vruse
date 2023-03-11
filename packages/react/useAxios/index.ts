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

interface IFetchChunk<T> {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  data: T | undefined
  setData: React.Dispatch<React.SetStateAction<T | undefined>>
}

export interface IFetchControler<D> extends IFetchChunk<D> {
  cancelController: GenericAbortSignal
  instance?: AxiosInstance
}

export interface RequestResponse<D> extends IFetchChunk<D> {
  abort: AbortController['abort']
  response: AxiosResponse<D> | undefined
}

export type RequestControler<D> = ReturnType<typeof useAxiosControler<D>> & {
  instance?: AxiosInstance
}

export type RequestConfig<D = any> = AxiosRequestConfig & {
  controller?: Partial<RequestControler<D>>
}

export function useAxiosControler<D>() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<D>()
  return {
    loading,
    setLoading,
    data,
    setData,
    cancelController: new AbortController(),
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

  const controller = {
    ...useAxiosControler<D>(),
    ...opt.controller,
  }

  opt.signal = controller.cancelController.signal

  /** auto add timerstamp */
  const timerstamp = Date.now().toString()
  if (opt.params)
    opt.params.timerstamp = timerstamp
  if (opt.data)
    opt.data.timerstamp = timerstamp

  const instance = controller.instance || useAxiosInstance()

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
