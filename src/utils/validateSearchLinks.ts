import type { SearchLink } from '../types'

export type JSONError = 'JSONSchemaError' | 'DuplicatedIdError' | 'ObjectKeysError'

export class JSONSchemaError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'JSONSchemaError'
  }
}

export class DuplicatedIdError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'DuplicatedIdError'
  }
}

export class ObjectKeysError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = 'ObjectKeysError'
  }
}

function toJSON(str: string) {
  try {
    return JSON.parse(str)
  } catch {
    throw new JSONSchemaError()
  }
}

export function validateSearchLinks(settings: string) {
  try {
    const parsed = toJSON(settings) as SearchLink[]

    const matchsSearchLinkType = parsed.every((el) => Object.keys(el).length === 2 && el.id && el.url)
    if (!matchsSearchLinkType) {
      throw new ObjectKeysError()
    }

    const uniqueIds = new Set(parsed.map((v) => v.id))
    if (uniqueIds.size < parsed.length) {
      throw new DuplicatedIdError()
    }

    return parsed
  } catch (error) {
    if (error instanceof Error) {
      return error.name as JSONError
    }
  }
}
