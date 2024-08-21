<script lang="ts">
  import { searchLinks } from '../store';
  import { setStorage } from '../utils/storage';
  import { STORAGE_KEYS } from '../constants';
  import type { SearchLink } from '../types';

  import SearchLinkForm from './SearchLinkForm.svelte';

  export let searchId: string = '';
  const initialSearchId = searchId;
  export let searchUrl: string = '';
  let isInvalidInput: boolean = false;

  let savedSearchLinks: SearchLink[];

  searchLinks.subscribe((value) => {
    savedSearchLinks = value;
  });

  function handleInput() {
    const isSaved = savedSearchLinks.find(({ id }) => id === searchId && id !== initialSearchId);
    if (isSaved) isInvalidInput = true;
    else isInvalidInput = false;
  }

  async function handleAdd() {
    const searchLink = {
      id: searchId,
      url: searchUrl,
    };

    const editIndex = savedSearchLinks.findIndex(({ id }) => id === initialSearchId);

    const copy = savedSearchLinks;
    copy[editIndex] = searchLink;

    searchLinks.set(copy);
    await setStorage({
      [STORAGE_KEYS.searchLinks]: copy,
    });
  }
</script>

<SearchLinkForm
  bind:searchId={searchId}
  bind:searchUrl={searchUrl}
  handleAdd={handleAdd}
  handleInput={handleInput}
  isInvalidInput={isInvalidInput}
/>

<style>
</style>
