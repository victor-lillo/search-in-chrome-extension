<script lang="ts">
  import Button from './Button.svelte';

  export let searchUrl: string = '';
  export let searchId: string = '';
  export let isInvalidInput: boolean = false;
  export let handleInput;
  export let handleAdd;
</script>

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
  <slot name="cancel-button"></slot>

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

  input:not(:placeholder-shown):valid {
    outline-color: var(--color-green);
  }

  input:not(:placeholder-shown):is(:invalid, .invalid) {
    outline-color: var(--color-red);
  }

  input:focus:invalid {
    outline-color: var(--color-yellow);
  }
</style>
