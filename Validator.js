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

            // Check if key is in object
            if(!input.hasOwnProperty(key)) {
                // If not, set validity to false and abort
                return false;
            }

            // Get type of key
            const type = model[key];
            const data = input[key];

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
                    // Check if object
                    if(typeof type !== "object") return false;

                    // Check if array
                    if(Array.isArray(type) && !Array.isArray(data)) return false;

                    // Check recursively
                    const result = recursion(data, type);

                    // Return if not valid
                    if(typeof result !== "undefined") return false;
            }
        }
    }

    // Start recursion & get result
    const result = (typeof recursion(input, model) === "undefined" ? true : false);

    // Return result
    return result;
}

/*
    EXPORT CLASS IF NODE ENV
*/
if (typeof module !== "undefined" && module.exports){
    module.exports = Validator;
}