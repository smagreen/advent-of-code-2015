const assert = require("assert");
const { getArrayFromFile } = require("../file-helper");

const input = "./2/input.txt";

// https://adventofcode.com/2015/day/2
describe("Day 2: I Was Told There Would Be No Math", function (){
    it("Part 1 1x1x10 => 43", function(){
        assert.strictEqual(paper(['1x1x10']), 43);
    });
    it("Part 1 2x3x4 => 58", function(){
        assert.strictEqual(paper(['2x3x4']), 58);
    });
    it("Part 1 Solve => 1598415", function(){
        assert.strictEqual(paper(getArrayFromFile(input)), 1598415);
    });
    it("Part 2 2x3x4 => 58", function(){
        assert.strictEqual(ribbon(['2x3x4']), 34);
    });
    it("Part 1 1x1x10 => 43", function(){
        assert.strictEqual(ribbon(['1x1x10']), 14);
    });
    it("Part 2 Solve => 3812909", function(){
        assert.strictEqual(ribbon(getArrayFromFile(input)), 3812909);
    });
});

const area = (d) => {
    const [w, h, l] = d;
    return 2*l*w + 2*w*h + 2*h*l + Math.min(l*w, w*h, h*l);
 }

 const ribbonLength = (d) => {
    const [w, h, l] = d;
    const [s1, s2] = d.sort((a,b) => a-b);
    return (s1 * 2 + s2 * 2) + w*h*l;
 }

 const ribbon = (data) => {
    return data
        .map((d) => { const [w, h, l] = d.split('x'); return [+w, +h, +l];})
        .map((d) => ribbonLength(d))
        .reduce((a, v) => a + v, 0)
 }

const paper = (data) => {
    return data
        .map((d) => { const [w, h, l] = d.split('x'); return [+w, +h, +l];})
        .map((d) => area(d))
        .reduce((a, v) => a + v, 0)
}