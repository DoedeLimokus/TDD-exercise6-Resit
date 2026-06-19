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
    let livingCells = []
    let pointer = 0
    let x = 0
    let y = 0
    const sizeOfRLE = RLE.length

    for (pointer = 0; pointer < sizeOfRLE; pointer++){
        let currentLetter = RLE[pointer]
        if (currentLetter == '!'){
            return livingCells
        }

        if (currentLetter == 'b'){
            x += 1
        } else if (currentLetter == 'o'){
            livingCells.push([x,y])
            x += 1
        } else if (currentLetter == "$"){
            console.log(`$, ${pointer}`)
            x = 0
            y += 1
        } else if (!isNaN(RLE[pointer])){
            if (RLE[pointer + 1] == "o"){
                for (let i = 0; i < Number(RLE[pointer]); i++){
                    livingCells.push([(x+i),y])
                }
                x = x + Number(RLE[pointer])
                pointer += 1
            } else {
                x += 1
            }
        }
    }
}

export function placeCellsOnField(field, livingCells){
    const livingCellsLength = livingCells.length
    for (let cell = 0; cell < livingCellsLength; cell++){
        let currentCell = livingCells[cell]
        field[currentCell[1]][currentCell[0]] = 'o'
    }
    return field
}