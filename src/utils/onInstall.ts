import { SEARCH_PLACEHOLDER, STORAGE_KEYS } from '../constants'
import { setStorage } from './storage'

const searchObj: { id: string; url: string }[] = [
  { id: '🌐 Google', url: `https://google.com/search?q=${SEARCH_PLACEHOLDER}` },
  { id: '🤖 StackOverflow', url: `https://stackoverflow.com/search?q=${SEARCH_PLACEHOLDER}` },
  { id: '💻 GitHub Code', url: `https://github.com/search?q=${SEARCH_PLACEHOLDER}&type=code` },
  { id: '📚 GitHub Repositories', url: `https://github.com/search?q=${SEARCH_PLACEHOLDER}&type=repositories` },
]

async function saveInitialDate() {
  await setStorage({ [STORAGE_KEYS.installDate]: installDate })
}

async function onInstallCallback(details: chrome.runtime.InstalledDetails) {
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

export default function onInstall() {
  chrome.runtime.onInstalled.addListener((details) => {
    onInstallCallback(details)
  })
}
