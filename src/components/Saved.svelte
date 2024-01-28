<script lang="ts">
  import { getStorage, setStorage } from '../utils/storage'
  import { DEFAULT, type SearchLink } from '../utils/presets'
  import { STORAGE_KEYS } from '../constants'

  let search: string = ''
  let selectedIds: string = ''

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
</script>

<div>
  <label for="id"> Filter </label>
  <input id="id" type="text" bind:value={search} required />
</div>
<form on:submit|preventDefault={handleAdd}>
  {#await searchUrls then value}
    {#each value as { id, url }}
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
  {/await}
</form>
<p>{selectedIds.toString()}</p>

<style>
  form {
    display: grid;
    gap: 1rem;
  }

  label {
    font-size: 1rem;
    white-space: nowrap;
  }

  .fieldset-row {
    display: flex;
    gap: 1rem;
  }

  input:focus-visible {
    outline-color: green;
  }
</style>
