import { describe, it, expect} from "vitest"
import { createField } from "./gameOfLife.mjs"

// empty field check
describe('empty field check', () => {
    it("Check if a field is empty when created", () => {
        expect(createField(3,3)).toEqual([['b','b','b'],['b','b','b'],['b','b','b']])
    })
})
