import { addContextMenu, clearContextMenu, openInNewTab } from '@/utils/contextMenu'
import { DEFAULT } from '@/presets'
import { setStorage } from '@/utils/storage'
import { STORAGE_KEYS } from '@/constants'

// https://github.com/GoogleChrome/chrome-extensions-samples/blob/main/api-samples/contextMenus/global_context_search/background.js

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

chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    console.log('✅ Installed', details.reason)
    await setInitialStorage()
  }
})

chrome.contextMenus.onClicked.addListener(openInNewTab)
