const fs = require('fs');

function getArrayFromFile(filename){
    const data = fs.readFileSync(filename, {encoding:'utf8', flag:'r'});
    return data.split(/\r\n/gm);
}

function getArrayFromFileSplitOnBlankLines(filename){
    const data = fs.readFileSync(filename, {encoding:'utf8', flag:'r'});
    return data.split(/\r\n\r\n/gm);
}

function alternativeFileRead(filename){
    var lines = require('fs').readFileSync(filename, 'utf-8')
    .split('\n')
    .filter(Boolean); 

    return lines;
}

module.exports = { getArrayFromFile, getArrayFromFileSplitOnBlankLines };