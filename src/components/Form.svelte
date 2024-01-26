<script lang="ts">
  import Button from './Button.svelte'

  import { setStorage } from '../utils/storage'

  let searchId: string = ''
  let searchUrl: string = ''

  async function handleAdd() {
    console.log('Add')
    // const { updatedDomains, feedback } = processDomainsTextarea({ text: value, previousDomains: blockedDomains })
    // placeholder = feedback
    // blockedDomains = updatedDomains
    // value = ''

    // await setStorage({ blockedDomains: updatedDomains })
  }
</script>

<p>For adding your custom search</p>

<form on:submit|preventDefault={handleAdd}>
  <label> ID </label>
  <input type="text" bind:value={searchId} required />
  <label> Search url </label>
  <input
    type="url"
    placeholder="https://example.com/search?q=PLACEHOLDER"
    pattern="https://.*"
    bind:value={searchUrl}
    required
  />
  <div class="button-container">
    <Button variant={'primary'} type="submit">Save</Button>
  </div>
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
