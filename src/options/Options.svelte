<script lang="ts">
  export let prop: string
</script>

<section>
  <h1>Options {prop}</h1>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-height: 80%;
    min-width: var(--width-full-page);
  }
</style>
