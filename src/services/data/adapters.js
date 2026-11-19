import { readCache, writeCache } from '@/services/storage/idb.js'
import { env } from '@/config/env.js'
import { apiClient, normalizeApiError } from '@/services/api/client.js'

const normalizePath = (path) => path.startsWith('/') ? path : `/${path}`

export class LocalJsonAdapter {
  async fetchJson(path) {
    const cacheKey = `local-json:${path}`
    const cached = await readCache(cacheKey)
    if (cached) {
      return cached
    }

    const response = await fetch(normalizePath(path))
    if (!response.ok) {
      throw new Error(`Unable to load ${path}`)
    }

    const data = await response.json()
    await writeCache(cacheKey, data)
    return data
  }
}

export class RestAdapter {
  async fetchJson(path, options = {}) {
    try {
      return await apiClient({ path: normalizePath(path), ...options })
    } catch (error) {
      throw normalizeApiError(error)
    }
  }
}

export function getDataAdapter() {
  return env.dataSource === 'api' ? new RestAdapter() : new LocalJsonAdapter()
}
