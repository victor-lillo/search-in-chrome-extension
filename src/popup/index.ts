import '@/styles/app.css'
import Popup from './Popup.svelte'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const target = document.getElementById('app')!

async function render() {
  new Popup({ target, props: {} })
}

document.addEventListener('DOMContentLoaded', render)
