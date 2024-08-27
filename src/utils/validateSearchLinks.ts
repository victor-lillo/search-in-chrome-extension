import type { SearchLink } from '../types'

type JSONError = 'JSONSchemaError' | 'DuplicatedIdError'

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

function toJSON(str: string) {
  try {
    return JSON.parse(str)
  } catch {
    console.log('En toJSON')
    throw new JSONSchemaError()
  }
}

export function validateSearchLinks(settings: string) {
  try {
    const parsed = toJSON(settings) as SearchLink[]

    const uniqueIds = new Set(parsed.map((v) => v.id))
    if (uniqueIds.size < parsed.length) {
      throw new DuplicatedIdError()
    }
    console.log('Superamos el duplicates')
    return parsed
  } catch (error) {
    if (error instanceof Error) {
      return error.name as JSONError
    }
  }
}
