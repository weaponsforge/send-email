import { ZodObject, ZodFirstPartyTypeKind } from 'zod'
import type { ZodIssue, ZodRawShape, ZodType, ZodEffects } from 'zod'

export type ZodObjectBasicType = ZodObject<ZodRawShape>
export type ZodObjectEffectsType = ZodType | ZodEffects<any>
export type ZodObjectInput = ZodObjectBasicType | ZodObjectEffectsType

export type { ZodIssue, ZodRawShape }
export { ZodObject, ZodFirstPartyTypeKind }

/**
  * Parameter properties of the `ISchemaValidator.validate()` function
  * @interface ISchemaValidateParams
  * @param {Record<string, unknown>} data Key-value object pairs to validate with the zod `this.schema`
  * @param {string} [errorDelimiter] (Optional) Character or text to put between one (1) or more zod error messages. Defaults to a newline `"\n"` character.
  * @param {boolean} pick (Optional) Flag to validate only a subset of `data`. Defaults to `false`
  */
export interface ISchemaValidateParams {
  data: Record<string, unknown>;
  errorDelimiter?: string;
  pick?: boolean;
}

/**
 * Public properties and methods of the `SchemaValidator` class.
 * @interface ISchemaValidator
 */
export interface ISchemaValidator {
  /** zod schema */
  schema: ZodObjectBasicType | null;

  /**
   * Checks if an zod schema is a basic zod schema (`ZodObject`) or an effects schema (`ZodEffects`, e.g., edited with `z.refine()`)
   * @param {ZodObjectEffectsType} schema zod schema
   * @returns {boolean} Flag that checks if an object is a zod schema
   */
  isZodSchema (schema: ZodObjectEffectsType | ZodObjectBasicType): boolean;

  /**
   * Checks if an input parameter is an Object
   * @param {object} param Object input
   * @returns {boolean} Flag that checks if the input parameter is an object
   */
  isObject (param: object): boolean;

  /**
   * Checks if a zod schema is a basic zod schema (`ZodObject`)
   * @param {ZodObjectBasicType} schema zod schema
   * @returns {boolean} Flag that checks if an object is a zod schema
   */
  isZodObject (schema: ZodObjectBasicType): schema is ZodObjectBasicType;

  /**
   * Checks if a zod schema is an effects zod schema (`ZodEffects`)
   * @param {ZodObjectEffectsType} schema zod schema
   * @returns {boolean} Flag that checks if an object is an effects zod schema
   */
  isZodEffects (schema: ZodObjectEffectsType): boolean;

  /**
   * Retrieves a subset of the zod `this.schema` using `.pick()`
   * @param {Record<string, any>} data Object that may possibly be a subset of the local zod `this.schema`
   * @returns {ZodObjectBasicType} Subset of the zod `this.schema`
   * @throws {Error} Validation errors. Also throws an error if one (1) or more keys in the `data` parameter are missing in the original `this.schema`
   */
  getSubSchema (data: Record<string, ZodRawShape>): ZodObjectBasicType;

  /**
   * Validates a set of input parameters with the zod `this.schema`
   * @param {ISchemaValidateParams} params Validation input parameters
   * @returns {boolean} Returns `true` if there are no validation errors.
   * @throws {Error} Combined zod error messages if there are one (1) or more validation errors.
   */
  validate (params: ISchemaValidateParams): void;

  /**
   * Joins one (1) or more group of zod error messages `ZodError[].message` into one (1) string of text.
   * @param {ZodIssue[]} errors One (1) or more zod validation error messages
   * @param {string} [errorDelimiter] (Optional) Character or text to put between one (1) or more zod error messages. Defaults to a newline `"\n"` character.
   */
  formatErrors (errors: ZodIssue[], errorDelimiter: string): string;

  /**
   * Checks if the local `this.schema` has been initialized.
   * @returns {void}
   * @throws {Error} Throws an error if `this.schema` is null or not yet initialized.
   */
  checkSchema (): void;

  /**
   * Retrieves the type name of the zod schema
   * @returns {string} Type name of the zod schema
   */
  get typeName (): string;

  /**
   * Retrieves the object keys of `this.schema`
   * @returns {string[]} Object keys of `this.schema`
   */
  get properties (): string[];
}

/**
 * Constructor interface of the `SchemaValidator` class.
 * @interface ISchemaValidatorConstructor
 */
export interface ISchemaValidatorConstructor {
  new (schema: ZodObjectEffectsType): ISchemaValidator;
}
