<script lang="ts">
  import AddSearchLink from '../components/AddSearchLink.svelte';
  import Header from '../components/Header.svelte';
  import Settings from '../components/icons/Settings.svelte';

  const openOptionsPage = () => {
    chrome.runtime.openOptionsPage();
  };
</script>

<Header />
<section class="form-wrapper">
  <h1>Add new query</h1>
  <AddSearchLink centerButtons={true} />
</section>
<section>
  <button class="options" type="button" on:click={openOptionsPage}>Open options <Settings /></button>
</section>

<style>
  .form-wrapper {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-width: var(--width-popup);
  }

  .options {
    border: none;
    margin-top: 0.5rem;
    font-size: 1.2rem;
    width: 100%;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    padding-block: 0.6rem;
    background-color: var(--color-dark-3);
    transition: background-color 0.3s ease;
  }

  @media (hover: hover) {
    .options:hover {
      background-color: var(--color-dark-4);
    }
  }
</style>
