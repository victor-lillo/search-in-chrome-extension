import onInstall from '../utils/onInstall'
import onMessage from '../utils/onMessage'
import onStorageChanged from '../utils/onStorageChanged'

console.log('Service worker started.')

const onInstallCallback = async () => {
  // await saveInitialDate()
  console.log('Installed ✅')
}

onInstall(onInstallCallback)
onMessage()
onStorageChanged()

// Chrome onStartup example
chrome.runtime.onStartup.addListener(() => {
  console.log('Browser init')
})
