const assert = require('assert');
const { parse } = require('path');
const { pipe, curry, getInput, getLines} = require('../advent-utils');

describe("Day 7: Some Assembly Required", function(){
    it("Part 1 Solve", function(){
        const result = part1Solve();
        assert.strictEqual(result, 16076);
    })
    it("Part 2 Solve", function(){
        let wireA = part1Solve();
        wireA = overrideWireBwithA(wireA);
        assert.strictEqual(wireA, 2797);
    })
})


const createMap = (arr) => { 
        const m = arr.reduce((m ,c) => {  
                m.set(c[1], c[0].split(' '))
                return m;
            }, new Map())
        return m;
}

const parseInput = (data) => data.map(line => line.split(' -> '));

const run  = (instructions) => {
 
    let _map = new Map(Array.from(instructions));
    let unresolved  = 1;

    while(unresolved > 0){
        resolving = false;
        _map = resolveAssignments(_map);
        _map = resolveNots(_map);
        _map = resolveBitwise(_map);

        unresolved  = Array.from(_map.values()).reduce((a, v) => a += typeof(v) === 'object' ? 1 : 0, 0)
    }

    return _map;
}

const resolveAssignments = (map) => {
    const _map = new Map(Array.from(map));
    const _assignments = Array.from(map.keys()).filter( f => map.get(f).length == 1);
    
    _assignments.forEach( k => {
        const v = _map.get(k);
        if(isNaN(+v[0])){
            const resolve = _map.get(v[0]);
            if(!isNaN(resolve)) _map.set(k, +resolve);
            resolving = true;
        } else {
            _map.set(k, +v[0]);
        }
    });

    return _map;
}

const resolveNots = (map) => {
    const _map = new Map(Array.from(map));
    const _assignments = Array.from(map.keys()).filter( f => map.get(f).length == 2);
    
    _assignments.forEach( key => {
        const [, value] = _map.get(key);
        
        const num = isNaN(value) ? +_map.get(value) : +value;
        
        if(!isNaN(num)){
            const notValue = parseInt(num.toString(2).padStart(16, '0').split('').reduce((s,c)=> s += c=='0' ? '1' : '0',''),2)
            _map.set(key, notValue);
        }
    });

    return _map;
}

const resolveBitwise = (map) => {
    const _map = new Map(Array.from(map));
    const bitwise = Array.from(map.keys()).filter( f => map.get(f).length == 3);
    bitwise.forEach(key => {
        const [lhs, operator, rhs] = _map.get(key);
        const lhsNum = isNaN(lhs) ? +_map.get(lhs) : +lhs;
        const rhsNum = isNaN(rhs) ? +_map.get(rhs) : +rhs;
       
        if(!isNaN(lhsNum) && !isNaN(rhsNum)){
            let result = null;
            switch(operator){
                case 'AND':
                    result = lhsNum & rhsNum;
                    break;
                case 'OR':
                    result = lhsNum | rhsNum;
                    break;
                case 'LSHIFT':
                    result = lhsNum << rhsNum;
                    break;
                case 'RSHIFT':
                    result = lhsNum >> rhsNum;
                    break;
                default:
                    throw ("Unkown Operator");
            }
            _map.set(key, result);
        } 
    })

    return _map;
}

const overrideWireBwithA = (override) => { 
    const circuit = part2Phase1();
    circuit.set('b', override); 
    const wireA = part2Phase2(circuit);
    return wireA;
}

const returnWire = (wireId, map) => map.get(wireId);

const part1Solve = () => pipe(
        getInput, getLines, parseInput,
        createMap,
        run,
        curry(returnWire)('a')
        )("./7/input.txt");

const part2Phase1 = () => pipe(getInput, getLines, parseInput, createMap)("./7/input.txt");
const part2Phase2 = (circuit) => pipe(run, curry(returnWire)('a'))(circuit);
