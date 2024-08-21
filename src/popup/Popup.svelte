<script lang="ts">
  import Button from '../components/Button.svelte';
  import AddSearchLink from '../components/AddSearchLink.svelte';
  import Settings from '../components/icons/Settings.svelte';

  const openOptionsPage = () => {
    chrome.runtime.openOptionsPage();
  };
</script>

<section>
  <h1>Add new query</h1>
  <AddSearchLink />
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
