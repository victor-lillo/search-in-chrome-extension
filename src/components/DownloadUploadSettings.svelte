<script lang="ts">
  import { alertAllItemsAdded } from '@/utils/alerts';
  import { getStorage, setStorage } from '@/utils/storage';
  import { searchLinks } from '@/store';
  import { STORAGE_KEYS } from '@/constants';
  import { validateSearchLinks, type JSONError } from '@/utils/validateSearchLinks';
  import Button from '@/components/Button.svelte';
  import Download from '@/components/icons/Download.svelte';
  import Upload from '@/components/icons/Upload.svelte';

  let errorName: JSONError | null = null;

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
          errorName = result;
          return;
        } else if (typeof result === 'object') {
          errorName = null;
          searchLinks.set(result);
          await setStorage({
            [STORAGE_KEYS.searchLinks]: result,
          });
          alertAllItemsAdded(result);
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

<h1>Download or upload saved settings</h1>
<div>
  <Button variant="outlined-green" handleClick={handleDownload} type="button">
    Download settings <Download size={24} />
  </Button>
  <label>
    <input on:change={handleUpload} type="file" accept=".json" />
    Upload settings <Upload size={24} />
  </label>
  {#if errorName}
    <p class="error">
      {#if errorName === 'DuplicatedIdError'}
        {errorName}: Invalid JSON schema in the uploaded file. Try again.
      {/if}
      {#if errorName === 'JSONSchemaError'}
        {errorName}: Duplicated ids in the uploaded file. Try again.
      {/if}
    </p>
  {/if}
</div>

<style>
  div {
    display: flex;
    justify-content: center;
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
    border: 2px solid var(--color-green);
    background-color: transparent;
    border-radius: var(--border-radius-1);
  }

  @media (hover: hover) {
    label:hover {
      background-color: #009e2048;
    }
  }

  .error {
    color: red;
  }
</style>
