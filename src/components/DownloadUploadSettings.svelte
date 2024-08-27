<script lang="ts">
  import { getStorage } from '../utils/storage';
  import { STORAGE_KEYS } from '../constants';

  import Upload from './icons/Upload.svelte';
  import Download from './icons/Download.svelte';

  async function handleDownload() {
    const settingsJson = await getStorage(STORAGE_KEYS.searchLinks);

    const data = JSON.stringify(settingsJson);

    const blob = new Blob([data], { type: 'application/json' });
    const jsonObjectUrl = URL.createObjectURL(blob);

    const filename = 'search-in-settings.json';
    const anchorEl = document.createElement('a');
    anchorEl.href = jsonObjectUrl;
    anchorEl.download = filename;

    anchorEl.click();

    URL.revokeObjectURL(jsonObjectUrl);
  }
</script>

<div>
  <button on:click={handleDownload} type="button"> Download settings <Download /> </button>
  <button type="button"> Upload settings <Upload /> </button>
</div>

<style>
  div {
    display: flex;
    gap: 1rem;
  }

  button {
    display: flex;
    gap: 0.6rem;
    align-items: center;
  }
</style>
