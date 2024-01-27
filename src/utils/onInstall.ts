import { SEARCH_PLACEHOLDER, STORAGE_KEYS } from '../constants'
import { DEFAULT } from './presets'
import { setStorage } from './storage'

async function initStorage() {
  await setStorage({ [STORAGE_KEYS.searchLinks]: DEFAULT.searchLinks })
}

async function onInstallCallback(details: chrome.runtime.InstalledDetails) {
  console.log('Installed ✅', details.reason)
  initStorage()
  for (const { id } of DEFAULT.searchLinks) {
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
    const selectedSearchUrl = DEFAULT.searchLinks.find(({ id }) => id === menuItemId)?.url
    if (!selectedSearchUrl) return
    const url = selectedSearchUrl.replace(SEARCH_PLACEHOLDER, selectionText)

    chrome.tabs.create({ url: url, index: tabIndex + 1 })
  })
}

export default function onInstall() {
  chrome.runtime.onInstalled.addListener((details) => {
    onInstallCallback(details)
  })
}
