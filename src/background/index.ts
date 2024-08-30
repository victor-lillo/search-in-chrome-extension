import { addContextMenu, openInNewTab } from '@/utils/contextMenu'
import { DEFAULT } from '@/presets'
import { getStorage, setStorage } from '@/utils/storage'
import { STORAGE_KEYS } from '@/constants'
import { added, removed } from '@/utils/searchLinkComparison'
import type { SearchLink } from '@/types'

console.log('Background script init')

async function setInitialStorage() {
  console.log('Set initial storage')
  await setStorage({ [STORAGE_KEYS.searchLinks]: DEFAULT.searchLinks })
}

chrome.storage.onChanged.addListener((changes) => {
  for (const [key, value] of Object.entries(changes)) {
    if (key === STORAGE_KEYS.searchLinks) {
      const oldValue: SearchLink[] = value.oldValue ?? []
      const newValue: SearchLink[] = value.newValue

      console.log('Storage changed:', STORAGE_KEYS.searchLinks)

      const addedSearchLinks = added(oldValue, newValue)
      const removedSearchLinks = removed(oldValue, newValue)
      console.log({ addedSearchLinks })
      console.log({ removedSearchLinks })

      addedSearchLinks.forEach(({ id }) => addContextMenu(id))
      removedSearchLinks.forEach(({ id }) => chrome.contextMenus.remove(id))
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
