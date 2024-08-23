<script lang="ts">
  import Logo from './icons/Logo.svelte';
</script>

<header>
  <h1>Search in...</h1>
  <Logo size="56" />
</header>

<style>
  header {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid var(--color-light-4);
    padding-block: 0.5rem;
  }
</style>
