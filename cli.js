#!/usr/bin/env node
let aaa = require('./index.js')

const main = async function() {
    let a = await aaa();
    console.log(a);
}
main();