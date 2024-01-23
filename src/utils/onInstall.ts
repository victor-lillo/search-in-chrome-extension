export default function onInstall(onInstallCallback) {
  chrome.runtime.onInstalled.addListener(onInstallCallback)
}
