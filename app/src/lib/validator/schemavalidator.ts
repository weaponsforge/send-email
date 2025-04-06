import { ZodFirstPartyTypeKind, ZodObject } from '@/types/schemavalidator.interface.js'

import type {
  ISchemaValidator,
  ISchemaValidateParams,
  ZodEffectsDef,
  ZodIssue,
  ZodObjectBasicType,
  ZodRawShape,
  ZodSchemaType
} from '@/types/schemavalidator.interface.js'

/**
 * @class SchemaValidator
 * @description Wrapper around `ZodObject` and `ZodEffects` zod schemas that returns formatted validation error messages and extracts sub-schemas
 */
class SchemaValidator implements ISchemaValidator {
  schema: ZodSchemaType | null = null

  /**
   * @constructor
   * @param {ZodSchemaType} schema zod schema
   */
  constructor (schema: ZodSchemaType) {
    if (!this.isZodSchema(schema)) {
      throw new Error('Schema is not a zod schema')
    }

    this.schema = schema
  }

  isZodSchema (schema: ZodSchemaType): boolean {
    if (this.isZodObjectSchema(<ZodObjectBasicType>schema)) return true

    // Check if it's a ZodEffects that wraps a ZodObject; e.g., using z.refine()
    if ('_def' in schema && 'schema' in schema._def) {
      return this.isZodSchema(schema._def.schema)
    }

    return false
  }

  isObject (param: object) {
    return !Array.isArray(param) && typeof param === 'object'
  }

  isZodObjectSchema (schema: ZodObjectBasicType): schema is ZodObjectBasicType {
    return schema instanceof ZodObject
  }

  isZodEffectsSchema (schema: ZodSchemaType): boolean {
    return '_def' in schema &&
      'typeName' in schema._def &&
      schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects
  }

  getBaseSchema (schema: ZodSchemaType): ZodObjectBasicType {
    if (this.isZodEffectsSchema(schema)) {
      return (<ZodEffectsDef>schema._def).schema as ZodObjectBasicType
    }

    return <ZodObjectBasicType>schema
  }

  getSubSchema (data: Record<string, ZodRawShape | unknown>): ZodObjectBasicType | null {
    this.checkSchema()

    let schema: ZodObjectBasicType | ZodEffectsDef | null = null

    if (!this.isObject(data)) {
      throw new Error('Input is not an object')
    }

    if (this.isZodEffectsSchema(this.schema!)) {
      schema = <ZodObjectBasicType>this.getBaseSchema(this.schema!)
    } else {
      schema = <ZodObjectBasicType>this.schema
    }

    const originalKeys = Object.keys(schema.shape)
    const subKeys = Object.keys(data)

    if (!subKeys.every(key => originalKeys.includes(key))) {
      throw new Error('Some keys are missing from the original schema')
    }

    const findKeys = Object
      .keys(data)
      .reduce((list, item) => ({ ...list, [item]: true }), {})

    if (subKeys.length > 0) {
      return schema.pick(findKeys)
    }

    return schema
  }

  validate (params: ISchemaValidateParams) {
    this.checkSchema()

    const { data, errorDelimiter = '\n', pick = false } = params
    let result

    if (pick) {
      const subSchema = this.getSubSchema(data)
      result = subSchema?.safeParse(data)
    } else {
      result = this.schema!.safeParse(data)
    }

    if (result && !result.success) {
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
    return (<ZodObjectBasicType>this.schema)._def.typeName
  }

  get properties (): string[] {
    this.checkSchema()

    if (this.isZodEffectsSchema(this.schema!)) {
      const schema = <ZodObjectBasicType>this.getBaseSchema(this.schema!)
      return Object.keys(schema.shape)
    } else {
      return Object.keys((<ZodObjectBasicType>this.schema).shape)
    }
  }
}

export default SchemaValidator
