<script lang="ts">
  import Button from '../components/Button.svelte';
  import SaveForm from '../components/SaveForm.svelte';
  import Settings from '../components/icons/Settings.svelte';

  const openOptionsPage = () => {
    chrome.runtime.openOptionsPage();
  };
</script>

<section>
  <SaveForm />
  <Button variant="outlined-white" handleClick={openOptionsPage}>Open options <Settings /></Button>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-width: var(--width-popup);
  }
</style>
