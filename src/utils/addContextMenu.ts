import { SEARCH_PLACEHOLDER } from '../constants'
import { type SearchLink } from './presets'

export default function addContextMenu(searchLinks: SearchLink[]) {
  for (const { id } of searchLinks) {
    chrome.contextMenus.create({
      id: id,
      title: id,
      type: 'normal',
      contexts: ['selection'],
    })
  }
  // Open a new search tab when the user clicks a context menu
  chrome.contextMenus.onClicked.addListener((item, tab) => {
    const tabIndex = tab!.index
    const selectionText = item.selectionText!
    const menuItemId = item.menuItemId
    const selectedSearchUrl = searchLinks.find(({ id }) => id === menuItemId)?.url
    if (!selectedSearchUrl) return
    const url = selectedSearchUrl.replace(SEARCH_PLACEHOLDER, selectionText)

    chrome.tabs.create({ url: url, index: tabIndex + 1 })
  })
}
