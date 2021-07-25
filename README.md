[![Discord](https://img.shields.io/discord/803319138260090910?color=%237289DA&label=Discord)](https://discord.gg/Qgv8DSMYM3) ![License](https://img.shields.io/github/license/SteffTek/Node-Data-Validator) [![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/stefftek/Node-Data-Validator)](https://github.com/SteffTek/Node-Data-Validator) [![GitHub issues](https://img.shields.io/github/issues/stefftek/Node-Data-Validator)](https://github.com/SteffTek/Node-Data-Validator/issues) ![Build](https://img.shields.io/github/workflow/status/SteffTek/Node-Data-Validator/Node.js%20Package)

# Node Data Validator
**Validate JavaScript objects based on an given model recursively.**

# About
This **Data Validator** was created out of necessity to validate received objects against an given data model on a websocket server, but it can be used to compare any data. You can specify data models with details like min- *or* max-size and more.

## New in 1.1.0
- Introducing: **DetailedValues** - specify exactly what you need. Read further to learn more.
- Now deep searching arrays is possible.

# Installation
NodeJS Installation
```
npm i node-data-validator
```
***or*** - script tag for the browser
```html
<script src="https://unpkg.com/node-data-validator@latest/Validator.js" type="text/javascript"></script>
```

# Usage
### Import
with Common JS
```js
/* Import Validator */
const {Validator} = require("node-data-validator");
```
**or** - TypeScript Import
```js
/* Import Validator */
import {Validator} from "node-data-validator";
```
### Using the Module
```js
/*
    IMPORTS
*/
const {Validator} = require("./Validator");

// Create test data
const input = {
    name: 'John',
    age: 23,
    email: "john@example.com",
    address: {
        street: "Main Street",
        city: "New York",
        zip: 24654
    },
    userIDs: [128923891, 238923, 234324, 234234, 23623456]
}

// Create model
const model = {
    name: String,
    age: Number,
    email: String,
    address: {
        street: String,
        city: String,
        zip: Number
    },
    userIDs: [Number],
}

// Output result
console.log(Validator(input, model));
```

### Detailed Values
Working with DetailedValues is exactly as working with primitives. Firstly, import DetailedValues together with the Validator Function.
with Common JS
```js
/* Import Validator */
const {Validator, DetailedValue} = require("node-data-validator");
```
**or** - TypeScript Import
```js
/* Import Validator */
import {Validator, DetailedValue} from "node-data-validator";
```

Then specify your model as following:
```js
// Create model
const model = {
    name: new DetailedValue(String, {required: true, min: 4}),
    age: Number,
    email: String,
    address: {
        street: String,
        city: String,
        zip: Number
    },
    userIDs: [Number],
}
```
You can use the Type declaration in the DetailedValue exactly like the rest of the model, so things like `[[Number]]` and other shinanigans work fine.

A DetailedValue has the following options:
| Option   | Type    | Description                        | Values            | Default |
|----------|---------|------------------------------------|-------------------|---------|
| required | boolean | Is the value required?             | `true` or `false` | `true`  |
| min      | number  | Min length of the value.           | `Number`          | `null`  |
| max      | number  | Max length of the value.           | `Number`          | `null`  |
| isEmail  | boolean | Validate if the value is an email. | `true` or `false` | `false` |

### Limitations
If you specify an array like `userIDs: [Number]` only the first data type - in this case `Number` - will be verified against the data array.