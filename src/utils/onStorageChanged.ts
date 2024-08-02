import { STORAGE_KEYS } from '../constants'
import { addContextMenu, clearContextMenu } from './addContextMenu'

/* eslint-disable @typescript-eslint/no-unused-vars */
export default async function onStorageChanged() {
  chrome.storage.onChanged.addListener(async (changes, namespace) => {
    for (const [key, { oldValue, newValue }] of Object.entries(changes)) {
      if (key === STORAGE_KEYS.searchLinks) {
        clearContextMenu()
        addContextMenu(newValue)
        console.log(STORAGE_KEYS.searchLinks, 'changed')
      }
    }
  })
}
