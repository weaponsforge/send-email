import { ZodObject, type ZodIssue, type ZodRawShape } from 'zod'

import type {
  ISchemaValidator,
  ISchemaValidateParams,
  ZodObjectType
} from '@/types/schemavalidator.interface.js'

/**
 * @class SchemaValidator
 * @description Wrapper around a zod schema that returns formatted validation error messages and extracts sub-schemas
 */
class SchemaValidator implements ISchemaValidator {
  schema: ZodObjectType | null = null

  /**
   * @constructor
   * @param {ZodObjectType} schema zod schema
   */
  constructor (schema: ZodObjectType) {
    if (!this.isZodSchema(schema)) {
      throw new Error('Schema is not a zod schema')
    }

    this.schema = schema
  }

  isZodSchema (schema: ZodObjectType) {
    return schema instanceof ZodObject
  }

  isObject (param: object) {
    return !Array.isArray(param) && typeof param === 'object'
  }

  getSubSchema (data: Record<string, ZodRawShape|unknown>): ZodObjectType {
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

  get properties (): ZodRawShape {
    this.checkSchema()
    return this.schema!.shape
  }
}

export default SchemaValidator
