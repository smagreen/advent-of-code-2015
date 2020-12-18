const assert = require("assert");
const { getArrayFromFile } = require("../file-helper");

const input = "./3/input.txt";

// https://adventofcode.com/2015/day/3
describe("Day 3: Perfectly Spherical Houses in a Vacuum", function (){
    it("Part 1 test", function(){
        assert.strictEqual(deliver('^v^v^v^v^v', false), 2);
    });
    it("Part 1 Solve => 2081", function(){
        assert.strictEqual(deliver(getArrayFromFile(input)[0], false), 2081);
    });
    it("Part 2 Solve => 2341", function(){
        assert.strictEqual(deliver(getArrayFromFile(input)[0], true), 2341);
    });
   
});

const deliver = (data, robot = true) => {
    const directions = new Map([
        ['^', [0, -1]],
        ['v', [0, 1]],
        ['>', [1, 0]],
        ['<', [-1, 0]]
       ]);

    const format = (x,y) => x + ' ' + y
    
    const santa = ((h, d, i) => {
        const [dx, dy] = directions.get(d);
        x+=dx; y+=dy;
        h.set (format(x,y), 1 + h.get(format(x,y)) || 1);
        return h;
    })

    const roboSanta = ((h, d, i) => {
        const [dx, dy] = directions.get(d);
        if(i % 2 === 1) {
            rx+=dx; ry+=dy;
            h.set (format(rx,ry), 1 + h.get(format(rx,ry)) || 1)
        };
        
        if(i % 2 === 0) santa(h,d,i) 
        
        return h;
    })

    let x=0, y=0;
    let rx=0, ry=0;

    const reducer = robot ? roboSanta : santa;

    return data.split('').reduce((h, d, i) => reducer(h,d,i), new Map([['0 0', 1]])).size;
}