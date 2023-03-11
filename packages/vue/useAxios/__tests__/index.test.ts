import type { RawAxiosRequestConfig } from 'axios'
import { useAxios, useAxiosCreate } from '../..'

describe('useAxios', () => {
  const url = 'https://jsonplaceholder.typicode.com/todos/1'
  const config: RawAxiosRequestConfig = {
    method: 'GET',
  }

  const testInstance = useAxiosCreate({
    baseURL: 'https://jsonplaceholder.typicode.com',
  })

  const finalInstance = useAxiosCreate()

  const options = { immediate: false }
  const path = '/todos/1'

  test('params: url with await', async () => {
    const { loading, data } = await useAxios(url)
    expect(loading.value).toBeFalsy()
    expect(data.value.id).toBe(1)
  })

  test('params: url with then', async () => {
    useAxios(url).then(({ loading, data }) => {
      expect(loading.value).toBeFalsy()
      expect(data.value.id).toBe(1)
    })
  })

  test('params: url without await and then', async () => {
    const res = useAxios(url)

    expect(res.loading.value).toBeTruthy()
    res.then(() => {
      expect(res.loading.value).toBeFalsy()
      expect(res.data.value.id).toBe(1)
    })
  })

  test('use custom instance', async () => {
    const { loading, data } = await useAxios(path, {
      controller: {
        instance: testInstance,
      },
    })
    expect(loading.value).toBeFalsy()
    expect(data.value.id).toBe(1)
  })
})
