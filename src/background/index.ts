import onInstall from '../utils/onInstall'
import onMessage from '../utils/onMessage'
import onStorageChanged from '../utils/onStorageChanged'

const SEARCH_PLACEHOLDER = 'TOSEARCH'

console.log('Service worker started.')

const searchObj: { id: string; url: string }[] = [
  { id: '🌐 Google', url: `https://google.com/search?q=${SEARCH_PLACEHOLDER}` },
  { id: '🤖 StackOverflow', url: `https://stackoverflow.com/search?q=${SEARCH_PLACEHOLDER}` },
  { id: '💻 GitHub Code', url: `https://github.com/search?q=${SEARCH_PLACEHOLDER}&type=code` },
  { id: '📚 GitHub Repositories', url: `https://github.com/search?q=${SEARCH_PLACEHOLDER}&type=repositories` },
]

const onInstallCallback = async (details: chrome.runtime.InstalledDetails) => {
  console.log('Installed ✅', details)
  for (const { id } of searchObj) {
    chrome.contextMenus.create({
      id: id,
      title: id,
      type: 'normal',
      contexts: ['selection'],
    })
  }
}

// Open a new search tab when the user clicks a context menu
chrome.contextMenus.onClicked.addListener((item, tab) => {
  const tabIndex = tab!.index
  const selectionText = item.selectionText!
  const menuItemId = item.menuItemId
  const selectedSearchUrl = searchObj.find(({ id }) => id === menuItemId)?.url
  if (!selectedSearchUrl) return
  const url = selectedSearchUrl.replace(SEARCH_PLACEHOLDER, selectionText)

  chrome.tabs.create({ url: url, index: tabIndex + 1 })
})

// https://github.com/GoogleChrome/chrome-extensions-samples/blob/main/api-samples/contextMenus/global_context_search/background.js

onInstall(onInstallCallback)
onMessage()
onStorageChanged()

// Chrome onStartup example
chrome.runtime.onStartup.addListener(() => {
  console.log('Browser init')
})
