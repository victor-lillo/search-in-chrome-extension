<script lang="ts">
  import { getStorage, setStorage } from '../utils/storage'
  import { DEFAULT, type SearchLink } from '../utils/presets'
  import { STORAGE_KEYS } from '../constants'

  let searchId: string = ''

  async function getSavedUrls() {
    const preset = await getStorage(STORAGE_KEYS.searchLinks)
    console.log(preset)
    return preset
  }

  const searchUrls = getSavedUrls()

  async function handleAdd() {
    console.log('Add')
    // const { updatedDomains, feedback } = processDomainsTextarea({ text: value, previousDomains: blockedDomains })
    // placeholder = feedback
    // blockedDomains = updatedDomains
    // value = ''

    // await setStorage({ blockedDomains: updatedDomains })
  }

  async function log() {
    const storage = await getStorage('searchUrls')
    console.log(storage)
  }
</script>

<p>For adding your custom search</p>

<form on:submit|preventDefault={handleAdd}>
  <label for="id"> ID </label>
  <input id="id" type="text" bind:value={searchId} required />
  {#await searchUrls then value}
    {#each value as { id, url }}
      <div>
        <label for={id}>
          {id} : {url}
        </label>
        <input id={id} name="id" type="checkbox" value={id} />
      </div>
    {/each}
  {/await}
</form>

<style>
  form {
    display: grid;
    grid-template-columns: min-content 1fr;
    border: 1px solid red;
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
    outline: 2px solid red;
    grid-column: 2;
  }

  input:valid,
  input:valid:focus-visible {
    outline-color: green;
  }

  input:invalid,
  input:invalid:focus-visible {
    outline-color: red;
  }
</style>
