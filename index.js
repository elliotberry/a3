#!/usr/bin/env node

const generate = require("lib/index");
const numberOfAdjectives = process.argv[2] || 2;
const format = process.argv[3] || "param";

generate({ adjectives : numberOfAdjectives, format : format }).then(console.log);
