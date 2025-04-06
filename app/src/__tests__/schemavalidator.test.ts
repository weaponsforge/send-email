import { z } from 'zod'
import { beforeAll, describe, expect, it } from 'vitest'
import SchemaValidator from '@/lib/validator/schemavalidator.js'
import type { ZodObjectBasicType } from '@/types/schemavalidator.interface.js'

describe('SchemaValidator class test', () => {
  // Sample schema validator instance
  let testSchema: SchemaValidator | null = null

  // Sample zod schema for testing
  const playerSchema = z.object({
    name: z.string(),
    level: z.number(),
    server: z.string()
  })

  beforeAll(async () => {
    testSchema = new SchemaValidator(playerSchema)
  })

  it ('should list the zod schema keys and properties', () => {
    const keys = testSchema?.properties

    expect(keys).toBeDefined()
    expect(keys).toBeInstanceOf(Array)
    expect(keys?.every(key => typeof key === 'string')).toBe(true)
    expect(keys).toEqual(['name', 'level', 'server'])
  })

  it ('should throw an error if no schema is provided', () => {
    const typesafeUndefined = undefined as unknown as ZodObjectBasicType

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

  it ('should extract properties from a ZodEffects schema', async () => {
    const effectsSchema = z.object({
      id: z.number(),
      address: z.string(),
      name: z.string()
    }).refine((data) =>
      (data.address !== undefined),
    { message: 'Address is required' }
    )

    const testSchema = new SchemaValidator(effectsSchema)
    const keys = testSchema?.properties

    expect(keys).toBeDefined()
    expect(keys).toBeInstanceOf(Array)
  })

  it ('should validate the subset of properties from a ZodEffects schema', async () => {
    const effectsSchema = z.object({
      id: z.number(),
      address: z.string(),
      name: z.string()
    }).refine((data) =>
      (data.id !== undefined),
    { message: 'ID is required' }
    )

    const testSchema = new SchemaValidator(effectsSchema)
    const data = {
      address: 123,
      name: 'some string'
    }

    expect(() =>
      testSchema.validate({ data, pick: true })
    ).toThrow()
  })
})
