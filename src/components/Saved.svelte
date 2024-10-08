<script lang="ts">
  import { flip } from 'svelte/animate';
  import { searchLinks } from '@/store';
  import { setStorage } from '@/utils/storage';
  import { STORAGE_KEYS } from '@/constants';
  import type { SearchLink } from '@/types';
  import Button from '@/components/Button.svelte';
  import EditSearchLink from '@/components/EditSearchLink.svelte';

  let editSearchLink: SearchLink | null = null;
  let filter = '';
  let hoveredIndex: number | null = null;
  let isEditing = false;
  let savedSearchLinks: SearchLink[] = [];
  let selectedIds: string[] = [];

  searchLinks.subscribe((value) => {
    savedSearchLinks = value;
    // If edited, the length is the same
    if (savedSearchLinks.length === value.length) {
      // We need to reset the selectedIds when editing, cause Svelte doesn't do it, so the old value would be still in this array
      selectedIds = [];
    }
  });

  async function handleRemove() {
    const newSearchUrls = savedSearchLinks.filter(({ id }) => !selectedIds.includes(id));
    searchLinks.set(newSearchUrls);
    selectedIds = [];

    await setStorage({ [STORAGE_KEYS.searchLinks]: newSearchUrls });
  }

  function handleDragStart(event: DragEvent, itemIndex: number) {
    const currentTarget = event.currentTarget as HTMLElement;
    // The data we want to make available when the element is dropped
    // is the index of the item being dragged and
    // the index of the basket from which it is leaving.
    const data = { itemIndex };
    if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer?.setData('text/plain', JSON.stringify(data));
    currentTarget.style.opacity = '0.3';
  }

  async function handleDrop(event: DragEvent, finalItemIndex: number) {
    event.preventDefault();
    if (!event.dataTransfer) return;

    const json = event.dataTransfer.getData('text/plain');
    const data = JSON.parse(json);
    const movedItemIndex = data.itemIndex;

    const copy = savedSearchLinks;
    // Splice returns an array of the deleted elements, just one in this case.
    const [movedItem] = copy.splice(movedItemIndex, 1);

    copy.splice(finalItemIndex, 0, movedItem);

    searchLinks.set(copy);

    hoveredIndex = null;
    await setStorage({ [STORAGE_KEYS.searchLinks]: savedSearchLinks });
  }

  function handleDragOver(event: DragEvent) {
    event.preventDefault();
  }

  function handleDragEnd(event: DragEvent) {
    const currentTarget = event.currentTarget as HTMLElement;
    currentTarget.style.opacity = '1';
  }

  function handleDragLeave(event: DragEvent) {
    // dragleave event fires on children
    const currentTarget = event.currentTarget as HTMLElement;
    const relatedTarget = event.relatedTarget as HTMLElement;

    if (currentTarget.contains(relatedTarget)) return;

    hoveredIndex = null;
  }

  function handleDragEnter(event: DragEvent, itemIndex: number) {
    hoveredIndex = itemIndex;
  }

  function handleEdit(selectedIds: string[]) {
    const searchLinkToEdit = savedSearchLinks.find(({ id }) => selectedIds.includes(id));
    if (searchLinkToEdit) editSearchLink = searchLinkToEdit;

    isEditing = true;
  }
</script>

<h1>Your saved queries</h1>
<div class="filter-container">
  <label class="filter-label" for="id"> Filter </label>
  <input class="filter-input" id="id" type="text" bind:value={filter} required />
</div>
<form class="form-container" on:submit|preventDefault={handleRemove}>
  {#if savedSearchLinks.length > 0}
    {@const filteredUrls = savedSearchLinks.filter(({ id, url }) => id.includes(filter) || url.includes(filter))}
    <ul class="list-container">
      {#each filteredUrls as item, itemIndex (item)}
        <li
          class="fieldset-row"
          class:fieldset-row--over={itemIndex === hoveredIndex}
          draggable="true"
          animate:flip={{ duration: 500 }}
          on:dragstart={(event) => handleDragStart(event, itemIndex)}
          on:dragenter={(event) => handleDragEnter(event, itemIndex)}
          on:dragleave={(event) => handleDragLeave(event)}
          on:dragover={(event) => handleDragOver(event)}
          on:dragend={(event) => handleDragEnd(event)}
          on:drop={(event) => handleDrop(event, itemIndex)}
        >
          <input bind:group={selectedIds} id={item.id} name="id" type="checkbox" value={item.id} />
          <label for={item.id}>
            {item.id}
            <code>
              {item.url}
            </code>
          </label>
        </li>
      {/each}
    </ul>
    {#if filteredUrls.length === 0}
      <p>No results...</p>
    {/if}
  {/if}

  {#if selectedIds.length > 0}
    <div class="buttons-container">
      <Button variant="outlined-red" type="submit">Delete selected</Button>
      {#if selectedIds.length === 1}
        <Button variant="outlined-green" handleClick={() => handleEdit(selectedIds)} type="button">Edit selected</Button
        >
      {/if}
    </div>
  {/if}

  {#if isEditing && editSearchLink && selectedIds.length === 1}
    <h1>Edit</h1>
    <EditSearchLink bind:isEditing={isEditing} searchId={editSearchLink.id} searchUrl={editSearchLink.url} />
  {/if}
</form>

<style>
  .filter-container {
    display: flex;
    gap: 1rem;
  }

  .filter-label {
    font-size: 1.3rem;
  }

  .form-container,
  .list-container {
    display: grid;
    gap: 1rem;
  }

  .filter-input {
    border-radius: var(--border-radius-1);
    padding-left: 0.5rem;
    border: none;
    width: 40ch;
  }

  .fieldset-row {
    display: flex;
    align-items: center;
    cursor: move;
    border: 2px solid var(--color-dark-5);
    border-radius: var(--border-radius-1);
    background-color: var(--color-dark-2);
    padding: 0.5rem 1rem;
  }

  .fieldset-row--over {
    border-color: var(--color-green);
  }

  .fieldset-row input {
    margin: 0;
  }

  .fieldset-row label {
    display: flex;
    align-items: center;
    font-size: 1rem;
    white-space: nowrap;
    max-width: calc(60vw);
    contain: paint;
    padding-left: 0.7rem;
  }

  .fieldset-row :is(input, label) {
    cursor: pointer;
  }

  .fieldset-row label code {
    margin-left: 0.6rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  input:focus-visible {
    outline-color: var(--color-green);
  }

  .buttons-container {
    display: flex;
    gap: 0.5rem;
  }
</style>
