import type { SearchLink } from '@/types'

const formatter = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction',
})

export function alertAllItemsAdded(added: SearchLink[]) {
  const addedText = `✅ ${formatter.format(added.map(({ id }) => id))} added successfully.\n`

  alert(addedText)
}

export function alertNoItemsAdded(noAdded: SearchLink[]) {
  const addedText = `❌ ${formatter.format(noAdded.map(({ id }) => id))} were already saved, there is nothing to add.`

  alert(addedText)
}

export function alertSomeItemsAdded(added: SearchLink[], noAdded: SearchLink[]) {
  const addedText = `✅ ${formatter.format(added.map(({ id }) => id))} added successfully.\n❌ ${formatter.format(noAdded.map(({ id }) => id))} were already added.`

  alert(addedText)
}
