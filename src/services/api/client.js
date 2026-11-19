import { env } from '@/config/env.js'

export class ApiError extends Error {
  constructor(message, status, payload) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.payload = payload
  }
}

const parseJsonSafely = async (response) => {
  try {
    return await response.json()
  } catch {
    return null
  }
}

export async function apiClient({
  path,
  method = 'GET',
  body,
  headers = {},
  token,
  retries = 1,
}) {
  const authToken = token || localStorage.getItem('kalma-auth-token')
  const requestHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  }

  if (authToken) {
    requestHeaders.Authorization = `Bearer ${authToken}`
  }

  const request = {
    method,
    headers: requestHeaders,
    body: body ? JSON.stringify(body) : undefined,
  }

  let lastError = null

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const response = await fetch(`${env.apiBaseUrl}${path}`, request)
      const payload = await parseJsonSafely(response)

      if (!response.ok) {
        const message = payload?.message || 'Request failed'
        throw new ApiError(message, response.status, payload)
      }

      return payload
    } catch (error) {
      lastError = error
      if (attempt < retries) {
        continue
      }
      throw error
    }
  }

  throw lastError
}

export const normalizeApiError = (error) => ({
  message: error?.message || 'Something went wrong',
  status: error?.status || 500,
})
