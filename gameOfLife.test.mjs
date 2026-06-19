import { describe, it, expect} from "vitest"
import { createField, getSizeFromRLE, getLivingCellsFromRLE, placeCellsOnField, checkEachCell} from "./gameOfLife.mjs"

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

describe("Checking what the state of each cell is: [coord-x, coord-y, amount of neighbours - living or nog (1=living)]", () => {
    it("Find how many living neighbours on 3x3 field", () => {
        expect(checkEachCell([['b','o','b'],['b','b','o'],['o','o','o']])).toEqual([[0,0,1,0], [1,0,1,1], [2,0,2,0], [0,1,3,0], [1,1,5,0], [2,1,3,1], [0,2,1,1], [1,2,3,1], [2,2,2,1]])
    })
})