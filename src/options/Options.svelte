<script lang="ts">
  import Saved from '../components/Saved.svelte';
  import Form from '../components/Form.svelte';
</script>

<section>
  <h1>Settings</h1>
  <Saved />
  <Form />
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-height: 80%;
    min-width: var(--width-full-page);
    padding-block: 2rem;
    width: fit-content;
    margin: auto;
  }

  h1 {
    font-size: 2.5rem;
  }
</style>
