export default async function onStorageChanged() {
  chrome.storage.onChanged.addListener(async (changes, namespace) => {
    for (const [key, { oldValue, newValue }] of Object.entries(changes)) {
      console.log(`${key} changed to ${newValue}`)
    }
  })
}
