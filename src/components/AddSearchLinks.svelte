<script lang="ts">
  import { searchLinks } from '../store';
  import { setStorage } from '../utils/storage';
  import { STORAGE_KEYS } from '../constants';
  import type { SearchLink } from '../types';
  import Button from './Button.svelte';
  import FormInstructions from './FormInstructions.svelte';

  let searchId: string = '';
  let searchUrl: string = '';
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

<FormInstructions />

<form on:submit|preventDefault={handleAdd}>
  <label for="id"> ID </label>
  <input
    id="id"
    class:invalid={isInvalidInput}
    type="text"
    bind:value={searchId}
    on:input={handleInput}
    pattern=".*\S.*"
    placeholder="👉🏽 Your ID"
    required
  />
  <label for="url"> Search url </label>
  <input
    bind:value={searchUrl}
    id="url"
    type="url"
    placeholder="https://example.com/search?q=PLACEHOLDER"
    pattern="https://.*PLACEHOLDER.*"
    required
  />

  <Button variant="primary" type="submit" disabled={isInvalidInput}>Save</Button>
  {#if isInvalidInput}
    <p><strong>{searchId}</strong> is already in use. Choose a different one.</p>
  {/if}
</form>

<style>
  form {
    display: grid;
    grid-template-columns: min-content 1fr;
    column-gap: 0.5rem;
    align-items: center;
    row-gap: 1rem;
  }

  label {
    font-size: 1.3rem;
    font-weight: var(--font-weight-bold);
    grid-column: 1;
    min-width: 0;
    white-space: nowrap;
  }

  input {
    grid-column: 2;
    outline: 2px solid transparent;
    border-radius: var(--border-radius-1);
    padding-left: 0.5rem;
    align-self: stretch;
    border: none;
  }

  input:is(:focus-visible, :valid, :valid:focus-visible) {
    outline-color: var(--color-green);
  }

  input:not(:placeholder-shown):is(:invalid, :invalid:focus-visible, .invalid) {
    outline-color: var(--color-red);
  }
</style>
