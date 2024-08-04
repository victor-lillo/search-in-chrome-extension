import { writable, type Writable } from 'svelte/store'
import type { SearchLink } from './types'

export const searchLinks: Writable<SearchLink[]> = writable()
