<script lang="ts">
  import ClearStorage from './ClearStorage.svelte'
  import GetDynamicRules from './GetDynamicRules.svelte'
  import GetWholeStorage from './GetWholeStorage.svelte'
  import ResetDynamicRules from './ResetDynamicRules.svelte'
</script>

{#if import.meta.env.DEV}
  <div>
    <GetWholeStorage />
    <GetDynamicRules />
    <ClearStorage />
    <ResetDynamicRules />
  </div>
{/if}

<style>
  div {
    display: flex;
    gap: 0.2rem;
  }
</style>
