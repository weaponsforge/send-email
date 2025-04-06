import { z } from 'zod'
import { beforeAll, describe, expect, it } from 'vitest'
import SchemaValidator from '@/lib/validator/schemavalidator.js'
import type { ZodObjectType } from '@/types/schemavalidator.interface.js'

describe('SchemaValidator class test', () => {
  let testSchema: SchemaValidator | null = null

  beforeAll(async () => {
    // Sample zod schema for testing
    const playerSchema = z.object({
      name: z.string(),
      level: z.number(),
      server: z.string()
    })

    // Sample schema validator instance
    testSchema = new SchemaValidator(playerSchema)
  })

  it('should throw an error if no schema is provided', () => {
    const typesafeUndefined = undefined as unknown as ZodObjectType

    expect(
      () => new SchemaValidator(typesafeUndefined)
    ).toThrow()
  })

  it ('should validate correct sub-schema when provided with a pick parameter', async () => {
    const validSubSchema = {
      server: 'some string',
      level: 10
    }

    expect(() =>
      testSchema!.validate({ data: validSubSchema, pick: true })
    ).not.toThrow()
  })

  it ('should throw an error when validating incorrect sub-schema with a pick parameter', async () => {
    const incorrectSubSchema = {
      otherKey: 'some string',
      notAKey: 'some string'
    }

    expect(() =>
      testSchema!.validate({ data: incorrectSubSchema, pick: true })
    ).toThrow()
  })

  it ('should throw an error when validating incorrect schema data', async () => {
    const incorrectInputValues = {
      server: 'some string',
      level: 'ten'
    }

    expect(() =>
      testSchema!.validate({ data: incorrectInputValues, pick: true })
    ).toThrow()
  })

  it ('should succeed when validating correct schema data', async () => {
    const correntInputValues = {
      server: 'some string',
      level: 10
    }

    expect(() =>
      testSchema!.validate({ data: correntInputValues, pick: true })
    ).not.toThrow()
  })
})
