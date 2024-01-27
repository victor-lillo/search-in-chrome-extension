import { SEARCH_PLACEHOLDER } from '../constants'

type SearchLink = {
  id: string
  url: string
}

type Preset = {
  id: string
  label: string
  searchLinks: SearchLink[]
}

export const DEFAULT: Preset = {
  id: 'default',
  label: 'Default preset',
  searchLinks: [
    { id: '🌐 Google', url: `https://google.com/search?q=${SEARCH_PLACEHOLDER}` },
    { id: '🍊 Google + Reddit', url: `https://google.com/search?q=reddit ${SEARCH_PLACEHOLDER}` },
    { id: '🤖 StackOverflow', url: `https://stackoverflow.com/search?q=${SEARCH_PLACEHOLDER}` },
    { id: '💻 GitHub Code', url: `https://github.com/search?q=${SEARCH_PLACEHOLDER}&type=code` },
    { id: '📚 GitHub Repositories', url: `https://github.com/search?q=${SEARCH_PLACEHOLDER}&type=repositories` },
    { id: '🟠 Reddit', url: `https://www.reddit.com/search/?q=${SEARCH_PLACEHOLDER}` },
  ],
}

export const DEV: Preset = {
  id: 'dev',
  label: 'Dev preset',
  searchLinks: [
    { id: '🤖 StackOverflow', url: `https://stackoverflow.com/search?q=${SEARCH_PLACEHOLDER}` },
    { id: '💻 GitHub Code', url: `https://github.com/search?q=${SEARCH_PLACEHOLDER}&type=code` },
    { id: '📚 GitHub Repositories', url: `https://github.com/search?q=${SEARCH_PLACEHOLDER}&type=repositories` },
  ],
}
