import { openDB } from 'idb'

const DB_NAME = 'kalma-db'
const DB_VERSION = 1

export async function getStore() {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(database) {
      if (!database.objectStoreNames.contains('cache')) {
        database.createObjectStore('cache', { keyPath: 'key' })
      }
      if (!database.objectStoreNames.contains('user')) {
        database.createObjectStore('user', { keyPath: 'key' })
      }
    },
  })
  return db
}

export async function writeCache(key, value) {
  const db = await getStore()
  await db.put('cache', { key, value })
}

export async function readCache(key) {
  const db = await getStore()
  const item = await db.get('cache', key)
  return item ? item.value : null
}

export async function writeUser(key, value) {
  const db = await getStore()
  await db.put('user', { key, value })
}

export async function readUser(key) {
  const db = await getStore()
  const item = await db.get('user', key)
  return item ? item.value : null
}
