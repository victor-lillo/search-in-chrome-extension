import { writable, type Writable } from 'svelte/store'
import type { SearchLink } from '@/types'
import { STORAGE_KEYS } from '@/constants'
import { getStorage } from '@/utils/storage'

export const searchLinks: Writable<SearchLink[]> = writable([])

export const init = (async () => {
  const saved = await getStorage(STORAGE_KEYS.searchLinks)

  searchLinks.set(saved)
})()
