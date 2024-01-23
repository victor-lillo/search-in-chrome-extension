<script lang="ts">
  import Button from '../Button.svelte'
  import { getRules } from '../../utils/rules'

  const handleClick = async () => {
    const rules = await getRules()
    if (rules.length > 0) {
      rules.forEach((rule) => {
        console.log(rule)
      })
    } else {
      console.log({ rules })
    }
  }
</script>

<Button {handleClick} variant={'dev-green'}>Log Rules</Button>
