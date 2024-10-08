<script lang="ts">
  import type { MouseEventHandler } from 'svelte/elements';

  type Variants =
    | 'dev-green'
    | 'dev-red'
    | 'outlined-green'
    | 'outlined-red'
    | 'outlined-white'
    | 'primary'
    | 'secondary';

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
  <slot></slot>
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
    gap: 0.7rem;
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

  .outlined-green {
    --background-color: transparent;
    --border-color: var(--color-green);
  }

  .outlined-green:hover {
    --background-color: #009e2048;
  }

  .outlined-white {
    --background-color: transparent;
    --border-color: var(--color-light-1);
  }

  .outlined-white:hover {
    --background-color: #f3f3f314;
  }

  .outlined-red {
    --background-color: transparent;
    --border-color: var(--color-red);
  }

  .outlined-red:hover {
    --background-color: #f4433614;
  }
</style>
