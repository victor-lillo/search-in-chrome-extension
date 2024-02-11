import '../styles/app.css'
import Options from './Options.svelte'

const target = document.getElementById('full-page-app')!

async function render() {
  new Options({ target, props: {} })
}

document.addEventListener('DOMContentLoaded', render)
