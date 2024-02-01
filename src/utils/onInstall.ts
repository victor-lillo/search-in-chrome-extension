import { DEFAULT } from './presets'
import { setStorage } from './storage'
import { STORAGE_KEYS } from '../constants'
import addContextMenu from './addContextMenu'

async function initStorage() {
  await setStorage({ [STORAGE_KEYS.searchLinks]: DEFAULT.searchLinks })
}

async function onInstallCallback(details: chrome.runtime.InstalledDetails) {
  console.log('Installed ✅', details.reason)
  initStorage()
  addContextMenu(DEFAULT.searchLinks)
}

export default function onInstall() {
  chrome.runtime.onInstalled.addListener((details) => {
    onInstallCallback(details)
  })
}
