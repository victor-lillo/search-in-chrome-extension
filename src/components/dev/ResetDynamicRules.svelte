<script lang="ts">
  import Button from '../Button.svelte'
  import { resetBlockRules } from '../../utils/rules'

  const handleClick = async () => {
    await resetBlockRules()
  }
</script>

<Button {handleClick} variant={'dev-red'}>Reset Rules</Button>
