import '../styles/app.css'
import { extensionName } from './../utils/extensionData'
import Options from './Options.svelte'

const target = document.getElementById('full-page-app')

async function render() {
  const prop = extensionName

  new Options({ target, props: { prop } })
}

document.addEventListener('DOMContentLoaded', render)
