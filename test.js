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