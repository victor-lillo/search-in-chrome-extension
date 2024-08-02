<script lang="ts">
  import { flip } from 'svelte/animate';
  import { getStorage, setStorage } from '../utils/storage';
  import { STORAGE_KEYS } from '../constants';
  import Button from './Button.svelte';
  import Drag from './icons/Drag.svelte';

  let filter: string = '';
  let searchUrls: { id: string; url: string }[] = [];
  let selectedIds: string[] = [];
  let hoveredIndex: number | null = null;

  function reactToStorage() {
    chrome.storage.onChanged.addListener(async (changes) => {
      for (const [key, { newValue }] of Object.entries(changes)) {
        if (key === STORAGE_KEYS.searchLinks) {
          searchUrls = newValue;
        }
      }
    });
  }

  reactToStorage();

  async function getSavedUrls() {
    const preset = await getStorage(STORAGE_KEYS.searchLinks);
    searchUrls = preset;
  }

  getSavedUrls();

  async function handleRemove() {
    selectedIds.forEach((element) => {
      chrome.contextMenus.remove(element);
    });
    const newSearchUrls = searchUrls.filter(({ id }) => !selectedIds.includes(id));
    searchUrls = newSearchUrls;
    await setStorage({ [STORAGE_KEYS.searchLinks]: newSearchUrls });
  }

  function handleDragStart(event: DragEvent, itemIndex: number) {
    const currentTarget = event.currentTarget as HTMLElement;
    // The data we want to make available when the element is dropped
    // is the index of the item being dragged and
    // the index of the basket from which it is leaving.
    const data = { itemIndex };
    event.dataTransfer!.effectAllowed = 'move';
    event.dataTransfer?.setData('text/plain', JSON.stringify(data));
    currentTarget.style.opacity = '0.4';
  }

  async function handleDrop(event: DragEvent, finalItemIndex: number) {
    event.preventDefault();
    const json = event.dataTransfer!.getData('text/plain');
    const data = JSON.parse(json);
    const movedItemIndex = data.itemIndex;

    // Splice returns an array of the deleted elements, just one in this case.
    const [movedItem] = searchUrls.splice(movedItemIndex, 1);

    searchUrls.splice(finalItemIndex, 0, movedItem);
    searchUrls = searchUrls;
    hoveredIndex = null;
    await setStorage({ [STORAGE_KEYS.searchLinks]: searchUrls });
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
</script>

<div class="filter-container">
  <label class="filter-label" for="id"> Filter </label>
  <input id="id" type="text" bind:value={filter} required />
</div>
<form on:submit|preventDefault={handleRemove}>
  {#if searchUrls.length > 0}
    {@const filteredUrls = searchUrls.filter(({ id, url }) => id.includes(filter) || url.includes(filter))}
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
          <Drag size={20} />
        </li>
      {/each}
    </ul>
    {#if filteredUrls.length === 0}
      <p>No results...</p>
    {/if}
  {/if}
  <Button variant="outlined-red" type="submit">DELETE</Button>
</form>
<p>{selectedIds.toString()}</p>

<style>
  .filter-container {
    display: flex;
    gap: 0.5rem;
  }

  .filter-label {
    font-size: 1.3rem;
  }

  .list-container {
    display: grid;
    gap: 1rem;
  }

  input {
    outline: 2px solid transparent;
    border-radius: var(--border-radius-1);
    padding-left: 0.5rem;
    border: none;
  }

  .fieldset-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: grab;
    border: 1px solid transparent;
  }

  .fieldset-row--over {
    border-color: green;
  }

  .fieldset-row label {
    font-size: 1rem;
    white-space: nowrap;
  }

  .fieldset-row input {
    cursor: pointer;
  }

  .fieldset-row label code {
    margin-left: 0.5rem;
  }

  .fieldset-row :global(svg) {
    display: flex;
    flex-shrink: 0;
  }

  input:focus-visible {
    outline-color: green;
  }
</style>
