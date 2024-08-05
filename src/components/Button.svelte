<script lang="ts">
  import type { MouseEventHandler } from 'svelte/elements';

  type Variants = 'dev-red' | 'dev-green' | 'primary' | 'secondary' | 'outlined-red' | 'outlined-white';
  export let ariaLabel: string | undefined = undefined;
  export let disabled = false;
  export let handleClick: MouseEventHandler<HTMLButtonElement> | undefined = undefined;
  export let type: 'button' | 'submit' | 'reset' = 'submit';
  export let variant: Variants | undefined = undefined;
  export let width: 'fit-content' | 'full' = 'fit-content';
</script>

<button
  aria-label={ariaLabel}
  on:click={handleClick}
  class={variant}
  class:full={width === 'full'}
  disabled={disabled}
  type={type}
>
  <!-- eslint-disable-next-line svelte/html-self-closing -->
  <slot />
</button>

<style>
  button {
    --border-color: transparent;
    --width: fit-content;

    font-size: 1rem;
    font-weight: 500;
    color: var(--color-light-1);
    background-color: var(--background-color);
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius-1);
    padding: 0.5rem 1.4rem;
    width: var(--width);
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    gap: 0.3rem;
  }

  button:is(:hover):not(:disabled) {
    filter: brightness(1.2);
  }

  button:disabled {
    opacity: 0.5;
  }

  .full {
    --width: 100%;
  }

  .dev-red {
    --background-color: var(--color-red);
    --border-color: var(--color-yellow);
  }

  .dev-green {
    --background-color: var(--color-green);
    --border-color: var(--color-yellow);
  }

  .primary {
    --background-color: var(--color-green);
  }

  .secondary {
    --background-color: #9328cc;
  }

  .outlined-white {
    --background-color: transparent;
    --border-color: var(--color-light-1);

    color: var(--color-light-1);
  }

  .outlined-white:hover {
    --background-color: rgba(243, 243, 243, 0.08);
  }

  .outlined-red {
    --background-color: transparent;
    --border-color: var(--color-red);

    color: var(--color-red);
  }

  .outlined-red:hover {
    --background-color: rgba(244, 67, 54, 0.08);
  }
</style>
