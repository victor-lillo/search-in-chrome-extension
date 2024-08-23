<script lang="ts">
  import { searchLinks } from '../store';
  import { setStorage } from '../utils/storage';
  import { STORAGE_KEYS } from '../constants';
  import type { SearchLink } from '../types';

  import Button from './Button.svelte';
  import SearchLinkForm from './SearchLinkForm.svelte';

  export let isEditing: boolean;
  export let searchId = '';
  export let searchUrl = '';
  let isInvalidInput = false;
  let savedSearchLinks: SearchLink[];
  const initialSearchId = searchId;

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
    isEditing = false;
  }
</script>

<SearchLinkForm
  bind:searchId={searchId}
  bind:searchUrl={searchUrl}
  handleAdd={handleAdd}
  handleInput={handleInput}
  isInvalidInput={isInvalidInput}
>
  <Button variant="outlined-red" slot="cancel-button" type="button" handleClick={() => (isEditing = false)}>
    Cancel
  </Button>
</SearchLinkForm>

<style>
</style>
