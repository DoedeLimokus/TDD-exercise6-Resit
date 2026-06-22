// --------------------------------BEFORE GAME----------------------------------- 
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

// --------------------------------DURING GAME----------------------------------- 

export function checkEachCell(field){
    let result = []
    const yLength = field.length
    const xLength = field[0].length
    for(let y = 0; y < yLength; y++){
        for (let x = 0; x < xLength; x++){
            let cell = field[y][x]
            let living = 0
            if (cell == 'o'){
                living = 1
            }
            let neighbours = 0
            for(let yTranslate = -1; yTranslate < 2; yTranslate++){
                let yCheck = y + yTranslate
                if (!(yCheck < 0 || yCheck >= yLength)){
                    for(let xTranslate = -1; xTranslate < 2; xTranslate++){
                        let xCheck = x + xTranslate
                        if (!(xCheck < 0 || xCheck >= xLength)){
                            if(!(xCheck == x && yCheck == y)){
                                if(field[yCheck][xCheck] == 'o'){
                                    neighbours++
                                }
                            }
                        }
                    }
                }
            }
            result.push([x,y,neighbours,living])
        }
    }
    return result
}

export function giveLivingCells(data){
    let livingCellsNextRound = []
    for(let pointer = 0; pointer < (data.length); pointer++){
        const cell = data[pointer]
        // living cell
        if (cell[3] == 1){
            if (cell[2] == 2 || cell[2] == 3){
                livingCellsNextRound.push([cell[0],cell[1]])
            }
        } else {
            if (cell[2] == 3){
                livingCellsNextRound.push([cell[0], cell[1]])
            }
        }
    }
    return livingCellsNextRound
}