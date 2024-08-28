<script lang="ts">
  import Button from '@/components/Button.svelte';
  import { getWholeStorage } from '@/utils/storage';

  const handleClick = async () => {
    const storage = await getWholeStorage();
    console.log(storage);
  };
</script>

<Button handleClick={handleClick} variant={'dev-green'}>Log Storage</Button>
