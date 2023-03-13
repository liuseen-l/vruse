import axios from 'axios'
import { ref } from 'vue-demi'

import type { Ref } from 'vue-demi'
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

export interface IFetchControler<D> {
  loading: boolean
  data: D
  cancelController: GenericAbortSignal
  instance?: AxiosInstance
}

export interface RequestResponse<D> {
  loading: Ref<boolean>
  data: Ref<D | undefined>
  abort: AbortController['abort']
  response: Ref<AxiosResponse<D> | undefined>
}

export type RequestControler<D> = ReturnType<typeof useAxiosControler<D>> & {
  instance?: AxiosInstance
}

export type RequestConfig<D = any> = AxiosRequestConfig & {
  controller?: Partial<RequestControler<D>>
}

export function useAxiosControler<D>() {
  return {
    loading: ref(true),
    data: ref<D>(),
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
  const response = ref<AxiosResponse<D>>()

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
    controller.loading.value = false
    throw e
  })

  const rp = p.then((r) => {
    controller.loading.value = false
    controller.data.value = r.data
    response.value = r
    return result
  })

  return Object.assign(rp, result)
}
