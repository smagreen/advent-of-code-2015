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
function curry(fn,arity = fn.length) {
    return (function nextCurried(prevArgs){
        return function curried(nextArg){
            var args = [ ...prevArgs, nextArg ];
            if (args.length >= arity) {
                return fn( ...args );
            }
            else {
                return nextCurried( args );
            }
        };
    })( [] );
}

module.exports = { compose, pipe, getInput, curry, splitOnBlankLine, getLines };