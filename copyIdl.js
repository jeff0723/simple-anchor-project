const fs = require('fs');
const idl = require('./target/idl/anchor_practice.json');

fs.writeFileSync('./app/src/idl.json', JSON.stringify(idl));