import onInstall from '../utils/onInstall'
import onStorageChanged from '../utils/onStorageChanged'

console.log('Service worker started.')

// https://github.com/GoogleChrome/chrome-extensions-samples/blob/main/api-samples/contextMenus/global_context_search/background.js

onInstall()
onStorageChanged()

// Chrome onStartup example
chrome.runtime.onStartup.addListener(() => {
  console.log('Browser init')
})
