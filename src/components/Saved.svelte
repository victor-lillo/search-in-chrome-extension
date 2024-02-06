<script lang="ts">
  import { getStorage, setStorage } from '../utils/storage'
  import { STORAGE_KEYS } from '../constants'
  import Button from './Button.svelte'

  let filter: string = ''
  let searchUrls: { id: string; url: string }[] = []
  let selectedIds: string[] = []

  function reactToStorage() {
    chrome.storage.onChanged.addListener(async (changes) => {
      for (const [key, { newValue }] of Object.entries(changes)) {
        if (key === STORAGE_KEYS.searchLinks) {
          searchUrls = newValue
        }
      }
    })
  }

  reactToStorage()

  async function getSavedUrls() {
    const preset = await getStorage(STORAGE_KEYS.searchLinks)
    searchUrls = preset
  }

  getSavedUrls()

  async function handleRemove() {
    selectedIds.forEach((element) => {
      chrome.contextMenus.remove(element)
    })
    const newSearchUrls = searchUrls.filter(({ id }) => !selectedIds.includes(id))
    searchUrls = newSearchUrls
    await setStorage({ [STORAGE_KEYS.searchLinks]: newSearchUrls })
  }
</script>

<div>
  <label for="id"> Filter </label>
  <input id="id" type="text" bind:value={filter} required />
</div>
<form on:submit|preventDefault={handleRemove}>
  {#if searchUrls.length > 0}
    {@const filteredUrls = searchUrls.filter(({ id, url }) => id.includes(filter) || url.includes(filter))}

    {#each filteredUrls as { id, url }}
      <div class="fieldset-row">
        <input bind:group={selectedIds} id={id} name="id" type="checkbox" value={id} />
        <label for={id}>
          {id}
          <code>
            {url}
          </code>
        </label>
      </div>
    {/each}
    {#if filteredUrls.length === 0}
      <p>No results...</p>
    {/if}
  {/if}
  <Button variant="alert" type="submit">Delete</Button>
</form>
<p>{selectedIds.toString()}</p>

<style>
  div {
    display: flex;
    gap: 0.5rem;
  }

  form {
    display: grid;
    gap: 1rem;
  }

  label {
    font-size: 1rem;
    white-space: nowrap;
  }

  input {
    outline: 2px solid transparent;
    border-radius: var(--border-radius-1);
    padding-left: 0.5rem;
    border: none;
  }

  .fieldset-row {
    display: flex;
    gap: 1rem;
  }

  input:focus-visible {
    outline-color: green;
  }
</style>
