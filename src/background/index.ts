import onInstall from '@/utils/onInstall'
import onStorageChanged from '@/utils/onStorageChanged'

// https://github.com/GoogleChrome/chrome-extensions-samples/blob/main/api-samples/contextMenus/global_context_search/background.js

onStorageChanged()
onInstall()
