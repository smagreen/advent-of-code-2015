const assert = require("assert");
const { compose, getInput, getLines, pipe } = require("../advent-utils");

const part1 = (file) => pipe(getInput, getLines, threeVowels, repeatingLetter, disallowed, count)("./5/input.txt");
const part2 = (file) => pipe(getInput, getLines, hasPairs, repeatsWithSpacer, count)("./5/input.txt");
const part2Test = (strings) => pipe(hasPairs, repeatsWithSpacer, count)(strings);

describe("Day 5: Doesn't He Have Intern-Elves For This?", function(){
    it("Part 1: Input returns 258", function(){
        assert.strictEqual(part1(), 258);
    });
    it("Part 2: qjhvhtzxzqqjkmpb", function(){
        assert.strictEqual(part2Test(['qjhvhtzxzqqjkmpb']), 1);
    });
    it("Part 2: xxyxx", function(){
        assert.strictEqual(part2Test(['xxyxx']), 1);
    });
    it("Part 2: uurcxstgmygtbstg", function(){
        assert.strictEqual(part2Test(['uurcxstgmygtbstg']), 0);
    });
    it("Part 2: ieodomkazucvgmuy", function(){
        assert.strictEqual(part2Test(['ieodomkazucvgmuy']), 0);
    });
    it("Part 2: Input returns 53", function(){
        assert.strictEqual(part2(), 53);
    });
});

const threeVowels = (rows) => {
    const rex = RegExp(/[aeiou]/,'g');
    const filtered = rows.filter(row => {
        const matches = row.match(rex);
        return matches && matches.length >=3;
    });
    return filtered
}
const repeatingLetter = (rows) => {
    const rex = RegExp(/(.)\1/,'g');
    const filtered = rows.filter(row => row.match(rex));
    return filtered
}
const disallowed = (rows) => {
    const rex = RegExp(/ab|cd|pq|xy/,'g');
    const filtered = rows.filter(row => !row.match(rex));
    return filtered
}
const hasPairs = (rows) => {
    const rex = RegExp(/([a-z][a-z]).*(\1)/,'g');
    return rows.filter(row => row.match(rex));
}
const repeatsWithSpacer = (rows) => {
    const rex = RegExp(/(.).(\1)/,'g');
    return rows.filter(row => row.match(rex));
}
const count = (rows) => rows.length;

