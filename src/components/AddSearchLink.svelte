<script lang="ts">
  import { searchLinks } from '../store';
  import { setStorage } from '../utils/storage';
  import { STORAGE_KEYS } from '../constants';
  import type { SearchLink } from '../types';
  import FormInstructions from './FormInstructions.svelte';
  import SearchLinkForm from './SearchLinkForm.svelte';

  export let centerButtons = false;
  let isInvalidInput = false;
  let savedSearchLinks: SearchLink[];
  let searchId = '';
  let searchUrl = '';

  searchLinks.subscribe((value) => {
    savedSearchLinks = value;
  });

  function handleInput() {
    const isSaved = savedSearchLinks.find(({ id }) => id === searchId);
    if (isSaved) isInvalidInput = true;
    else isInvalidInput = false;
  }

  async function handleAdd() {
    const searchLink = {
      id: searchId,
      url: searchUrl,
    };

    searchId = '';
    searchUrl = '';

    searchLinks.update((n) => [...n, searchLink]);

    await setStorage({
      [STORAGE_KEYS.searchLinks]: savedSearchLinks,
    });
  }
</script>

<FormInstructions />
<SearchLinkForm
  bind:searchId={searchId}
  bind:searchUrl={searchUrl}
  centerButtons={centerButtons}
  handleAdd={handleAdd}
  handleInput={handleInput}
  isInvalidInput={isInvalidInput}
/>
