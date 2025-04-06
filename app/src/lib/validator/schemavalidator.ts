import { ZodFirstPartyTypeKind, ZodObject } from '@/types/schemavalidator.interface.js'

import type {
  ISchemaValidator,
  ISchemaValidateParams,
  ZodIssue,
  ZodObjectBasicType,
  ZodObjectEffectsType,
  ZodRawShape
} from '@/types/schemavalidator.interface.js'

/**
 * @class SchemaValidator
 * @description Wrapper around a zod schema that returns formatted validation error messages and extracts sub-schemas
 */
class SchemaValidator implements ISchemaValidator {
  schema: ZodObjectBasicType | null = null

  /**
   * @constructor
   * @param {ZodObjectBasicType} schema zod schema
   */
  constructor (schema: ZodObjectBasicType) {
    if (!this.isZodSchema(schema)) {
      throw new Error('Schema is not a zod schema')
    }

    this.schema = schema
  }

  isZodSchema (schema: ZodObjectEffectsType | ZodObjectBasicType): boolean {
    if (schema instanceof ZodObject) return true

    // Check if it's a ZodEffects that wraps a ZodObject; e.g., using z.refine()
    if ('_def' in schema && 'schema' in schema._def) {
      return this.isZodSchema(schema._def.schema)
    }

    return false
  }

  isObject (param: object) {
    return !Array.isArray(param) && typeof param === 'object'
  }

  isZodObject (schema: ZodObjectBasicType): schema is ZodObjectBasicType {
    return schema instanceof ZodObject
  }

  isZodEffects (schema: ZodObjectEffectsType): boolean {
    return '_def' in schema &&
      'typeName' in schema._def &&
      schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects
  }

  getSubSchema (data: Record<string, ZodRawShape|unknown>): ZodObjectBasicType {
    this.checkSchema()

    if (!this.isObject(data)) {
      throw new Error('Input is not an object')
    }

    const originalKeys = Object.keys(this.schema!.shape)
    const subKeys = Object.keys(data)

    if (!subKeys.every(key => originalKeys.includes(key))) {
      throw new Error('Some keys are missing from the original schema')
    }

    const findKeys = Object
      .keys(data)
      .reduce((list, item) => ({ ...list, [item]: true }), {})

    if (Object.keys(subKeys).length > 0) {
      return this.schema!.pick(findKeys)
    }

    return this.schema!
  }

  validate (params: ISchemaValidateParams) {
    this.checkSchema()

    const { data, errorDelimiter = '\n', pick = false } = params
    let result

    if (pick) {
      const subSchema = this.getSubSchema(data)
      result = subSchema.safeParse(data)
    } else {
      result = this.schema!.safeParse(data)
    }

    if (!result.success) {
      const errorMessage = this.formatErrors(
        result?.error?.errors,
        errorDelimiter
      )

      throw new Error(errorMessage  || 'Encountered email parameter validation errors')
    }
  }

  formatErrors (errors: ZodIssue[], errorDelimiter: string = '\n'): string {
    return errors.reduce((list, item) => {
      const message = `${item.message} ${item.path[0]} ${errorDelimiter}`
      return list + message
    }, '')
  }

  checkSchema () {
    if (!this.schema) {
      throw new Error('Schema is missing')
    }
  }

  get typeName (): string {
    this.checkSchema()
    return this.schema!._def.typeName
  }

  get properties (): string[] {
    this.checkSchema()

    if (this.isZodEffects(this.schema!)) {
      const schema = (this.schema! as unknown as { _def: { schema: ZodObject<any> } })._def.schema
      return Object.keys(schema.shape)
    } else {
      return Object.keys(this.schema!.shape)
    }
  }
}

export default SchemaValidator
