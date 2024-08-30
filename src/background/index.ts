import { addContextMenu, clearContextMenu, openInNewTab } from '@/utils/contextMenu'
import { DEFAULT } from '@/presets'
import { getStorage, setStorage } from '@/utils/storage'
import { STORAGE_KEYS } from '@/constants'

console.log('Background script init')

async function setInitialStorage() {
  console.log('Set initial storage')
  await setStorage({ [STORAGE_KEYS.searchLinks]: DEFAULT.searchLinks })
}

/* eslint-disable @typescript-eslint/no-unused-vars */
chrome.storage.onChanged.addListener((changes, namespace) => {
  for (const [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (key === STORAGE_KEYS.searchLinks) {
      console.log('Storage changed:', STORAGE_KEYS.searchLinks)
      clearContextMenu()
      addContextMenu(newValue)
    }
  }
})

// context menu items only need to be created at runtime.onInstalled
// https://github.com/GoogleChrome/chrome-extensions-samples/blob/main/api-samples/contextMenus/global_context_search/background.js
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    console.log('✅ Installed', details.reason)
    await setInitialStorage()
  } else {
    console.log('✅ onInstalled reason:', details.reason)

    const saved: SearchLink[] = await getStorage(STORAGE_KEYS.searchLinks)

    saved.forEach(({ id }) => addContextMenu(id))
  }
})

chrome.contextMenus.onClicked.addListener(openInNewTab)
