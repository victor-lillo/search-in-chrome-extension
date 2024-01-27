import { STORAGE_KEYS } from '../constants'
import { DEFAULT } from './presets'
import { setStorage } from './storage'

async function saveInitialDate() {
  await setStorage({ [STORAGE_KEYS.installDate]: installDate })
}

async function onInstallCallback(details: chrome.runtime.InstalledDetails) {
  console.log('Installed ✅', details)
  for (const { id } of DEFAULT.searchLinks) {
    chrome.contextMenus.create({
      id: id,
      title: id,
      type: 'normal',
      contexts: ['selection'],
    })
  }
}

export default function onInstall() {
  chrome.runtime.onInstalled.addListener((details) => {
    onInstallCallback(details)
  })
}
