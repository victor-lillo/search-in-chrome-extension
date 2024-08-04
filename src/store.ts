import { writable } from 'svelte/store'
import { DEFAULT } from './utils/presets'

export const searchLinks = writable(DEFAULT.searchLinks)
