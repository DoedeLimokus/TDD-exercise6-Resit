import { describe, it, expect} from "vitest"
import { createField, getSizeFromRLE, getLivingCellsFromRLE, placeCellsOnField, checkEachCell, giveLivingCells, formatRLE, formRLE, playGame, getNewLivingCells, getDifMinMax, normalizeCells} from "./gameOfLife.mjs"

// empty field check
describe('empty field check', () => {
    it("Check if a field is empty when created (3x3)", () => {
        expect(createField(3,3)).toEqual([['b','b','b'],['b','b','b'],['b','b','b']])
    })
    it("Check if a field is empty when created (4x3)", () => {
        expect(createField(4,3)).toEqual([['b','b','b'],['b','b','b'],['b','b','b'],['b','b','b']])
    })
    it("Check if a field is empty when created (4x4)", () => {
        expect(createField(4,4)).toEqual([['b','b','b','b'],['b','b','b','b'],['b','b','b','b'],['b','b','b','b']])
    })
})

describe("Extract the field size", () => {
    it("Check if the right x and y are extracted from the RLE format", () => {
        expect(getSizeFromRLE("x = 3, y = 3")).toEqual([['x',3],['y',3]])
    })
    it("Check if the right x and y are extracted from the RLE format", () => {
        expect(getSizeFromRLE("x = 4, y = 4")).toEqual([['x',4],['y',4]])
    })
    it("Check if the right x and y are extracted from the RLE format", () => {
        expect(getSizeFromRLE("x = 3, y = 4")).toEqual([['x',3],['y',4]])
    })
})

describe("Extract Living cells", () => {
    it("Determine where the living cells are", () => {
        expect(getLivingCellsFromRLE("bob$2bo$3o!")).toEqual([[1,0], [2,1], [0,2], [1,2], [2,2]])
    })
    it("Determine where the living cells are", () => {
        expect(getLivingCellsFromRLE("2o$2o!")).toEqual([[0,0], [1,0], [0,1], [1,1]])
    })
    it("Determine where the living cells are", () => {
        expect(getLivingCellsFromRLE("bobo$2bob$3ob!")).toEqual([[1,0], [3,0], [2,1], [0,2], [1,2], [2,2]])
    })
})

describe("Place cells on field", () => {
    it("place the living cells on the field - 5", () => {
        expect(placeCellsOnField([['b','b','b'],['b','b','b'],['b','b','b']], [[1,0], [2,1], [0,2], [1,2], [2,2]])).toEqual([['b','o','b'],['b','b','o'],['o','o','o']])
    })
    it("place the living cells on the field - 7", () => {
        expect(placeCellsOnField([['b','b','b'],['b','b','b'],['b','b','b']], [[0,0], [1,1], [2,2], [0,2], [1,0], [0,1], [1,2]])).toEqual([['o','o','b'],['o','o','b'],['o','o','o']])
    })
    it("place the living cells on the field - 7", () => {
        expect(placeCellsOnField([['b','b','b'],['b','b','b'],['b','b','b'],['b','b','b']], [[1,0], [0,1], [1,1], [0,2], [2,2], [2,3]])).toEqual([['b','o','b'],['o','o','b'],['o','b','o'],['b','b','o']])
    })
})

describe("Checking what the state of each cell is: [coord-x, coord-y, amount of neighbours, living or not (1=living)]", () => {
    it("Find how many living neighbours on 3x3 field", () => {
        expect(checkEachCell([['b','o','b'],['b','b','o'],['o','o','o']])).toEqual([[0,0,1,0], [1,0,1,1], [2,0,2,0], [0,1,3,0], [1,1,5,0], [2,1,3,1], [0,2,1,1], [1,2,3,1], [2,2,2,1]])
    })
    it("Find how many living neighbours on 3x3 field", () => {
        expect(checkEachCell([['b','o','o'],['b','b','o'],['o','b','o']])).toEqual([[0,0,1,0], [1,0,2,1], [2,0,2,1], [0,1,2,0], [1,1,5,0], [2,1,3,1], [0,2,0,1], [1,2,3,0], [2,2,1,1]])
    })
    it("Find how many living neighbours on 3x4 field", () => {
        expect(checkEachCell([['b','o','o','b'],['b','b','o','o'],['b','o','b','o']])).toEqual([[0,0,1,0], [1,0,2,1], [2,0,3,1], [3,0,3,0], [0,1,2,0], [1,1,4,0], [2,1,5,1], [3,1,3,1], [0,2,1,0], [1,2,1,1], [2,2,4,0], [3,2,2,1]])
    })
})

describe("Determine wich cells should be living", () => {
    it("Return a list of coords of living cells 1", () => {
        expect(giveLivingCells([[0,0,1,0], [1,0,1,1], [2,0,2,0], [0,1,3,0], [1,1,5,0], [2,1,3,1], [0,2,1,1], [1,2,3,1], [2,2,2,1]])).toEqual([[0,1],[2,1],[1,2],[2,2]])
    })
    it("Return a list of coords of living cells 2", () => {
        expect(giveLivingCells([[0,0,1,0], [1,0,2,1], [2,0,2,1], [0,1,2,0], [1,1,5,0], [2,1,3,1], [0,2,0,1], [1,2,3,0], [2,2,1,1]])).toEqual([[1,0],[2,0],[2,1], [1,2]])
    })
    it("Return a list of coords of living cells 3", () => {
        expect(giveLivingCells([[0,0,1,0], [1,0,2,1], [2,0,3,1], [3,0,3,0], [0,1,2,0], [1,1,4,0], [2,1,5,1], [3,1,3,1], [0,2,1,0], [1,2,1,1], [2,2,4,0], [3,2,2,1]])).toEqual([[1,0], [2,0], [3,0], [3,1], [3,2]])
    })
})

describe("Get the necessary data from the RLE input", () => {
    it("Get the necessary data from a simpel RLE input", () => {
    expect(formatRLE(`#C This is a glider.
x = 3, y = 3
bo$2bo$3o!`)).toEqual(['x = 3, y = 3', 'bo$2bo$3o!'])
                    })
    it("Get the necessary data from a advanced RLE input", () => {
    expect(formatRLE(`#N Gosper glider gun
#C This was the first gun discovered.
#C As its name suggests, it was discovered by Bill Gosper.
x = 36, y = 9, rule = B3/S23
24bo$22bobo$12b2o6b2o12b2o$11bo3bo4b2o12b2o$2o8bo5bo3b2o$2o8bo3bob2o4bobo$10bo5bo7bo$11bo3bo$12b2o!`)).toEqual(['x = 36, y = 9', '24bo$22bobo$12b2o6b2o12b2o$11bo3bo4b2o12b2o$2o8bo5bo3b2o$2o8bo3bob2o4bobo$10bo5bo7bo$11bo3bo$12b2o!'])
                    })
})

describe("Form a RLE return for the end of the game", () => {
    it("Get the RLE from a field 1", () => {
        expect(formRLE([['b','o','b'],['b','b','o'],['o','o','o']])).toBe('bob$2bo$3o!')
    })
    it("Get the RLE from a field 2", () => {
        expect(formRLE([['b','o','o','b'],['b','b','o','o'],['b','o','b','o']])).toBe('b2ob$2b2o$bobo!')
    })
})

describe("Play Game -> Play the full game", () => {
    it("Play a simple game of life 1", () => {
        expect(playGame(`#C This is a glider.
x = 3, y = 3
bob$2bo$3o!`, 3)).toBe('3b$b2o$b2o!')
    })
    it("Play a simple game of life 2", () => {
        expect(playGame(`#C This is a glider.
x = 3, y = 3
bob$2bo$3o!`, 1)).toBe('3b$obo$b2o!')
    })
    it("Plat a simple game of life 3", () => {
        expect(playGame(`#C Dit is een zelfverzonnen test
x = 3, y = 3
3b$3o$3b!`, 1)).toBe('bob$bob$bob!')
    })
    it("Plat a simple game of life 4", () => {
        expect(playGame(`#C Dit is een zelfverzonnen test
x = 4, y = 4
b2ob$obob$bo2b$2obo!`, 1)).toBe('b2ob$obob$4b$3ob!')
    })
    it("Plat a simple game of life 5", () => {
        expect(playGame(`#C Dit is een zelfverzonnen test
x = 4, y = 4
b2ob$obob$bo2b$2obo!`, 3)).toBe('b2ob$2b2o$2bob$bo2b!')
    })
})

describe("the new checkCells - unlimited boarder frendly", () => {
    it("simple first test", () => {
        expect(getNewLivingCells([[1,0], [2,1], [0,2], [1,2], [2,2]])).toEqual([[0,1], [2,1], [1,2], [2,2], [1,3]])
    })
    it("simple first test", () => {
        expect(getNewLivingCells([[1,0], [2,1], [0,1], [1,2], [2,2]])).toEqual(expect.arrayContaining([[1,0], [2,1], [0,1], [1,2], [2,2]]))
    })
})

describe("Get the min max difference for determining the field size", () => {
    it("max and min test 1", () => {
        expect(getDifMinMax([[3,1], [2,1], [-2,1], [1,2], [2,5]])).toEqual([5,4])
    })
    it("max and min test 2", () => {
        expect(getDifMinMax([[3,1], [2,1], [-2,1], [1,2], [2,7]])).toEqual([5,6])
    })
})

describe("Normalize the coords to remove the dead lines in the output", () => {
    it("Normalize test 1", () => {
        expect(normalizeCells([[1,1],[2,2],[3,2],[1,3],[2,3]])).toEqual([[0,0], [1,1], [2,1], [0,2], [1,2]])
    })
})