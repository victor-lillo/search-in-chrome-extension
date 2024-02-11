<script lang="ts">
  import Button from '../components/Button.svelte'
  import Form from '../components/Form.svelte'

  const openOptionsPage = () => {
    chrome.runtime.openOptionsPage()
  }
</script>

<section>
  <Button handleClick={openOptionsPage}>Open options</Button>
  <Form />
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-width: var(--width-popup);
  }
</style>
