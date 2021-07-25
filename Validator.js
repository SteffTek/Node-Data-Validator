/**
 * Checks if object is valid with model
 * @param {object} input object to check
 * @param {object} model model to check against
 * @returns {boolean} is object valid
 */
const Validator = (input, model) => {

    /**
     * Recursively check if object is valid
     * @param {object} input object to check
     * @param {object} model model to check against
     */
    function recursion(input, model) {

        // Check if input or model is null
        if (!input || !model) {
            return false;
        }

        // Loop through model
        for(let key in model) {

            // Check if key is in object if not detailed value
            if(!(model[key] instanceof DetailedValue)) {
                if(!input.hasOwnProperty(key)) {
                    // If not, set validity to false and abort
                    return false;
                }
            }

            // Get type of key
            let type = model[key];
            let data = input[key];

            // Check model type
            switch(type) {

                // Is String?
                case String:
                    if(typeof data !== "string") return false;
                    break;

                // Is Number?
                case Number:
                    if(isNaN(data) || typeof data !== "number") return false;
                    break;

                // Is Boolean?
                case Boolean:
                    if(typeof data !== "boolean") return false;
                    break;

                // Is Array?
                case Array:
                    if(!Array.isArray(data)) return false;
                    break;

                // Is Object?
                case Object:
                    if(!(data instanceof Object)) return false;
                    break;

                default:

                    // Check if is detailed value
                    if(type instanceof DetailedValue) {
                        const result = type.validate(data);
                        if(typeof result !== "undefined") return false;
                        break;
                    }

                    // Check if object
                    if(typeof type !== "object") return false;

                    // Check if array
                    if(Array.isArray(type) && !Array.isArray(data)) return false;

                    // recursion on array
                    if(Array.isArray(type) && Array.isArray(data)) {

                        // loop data
                        for(let key in data) {
                            // loop the data with the first entry of the model
                            const result = recursion([data[key]], [type[0]]);

                            // Return if not valid
                            if(typeof result !== "undefined") return false;
                        }

                    } else {
                        // Check recursively
                        const result = recursion(data, type);

                        // Return if not valid
                        if(typeof result !== "undefined") return false;
                    }
                    break;
            }
        }
    }

    // Start recursion & get result
    const result = (typeof recursion(input, model) === "undefined" ? true : false);

    // Return result
    return result;
}

/**
 * Detailed Value Class for validating data
 */
class DetailedValue {

    /**
     * Create a new DetailedValue
     * @param {primitive} type primitive type of value
     * @param {*} options options for value
     */
    constructor(type, { required = true, min = null, max = null, isEmail = false} = {}) {
        this.type = type;
        this.required = required;
        this.min = min;
        this.max = max;
        this.isEmail = isEmail;
    }

    /**
     * Validates the object against the detailed value
     * @param {object} input object to check
     */
    validate(input) {

        // Validate input as usual
        const validation = Validator([input], [this.type]);

        // Check if required
        if(!this.required && !input && !validation) {
            return;
        }

        if(this.required && !input && !validation) {
            return false;
        }

        // check length by type
        let length = 0;
        if([String, Array].includes(this.type) || Array.isArray(this.type)) {
            length = input.length;
        } else if(this.type === Number) {
            length = input;
        }

        // Check if length is min valid
        if(this.min && length < this.min) {
            return false;
        }

        // Check if length is max valid
        if(this.max && length > this.max) {
            return false;
        }

        // Check if is email
        if(this.isEmail) {
            if(!this.validateEmail(input, true)) {
                return false;
            }
        }

        // Return result
        if(!validation) {
            return false;
        }
    }

    /**
     * Checks if the value is valid email
     * @param {string} email email to check
     * @param {boolean} unicode use unicode
     * @returns {boolean} is the email valid
     */
    validateEmail(email, unicode = false) {

        // Create Regex
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        // Change Regex if unicode is allowd
        if(unicode) re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        // Return result of check
        return re.test(String(email).toLowerCase());
    }
}

/*
    EXPORT CLASS IF NODE ENV
*/
if (typeof module !== "undefined" && module.exports){
    module.exports = {
        Validator: Validator,
        DetailedValue: DetailedValue
    }
}