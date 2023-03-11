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

// interface IFetchChunk<T> {
//   loading: React.Dispatch<React.SetStateAction<boolean>>
//   data: React.Dispatch<React.SetStateAction<T | undefined>>
// }

export interface IFetchControler<D> {
  loading: React.Dispatch<React.SetStateAction<boolean>>
  data: React.Dispatch<React.SetStateAction<D | undefined>>
  cancelController: GenericAbortSignal
  instance?: AxiosInstance
}

export interface RequestResponse<D> {
  loading: boolean
  data: D | undefined
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setData: React.Dispatch<React.SetStateAction<D | undefined>>
  abort: AbortController['abort']
  response: AxiosResponse<D> | undefined
}

export interface RequestControler<D> {
  loading?: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  data?: [D | undefined, React.Dispatch<React.SetStateAction<D | undefined>>]
  instance?: AxiosInstance
  cancelController?: AbortController
}

export type RequestConfig<D = any> = AxiosRequestConfig & {
  controller?: RequestControler<D>
}

enum CONTROLLER {
  LOADING = 1,
  DATA = 2,
}

function unWrapState<D>(
  state: [D, React.Dispatch<React.SetStateAction<D>>] | undefined,
  key: CONTROLLER,
) {
  switch (key) {
    case CONTROLLER.LOADING:
      if (state) {
        const [loading, setLoading] = state
        return [loading, setLoading]
      } else {
        return useState(true)
      }
    case CONTROLLER.DATA:
      if (state) {
        const [data, setData] = state
        return [data, setData]
      } else {
        return useState(undefined)
      }
  }
}

export function useAxiosController<D>(initialController?: RequestControler<D>) {
  // if(!initialController?.loading){}
  // const [loading, setLoading] = initialController?.loading ? useState<boolean>()
  // const [data, setData] = useState<D | undefined>(initialController?.data)
  const [loading, setLoading] = unWrapState(initialController?.loading, CONTROLLER.LOADING) as [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  const [data, setData] = unWrapState(initialController?.data, CONTROLLER.DATA) as [D | undefined, React.Dispatch<React.SetStateAction<D | undefined>>]
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
