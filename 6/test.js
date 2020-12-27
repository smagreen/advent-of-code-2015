const assert = require('assert');
const {pipe, getInput, getLines} = require('../advent-utils');

const part1 = () => pipe(getInput, getLines, parseLines, applyInstructions, countLightsOn)("./6/input.txt")
const part2 = () => pipe(getInput, getLines, parseLines, applyBrighness, totalBrightness)("./6/input.txt")
const part2Test = (array) => pipe(applyBrighness, totalBrightness)(array)

describe("Day 6: Probably a Fire Hazard", () => {
    it("Test parseLines", ()=>{
        const [instruction, x,y, tx,ty] = parseLines(['turn off 674,321 through 793,388'])[0];
        assert.strictEqual(instruction, 'turn off');
        assert.strictEqual(x, 674);
        assert.strictEqual(y, 321);
        assert.strictEqual(tx, 793);
        assert.strictEqual(ty, 388);
    });
    it("Test apply 2000 on", ()=>{
        const lights = applyInstructions([['turn on', 0,0, 1,999]]);
        assert.strictEqual(lights.size, 2000);
    })
    it("Test apply toggle", ()=>{
        const lights = applyInstructions([['turn on', 0,0, 1,999],['toggle', 0,0, 1,1]]);
        assert.strictEqual(lights.size, 1996);
    })
    it("Test 2 - Turn on 1", ()=>{
        assert.strictEqual(part2Test([['turn on', 0,0, 0,0]]), 1);
    })
    it("Test 2 - Toggle 4", ()=>{
        assert.strictEqual(part2Test([['toggle', 0,0, 1,1]]), 8);
    })
    it("Solve Part 1 => 569999", ()=> {
        assert.strictEqual(part1(), 569999);
    })
    it("Solve Part 2 => 17836115", ()=> {
        assert.strictEqual(part2(), 17836115);
    })
})

const parseLines = (lines) => {
    const rex = RegExp(/^(turn off|turn on|toggle) (\d{1,}),(\d{1,}) through (\d{1,}),(\d{1,})$/);
    return lines.map(line => {
        const [,instruction, x,y, tx,ty] = line.match(rex);
        return [instruction, +x,+y, +tx,+ty];
    });
}

const applyInstructions = (instructions) => {
    const lights = new Set();
    instructions.forEach(i => {
        const [instruction, x,y, tx,ty] = i;
        for(let lx=x; lx<=tx; lx++){
            for(let ly=y; ly<=ty; ly++){
                const location = lx + ',' + ly;
                const on = lights.has(location);
                if(instruction == 'turn on') lights.add(location);
                if(on && (instruction == 'turn off' || instruction =='toggle')) lights.delete(location);
                if(!on && instruction == 'toggle') lights.add(location);
            }
        }    
    });

    return lights;
}

const applyBrighness = (instructions) => {
    
    return instructions.reduce((lights, i) => {
        const [instruction, x,y, tx,ty] = i;
        for(let lx=x; lx<=tx; lx++){
            for(let ly=y; ly<=ty; ly++){
                const location = lx + ',' + ly;
                const level = lights.get(location) || 0;
                if(instruction == 'turn on') lights.set(location, level + 1);
                if(instruction == 'toggle') lights.set(location, level + 2);
                if(instruction == 'turn off'){
                    if(level === 1) lights.delete(location);
                    if(level > 1) lights.set(location, level - 1);
                }
            }
        } 
        return lights;   
    }, new Map());
}

const countLightsOn = (lights) => lights.size
const totalBrightness = (lights) => Array.from(lights.keys()).reduce((t, key) => t + lights.get(key) ,0);