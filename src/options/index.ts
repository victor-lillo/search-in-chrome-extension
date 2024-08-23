import '../styles/app.css'
import Options from './Options.svelte'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const target = document.getElementById('full-page-app')!

async function render() {
  new Options({ target, props: {} })
}

document.addEventListener('DOMContentLoaded', render)
