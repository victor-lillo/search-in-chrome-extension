<script lang="ts">
  import { getStorage, setStorage } from '../utils/storage';
  import { searchLinks } from '../store';
  import { STORAGE_KEYS } from '../constants';
  import { validateSearchLinks, type JSONError } from '../utils/validateSearchLinks';
  import type { SearchLink } from '../types';
  import Button from './Button.svelte';
  import Download from './icons/Download.svelte';
  import Upload from './icons/Upload.svelte';

  let savedSearchLinks: SearchLink[];
  let errorName: JSONError | null = null;

  searchLinks.subscribe((value) => {
    savedSearchLinks = value;
  });

  async function handleUpload(event: Event) {
    const target = event.target as unknown as { files: File[] };
    const file: File = target?.files[0];

    const reader = new FileReader();

    reader.onload = async (e) => {
      if (e.target) {
        const fileContent = e.target.result as null | string;
        if (!fileContent) return;

        const result = validateSearchLinks(fileContent);

        if (typeof result === 'string') {
          console.log('Invalid JSON', result);
          errorName = result;
          return;
        } else if (typeof result === 'object') {
          console.log('Valid JSON');

          searchLinks.set(result);
          await setStorage({
            [STORAGE_KEYS.searchLinks]: result,
          });
        }
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
  {#if errorName === 'DuplicatedIdError'}
    <p>{errorName}: Invalid JSON schema in the uploaded file. Try again.</p>
  {/if}
  {#if errorName === 'JSONSchemaError'}
    <p>{errorName}: Duplicated ids in the uploaded file. Try again.</p>
  {/if}
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
