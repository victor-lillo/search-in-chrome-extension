<script lang="ts">
  import Button from '../components/Button.svelte'
  import Form from '../components/Form.svelte'
  import Settings from '../components/icons/Settings.svelte'

  const openOptionsPage = () => {
    chrome.runtime.openOptionsPage()
  }
</script>

<section>
  <Form />
  <Button variant="secondary" handleClick={openOptionsPage}>Open options <Settings /></Button>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-width: var(--width-popup);
  }
</style>
