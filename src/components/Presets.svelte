<script lang="ts">
  import { added, alreadyAdded } from '@/utils/searchLinkComparison';
  import { alertAllItemsAdded, alertNoItemsAdded, alertSomeItemsAdded } from '@/utils/alerts';
  import { PRESETS } from '@/presets';
  import { searchLinks } from '@/store';
  import { setStorage } from '@/utils/storage';
  import { STORAGE_KEYS } from '@/constants';
  import type { SearchLink } from '@/types';
  import Button from '@/components/Button.svelte';

  let alreadyAddedSearchLinks: SearchLink[] = [];
  let newAddedSearchLinks: SearchLink[] = [];
  let savedSearchLinks: SearchLink[] = [];

  searchLinks.subscribe((value) => {
    savedSearchLinks = value;
  });

  async function handleAdd(e: MouseEvent, addedSearchLinks: SearchLink[]) {
    e.preventDefault();

    alreadyAddedSearchLinks = alreadyAdded(savedSearchLinks, addedSearchLinks);
    newAddedSearchLinks = added(savedSearchLinks, addedSearchLinks);

    const nonDuplicated = [...savedSearchLinks, ...newAddedSearchLinks];
    searchLinks.set(nonDuplicated);

    await setStorage({
      [STORAGE_KEYS.searchLinks]: nonDuplicated,
    });

    // All have already been added
    if (newAddedSearchLinks.length === 0) {
      alertNoItemsAdded(addedSearchLinks);
    }
    // Some have already been added
    else if (alreadyAddedSearchLinks.length > 0) {
      alertSomeItemsAdded(newAddedSearchLinks, alreadyAddedSearchLinks);
    }
    // All additions are new
    else {
      alertAllItemsAdded(newAddedSearchLinks);
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
