import { type SearchLink } from '@/types'

export function addContextMenu(searchLinks: SearchLink[]) {
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
