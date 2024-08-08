<script lang="ts">
  import { searchLinks } from '../store';
  import { PRESETS } from '../utils/presets';
  import { setStorage } from '../utils/storage';
  import { STORAGE_KEYS } from '../constants';
  import type { SearchLink } from '../types';
  import Button from './Button.svelte';

  let isAlreadySaved: boolean = false;

  let savedSearchLinks: SearchLink[];

  searchLinks.subscribe((value) => {
    savedSearchLinks = value;
  });

  async function handleAdd(addedSearchLinks: SearchLink[]) {
    console.log(addedSearchLinks);
    searchLinks.update((n) => [...n]);

    await setStorage({
      [STORAGE_KEYS.searchLinks]: savedSearchLinks,
    });
  }
</script>

<h1>Presets</h1>
<form>
  {#each PRESETS as { label, searchLinks: presetSearchLinks }}
    <h3 class="title">{label}</h3>
    <ul class="list">
      {#each presetSearchLinks as { id, url }}
        <li class="row">
          {id}
          <code>{url}</code>
        </li>
      {/each}
    </ul>
    <Button variant="primary" type="submit" disabled={isAlreadySaved} on:click={() => handleAdd(presetSearchLinks)}>
      Add
    </Button>
  {/each}

  {#if isAlreadySaved}
    <p><strong>{isAlreadySaved}</strong> is already in use. Choose a different one.</p>
  {/if}
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .title {
    font-size: 2rem;
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    white-space: nowrap;
    cursor: inherit;
    contain: paint;
  }
</style>
