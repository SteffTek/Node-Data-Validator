[![Discord](https://img.shields.io/discord/803319138260090910?color=%237289DA&label=Discord)](https://discord.gg/Qgv8DSMYM3) ![License](https://img.shields.io/github/license/SteffTek/Node-Data-Validator) [![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/stefftek/Node-Data-Validator)](https://github.com/SteffTek/Node-Data-Validator) [![GitHub issues](https://img.shields.io/github/issues/stefftek/Node-Data-Validator)](https://github.com/SteffTek/Node-Data-Validator/issues) ![Build](https://img.shields.io/github/workflow/status/SteffTek/Node-Data-Validator/Node.js%20Package)

# Node Data Validator
**Validate JavaScript objects based on an given model recursively**

# About
This **Data Validator** was created out of necessity to validate received objects against an given data model on a websocket server, but it can be used to compare any data.


# Installation
NodeJS Installation
```
npm i @stefftek/node-data-validator
```
***or*** - script tag for the browser
```html
<script src="https://unpkg.com/@stefftek/node-data-validator@latest/Validator.js" type="text/javascript"></script>
```

# Usage
### Import
with Common JS
```js
/* Import Tick.js */
const Validator = require("@stefftek/node-data-validator");
```
**or** - TypeScript Import
```js
/* Import Tick.js */
import Validator from "@stefftek/node-data-validator";
```
### Using the Module
```js
/*
    IMPORTS
*/
const Validator = require("./Validator");

// TEST DATA
const input = {
    name: 'John',
    age: 23,
    email: "john@dou.de",
    address: {
        street: "Main Street",
        city: "New York",
        zip: 24654
    },
    userIDs: [{test:"asdf"},{test:"asdf"}]
}

const model = {
    name: String,
    age: Number,
    email: String,
    address: {
        street: String,
        city: String,
        zip: Number
    },
    userIDs: [{test:String},{test:String}],
}

console.log(Validator(input, model));
```

