import axios from 'axios'

export function createClient(baseURL) {
  const client = axios.create({ baseURL })

  client.interceptors.request.use((config) => {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers = config.headers || {}
        config.headers.Authorization = `Bearer ${token}`
      }
    } catch (e) {
      // ignore
    }
    return config
  })

  client.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response && err.response.status === 401) {
        // broadcast logout so other tabs/components can react
        window.dispatchEvent(new Event('logout'))
      }
      return Promise.reject(err)
    }
  )

  return client
}
