import { addContextMenu, clearContextMenu } from './addContextMenu'
import { getStorage } from './storage'
import { SEARCH_PLACEHOLDER, STORAGE_KEYS } from '../constants'
import type { SearchLink } from '../types'

async function openInNewTab(info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab) {
  const searchLinks: SearchLink[] = await getStorage(STORAGE_KEYS.searchLinks)
  if (!tab) return
  const tabIndex = tab.index
  const selectionText = info.selectionText
  if (!selectionText) return
  const menuItemId = info.menuItemId
  const selectedSearchUrl = searchLinks.find(({ id }) => id === menuItemId)?.url
  if (!selectedSearchUrl) return
  const url = selectedSearchUrl.replace(SEARCH_PLACEHOLDER, selectionText)

  chrome.tabs.create({ url: url, index: tabIndex + 1 })
}

function removeListeners() {
  chrome.contextMenus.onClicked.removeListener(openInNewTab)
}

/* eslint-disable @typescript-eslint/no-unused-vars */
export default async function onStorageChanged() {
  chrome.storage.onChanged.addListener(async (changes, namespace) => {
    for (const [key, { oldValue, newValue }] of Object.entries(changes)) {
      if (key === STORAGE_KEYS.searchLinks) {
        clearContextMenu()
        removeListeners()
        addContextMenu(newValue)
        // Open a new search tab when the user clicks a context menu
        chrome.contextMenus.onClicked.addListener(openInNewTab)
        console.log(STORAGE_KEYS.searchLinks, 'changed')
      }
    }
  })
}
