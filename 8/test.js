const assert = require("assert");
const {pipe, getInput, getLines } = require("../advent-utils");


describe("Day 8: Something", function(){
    it("Solve", function(){
        assert.strictEqual(0,0);
    })
})

const processLines = (lines) => {

    const rex = RegExp(/(\\x[0-9|a-f}]{2,2})|(\\")|(\\)/g);
    let memory = 0;
    let totMem = 0;
    let totChars = 0;

    lines.forEach(line => {
        const matches = line.match(rex);
        let lineChars = line.length;
        memory = lineChars - 2;
        if(matches){
            let matchLength = 0;
            matches.forEach(m => {
                //console.log("Match: %s, Literals: %d", m, m.length)
                matchLength += m.length - 1;
            });
            memory = lineChars - 2 - matchLength;
        }
        console.log(lineChars, memory);
        totChars += lineChars;
        totMem += memory;
    });

    console.log("%d %d %d", totChars, totMem, totChars - totMem);
}

const testPart1 = pipe(getInput, getLines, processLines)('./8/input.txt');