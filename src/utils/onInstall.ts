import { DEFAULT } from './presets'
import { setStorage } from './storage'
import { STORAGE_KEYS } from '../constants'

async function initStorage() {
  await setStorage({ [STORAGE_KEYS.searchLinks]: DEFAULT.searchLinks })
}

async function onInstallCallback(details: chrome.runtime.InstalledDetails) {
  console.log('Installed ✅', details.reason)
  initStorage()
}

export default function onInstall() {
  chrome.runtime.onInstalled.addListener((details) => {
    onInstallCallback(details)
  })
}
