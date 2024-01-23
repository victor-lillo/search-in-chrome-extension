<script lang="ts">
  import Button from '../Button.svelte'
  import { getWholeStorage } from '../../utils/storage'

  const handleClick = async () => {
    const storage = await getWholeStorage()
    console.log(storage)
  }
</script>

<Button {handleClick} variant={'dev-green'}>Log Storage</Button>
