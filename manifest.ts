import { version } from './package.json'

const manifest = {
  name: 'Search in...',
  description:
    "Quickly search selected text on Google, Reddit, GitHub, or any custom site directly from browser's context menu.",
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
  options_ui: {
    page: 'src/options/options.html',
    open_in_tab: true,
  },
  permissions: ['storage', 'contextMenus'],
}

export default manifest
