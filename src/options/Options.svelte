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
    padding-block: 2rem;
    width: 100%;
    margin: auto;
  }

  h1 {
    font-size: 2.5rem;
  }
</style>
