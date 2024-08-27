<script lang="ts">
  import { searchLinks } from '../store';
  import { getStorage, setStorage } from '../utils/storage';
  import { STORAGE_KEYS } from '../constants';
  import type { SearchLink } from '../types';
  import Upload from './icons/Upload.svelte';
  import Download from './icons/Download.svelte';
  import Button from './Button.svelte';

  let savedSearchLinks: SearchLink[];

  searchLinks.subscribe((value) => {
    savedSearchLinks = value;
  });

  async function handleUpload(event: Event) {
    const target = event.target as unknown as { files: File[] };
    const file: File = target?.files[0];

    console.log(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) {
        const fileContent = e.target.result;
        console.log(fileContent);

        // searchLinks.set(searchLink);

        // await setStorage({
        //   [STORAGE_KEYS.searchLinks]: savedSearchLinks,
        // });
      }
    };

    reader.readAsText(file);
  }

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
  <Button variant="outlined-white" handleClick={handleDownload} type="button">
    Download settings <Download size={24} />
  </Button>
  <label>
    <input on:change={handleUpload} type="file" accept=".json" />
    Upload settings <Upload size={24} />
  </label>
</div>

<style>
  div {
    display: flex;
    gap: 1rem;
  }

  input {
    display: none;
  }

  label {
    display: flex;
    font-size: 1rem;
    font-weight: 500;
    gap: 0.7rem;
    padding: 0.5rem 1.4rem;
    align-items: center;
    border: 2px solid white;
    background-color: transparent;
    border-radius: var(--border-radius-1);
  }
</style>
