<script lang="ts">
  import Button from '../components/Button.svelte'
  import { MESSAGE_OBJECT } from '../constants'
  import { sendMessageToBackground, sendMessageToContent } from '../utils/sendMessage'

  export let prop: string

  const openOptionsPage = () => {
    chrome.runtime.openOptionsPage()
  }

  const messageToBackground = async () => {
    const response = await sendMessageToBackground({ [MESSAGE_OBJECT.key]: MESSAGE_OBJECT.value })
    console.log('POPUP: Response from background:', response)
  }

  const messageToContent = async () => {
    const response = await sendMessageToContent({ [MESSAGE_OBJECT.key]: MESSAGE_OBJECT.value })
    console.log('POPUP: Response from content:', response)
  }
</script>

<section>
  Popup {prop}
  <Button handleClick={messageToBackground} variant="alert">Send message to Background</Button>
  <Button handleClick={messageToContent} variant="alert">Send message to Content</Button>
  <Button handleClick={openOptionsPage}>Open options</Button>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-width: var(--width-popup);
  }
</style>
