<script lang="ts">
  import { searchLinks } from '../store';
  import { setStorage } from '../utils/storage';
  import { STORAGE_KEYS } from '../constants';
  import type { SearchLink } from '../types';

  import SearchLinkForm from './SearchLinkForm.svelte';

  export let searchId: string = '';
  export let searchUrl: string = '';
  let isInvalidInput: boolean = false;

  let savedSearchLinks: SearchLink[];

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

<SearchLinkForm
  searchId={searchId}
  searchUrl={searchUrl}
  handleAdd={handleAdd}
  handleInput={handleInput}
  isInvalidInput={isInvalidInput}
/>

<style>
</style>
