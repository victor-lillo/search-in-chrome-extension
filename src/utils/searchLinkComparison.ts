import type { SearchLink } from '@/types'

export function added(old: SearchLink[], current: SearchLink[]) {
  return current.filter((el) => !old.some((element) => element.id === el.id))
}

export function alreadyAdded(old: SearchLink[], current: SearchLink[]) {
  return old.filter((el) => current.some((element) => element.id === el.id))
}

export function removed(old: SearchLink[], current: SearchLink[]) {
  return old.filter((el) => !current.some((element) => element.id === el.id))
}

export function hasSameOrder(a: SearchLink[], b: SearchLink[]) {
  if (a.length !== b.length) return false
  return a.every((el, index) => el.id === b[index].id)
}
