/**
 * Checks if object is valid with model
 * @param {object} input object to check
 * @param {object} model model to check against
 * @returns {boolean} is object valid
 */
export function Validator(input: object, model: object): boolean;
/**
 * Detailed Value Class for validating data
 */
export class DetailedValue {
    /**
     * Create a new DetailedValue
     * @param {primitive} type primitive type of value
     * @param {*} options options for value
     */
    constructor(type: any, { required, min, max, isEmail }?: any);
    type: any;
    required: any;
    min: any;
    max: any;
    isEmail: any;
    /**
     * Validates the object against the detailed value
     * @param {object} input object to check
     */
    validate(input: object): boolean;
    /**
     * Checks if the value is valid email
     * @param {string} email email to check
     * @param {boolean} unicode use unicode
     * @returns {boolean} is the email valid
     */
    validateEmail(email: string, unicode?: boolean): boolean;
}
