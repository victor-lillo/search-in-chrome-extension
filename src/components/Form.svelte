<script lang="ts">
  import Button from './Button.svelte'
  import FormInstructions from './FormInstructions.svelte'

  import { getStorage, setStorage } from '../utils/storage'
  import { STORAGE_KEYS } from '../constants'
  import addContextMenu from '../utils/addContextMenu'

  let searchId: string = ''
  let searchUrl: string = ''

  async function handleAdd() {
    const storage = await getStorage(STORAGE_KEYS.searchLinks)
    const searchLink = {
      id: searchId,
      url: searchUrl,
    }

    addContextMenu([searchLink])
    await setStorage({
      [STORAGE_KEYS.searchLinks]: [...storage, searchLink],
    })
  }

  async function log() {
    const storage = await getStorage('searchUrls')
    console.log(storage)
  }
</script>

<p>For adding your custom search</p>

<FormInstructions />

<form on:submit|preventDefault={handleAdd}>
  <label for="id"> ID </label>
  <input id="id" type="text" bind:value={searchId} pattern=".*\S.*" placeholder="👉🏽 Your ID" required />
  <label for="url"> Search url </label>
  <input
    bind:value={searchUrl}
    id="url"
    type="url"
    placeholder="https://example.com/search?q=PLACEHOLDER"
    pattern="https://.*PLACEHOLDER.*"
    required
  />
  <div class="button-container">
    <Button variant={'primary'} type="submit">Save</Button>
  </div>
</form>
<button type="button" on:click={log}>Log</button>

<style>
  form {
    display: grid;
    grid-template-columns: min-content 1fr;
    column-gap: 0.5rem;
    row-gap: 1rem;
  }

  label {
    font-size: 1.3rem;
    font-weight: var(--font-weight-bold);
    grid-column: 1;
    min-width: 0;
    white-space: nowrap;
  }

  .button-container {
    grid-column: 1 / 3;
    display: flex;
    justify-content: center;
  }

  input {
    grid-column: 2;
    outline: 2px solid transparent;
    border-radius: var(--border-radius-1);
    padding-left: 0.5rem;
    border: none;
  }

  input:is(:focus-visible, :valid, :valid:focus-visible) {
    outline-color: green;
  }

  input:not(:placeholder-shown):is(:invalid, :invalid:focus-visible) {
    outline-color: red;
  }
</style>
