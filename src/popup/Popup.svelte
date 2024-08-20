<script lang="ts">
  import Button from '../components/Button.svelte';
  import AddSearchLinks from '../components/AddSearchLinks.svelte';
  import Settings from '../components/icons/Settings.svelte';

  const openOptionsPage = () => {
    chrome.runtime.openOptionsPage();
  };
</script>

<section>
  <h1>Add new queries</h1>
  <AddSearchLinks />
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
