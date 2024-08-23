type Message = Record<string, string>;

export async function sendMessageToBackground(message: Message) {
  const response = await chrome.runtime.sendMessage(message)
  return response
}

export async function sendMessageToContent(message: Message) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  const response = await chrome.tabs.sendMessage(tab.id!, message)
  return response
}
