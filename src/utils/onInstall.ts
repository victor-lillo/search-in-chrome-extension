type onInstallCallback = (details: chrome.runtime.InstalledDetails) => void

export default function onInstall(onInstallCallback: onInstallCallback) {
  chrome.runtime.onInstalled.addListener((details) => {
    onInstallCallback(details)
  })
}
