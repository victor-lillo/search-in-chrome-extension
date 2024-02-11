<details>
  <summary>How to add a custom search?</summary>
  <ul>
    <li><strong>ID:</strong> Specify the desired identifier for your entry.</li>
    <li>
      <strong>URL:</strong> Provide the URLs. Ensure they starts with <code>https://</code> and include
      <code>PLACEHOLDER</code>, which will be replaced with the selected text when utilized.
    </li>
  </ul>
</details>

<style>
  details {
    border-radius: var(--border-radius-1);
    border: 2px solid var(--color-dark-3);
    cursor: pointer;
    list-style-type: '▶️';
  }

  summary {
    background-color: var(--color-dark-3);
    padding: 0.5rem;
    font-size: 1.1rem;
  }

  details[open] {
    list-style-type: '🔽';
  }

  ul {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    gap: 0.5rem;
  }

  li {
    margin-left: 1rem;
  }
</style>
