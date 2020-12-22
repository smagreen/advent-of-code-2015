const fs = require('fs');

function getInput(filename){
    return fs.readFileSync(filename, {encoding:'utf8', flag:'r'});
}

function splitOnBlankLine(data){
    return data.split(/\r\n\r\n/gm); 
}

function getLines(data){
    return data.split(/\r\n/gm); 
}

// Composition functions for convenience
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))
const pipe = (...fns) => fns.reduceRight((f, g) => (...args) => f(g(...args)))

module.exports = { compose, pipe, getInput, splitOnBlankLine, getLines };