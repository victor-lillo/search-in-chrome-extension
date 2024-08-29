import type { SearchLink } from '@/types'
import { getStorage } from '@/utils/storage'
import { SEARCH_PLACEHOLDER, STORAGE_KEYS } from '@/constants'

export function addContextMenu(searchLinks: SearchLink[]) {
  console.log('Add contexts menu', searchLinks)
  for (const { id } of searchLinks) {
    chrome.contextMenus.create({
      id: id,
      title: id,
      type: 'normal',
      contexts: ['selection'],
    })
  }
}

export function clearContextMenu() {
  chrome.contextMenus.removeAll()
}

export async function openInNewTab(info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab) {
  console.log('Context menu tab clicked')
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
