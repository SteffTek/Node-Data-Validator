/*
    IMPORTS
*/
const {Validator, DetailedValue} = require("./Validator");

// TEST DATA
const input = {
    name: "John",
    age: 23,
    email: "john@dou.de",
    address: {
        street: "Main Street",
        city: "New York",
        zip: 24654
    },
    userIDs: [234234, 23094, 234, 233467, 345652]
}

const model = {
    name: new DetailedValue(String, {required: true, min: 3}),
    age: new DetailedValue(Number, {required: true, min: 18}),
    email: new DetailedValue(String, {required: true, isEmail: true}),
    address: {
        street: String,
        city: String,
        zip: Number
    },
    userIDs: new DetailedValue([Number], {required: true, min: 1}),
}

console.log(Validator(input, model));