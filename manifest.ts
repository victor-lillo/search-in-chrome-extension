import { version } from './package.json'

const manifest = {
  name: 'Search in...',
  description: 'Chrome Extension Svelte Template: it does things.',
  version: version,
  manifest_version: 3,
  icons: {
    '16': 'src/assets/logo-16.png',
    '32': 'src/assets/logo-32.png',
    '48': 'src/assets/logo-48.png',
    '128': 'src/assets/logo-128.png',
  },
  action: {
    default_popup: 'src/popup/popup.html',
    default_icon: {
      '16': 'src/assets/logo-16.png',
      '32': 'src/assets/logo-32.png',
      '48': 'src/assets/logo-48.png',
      '128': 'src/assets/logo-128.png',
    },
  },
  background: {
    service_worker: 'src/background/index.ts',
  },
  content_scripts: [
    {
      matches: ['<all_urls>'],
      js: ['src/content/index.ts'],
    },
  ],
  options_ui: {
    page: 'src/options/options.html',
    open_in_tab: true,
  },
  permissions: ['storage', 'contextMenus'],
  host_permissions: ['<all_urls>'],
}

export default manifest
