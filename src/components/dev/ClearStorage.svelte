<script lang="ts">
  import Button from '@/components/Button.svelte';
  import { clearStorage } from '@/utils/storage';

  const handleClick = async () => {
    if (window.confirm('Do you really want to delete?')) {
      const storage = await clearStorage();
      console.log(storage);
    }
  };
</script>

<Button handleClick={handleClick} variant={'dev-red'}>Clear Storage</Button>
