import '../styles/app.css'
import Popup from './Popup.svelte'

const target = document.getElementById('app')!

async function render() {
  new Popup({ target, props: {} })
}

document.addEventListener('DOMContentLoaded', render)
