<script lang="ts">
  import Saved from '../components/Saved.svelte';
  import AddSearchLink from '../components/AddSearchLink.svelte';
  import Presets from '../components/Presets.svelte';
</script>

<section>
  <Saved />
</section>
<section>
  <h1>Add new query</h1>
  <AddSearchLink />
</section>
<section>
  <Presets />
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-height: 80%;
    padding-block: 2rem;
    width: 100%;
    margin: auto;
  }

  :global(h1) {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    border-bottom: 2px solid grey;
  }
</style>
