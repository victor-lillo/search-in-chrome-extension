<script lang="ts">
  import { searchLinks } from '../store';
  import { PRESETS } from '../utils/presets';
  import { setStorage } from '../utils/storage';
  import { STORAGE_KEYS } from '../constants';
  import type { SearchLink } from '../types';
  import Button from './Button.svelte';

  let alreadyAddedSearchLinks: SearchLink[] = [];
  let newAddedSearchLinks: SearchLink[] = [];
  let savedSearchLinks: SearchLink[] = [];

  searchLinks.subscribe((value) => {
    savedSearchLinks = value;
  });

  async function handleAdd(e: MouseEvent, addedSearchLinks: SearchLink[]) {
    e.preventDefault();

    alreadyAddedSearchLinks = savedSearchLinks.filter((el) => addedSearchLinks.some((element) => element.id === el.id));
    newAddedSearchLinks = addedSearchLinks.filter((el) => !savedSearchLinks.some((element) => element.id === el.id));

    const nonDuplicated = [...savedSearchLinks, ...newAddedSearchLinks];
    searchLinks.set(nonDuplicated);

    await setStorage({
      [STORAGE_KEYS.searchLinks]: nonDuplicated,
    });

    // All have already been added
    if (newAddedSearchLinks.length === 0) {
      const formatter = new Intl.ListFormat('en', {
        style: 'long',
        type: 'conjunction',
      });
      const addedText = `❌ ${formatter.format(addedSearchLinks.map(({ id }) => id))} were already saved, there is nothing to add.`;

      alert(addedText);
      return;
    }
    // Some have already been added
    else if (alreadyAddedSearchLinks.length > 0) {
      const formatter = new Intl.ListFormat('en', {
        style: 'long',
        type: 'conjunction',
      });
      const addedText = `✅ ${formatter.format(newAddedSearchLinks.map(({ id }) => id))} added successfully.\n❌ ${formatter.format(alreadyAddedSearchLinks.map(({ id }) => id))} were already added.`;

      alert(addedText);
    }
    // All additions are new
    else {
      const formatter = new Intl.ListFormat('en', {
        style: 'long',
        type: 'conjunction',
      });
      const addedText = `✅ ${formatter.format(newAddedSearchLinks.map(({ id }) => id))} added successfully.\n`;

      alert(addedText);
    }
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
    <Button variant="primary" type="submit" handleClick={(e) => handleAdd(e, presetSearchLinks)}>Add</Button>
  {/each}

  {#if alreadyAddedSearchLinks.length > 0}
    <p><strong></strong> is already in use. Choose a different one.</p>
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
