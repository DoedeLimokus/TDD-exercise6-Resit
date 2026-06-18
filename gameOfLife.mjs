export function createField(x,y){
    let currentField = []
    let newField = []


    let i = 0
    let j = 0
    for (i = 0; i < x; i++){
        newField = []
        for (j = 0; j < y; j++){
            newField.push('b')
        }
        currentField.push(newField)
    }
    return currentField
}

export function getSizeFromRLE(RLE){
    const sizes = RLE.match(/\d+/g)
    return([['x', Number(sizes[0])], ['y', Number(sizes[1])]])
}

export function getLivingCellsFromRLE(RLE){
    return ([[1,0], [2,1], [0,2], [1,2], [2,2]])
}

export function placeCellsOnField(field, livingCells){
    return ([['b','o','b'],['b','b','o'],['o','o','o']])
}

console.log(getSizeFromRLE('x = 3, y = 4'))