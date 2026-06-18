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
    return ([['x',3], ['y',3]])
}

export function getLivingCellsFromRLE(RLE){
    return ([[1,0], [2,1], [0,2], [1,2], [2,2]])
}

export function placeCellsOnField(field, livingCells){
    return ([['b','o','b'],['b','b','o'],['o','o','o']])
}

console.log(createField(3,3))