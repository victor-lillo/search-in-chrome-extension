import { DEFAULT } from './presets'
import { setStorage } from './storage'
import { STORAGE_KEYS } from '../constants'

async function initStorage() {
  await setStorage({ [STORAGE_KEYS.searchLinks]: DEFAULT.searchLinks })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function onInstallCallback(details: chrome.runtime.InstalledDetails) {
  // Debug log
  // console.log('Installed ✅', details.reason)
  initStorage()
}

export default function onInstall() {
  chrome.runtime.onInstalled.addListener((details) => {
    onInstallCallback(details)
  })
}
