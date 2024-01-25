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

<form on:submit|preventDefault={handleAdd}>
  Add your custom search
  <label>
    ID
    <input type="text" bind:value={searchId} />
  </label>
  <label>
    Search url
    <input type="url" placeholder="https://example.com" pattern="https://.*" bind:value={searchUrl} />
  </label>
  <div class="button-container">
    <Button variant={'primary'} type="submit">Save</Button>
  </div>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    font-size: 1rem;
    gap: 0.5rem;
    align-items: center;
  }

  label {
    align-self: flex-start;
    font-size: 1.4rem;
    font-weight: var(--font-weight-bold);
  }

  .button-container {
    display: flex;
    width: 100%;
    flex-direction: row;
    gap: 1rem;
    justify-content: center;
  }
  input:invalid {
    border: 1px solid red;
  }

  textarea:focus {
    border-color: var(--color-accent-grey);
  }
</style>
