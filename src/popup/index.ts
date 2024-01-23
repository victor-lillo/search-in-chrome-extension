import '../styles/app.css'
import { extensionName } from './../utils/extensionData'
import Popup from './Popup.svelte'

const target = document.getElementById('app')

async function render() {
  const prop = extensionName
  new Popup({ target, props: { prop } })
}

document.addEventListener('DOMContentLoaded', render)
