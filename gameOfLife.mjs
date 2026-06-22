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

export function formatRLE(RLE){
    const lines = RLE.split(/\r?\n/)
    let returnData = []

    for (let pointer = 0; pointer < lines.length; pointer++){
        const line = lines[pointer]
        if (line[0] == '#'){
            continue
        } else if (line[0] == 'x'){
            returnData.push(line.slice(0, 13))
        } else if (line[0] == 'b' || line[0] == 'o' || !(isNaN(line[0]))){
            returnData.push(line)
        }
    }

    return (returnData)
}

export function formRLE(field){
    let returnArray = []
    for(let pointer = 0; pointer < field.length; pointer++){
        const currentRow = field[pointer]
        for(let i = 0; i < currentRow.length; i++){
            let amount = 0
            let currentLetter = currentRow[i]
            while (currentRow[i + amount] == currentLetter){
                amount += 1
            }
            if(amount > 1){
                returnArray.push(amount)
                returnArray.push(currentLetter)
                i = i + (amount - 1)
            } else if (amount == 1){
                returnArray.push(currentLetter)
            }
        }
        returnArray.push('$')
    }
    returnArray[returnArray.length - 1] = '!'
    const returnRLE = returnArray.join('')
    return(returnRLE)
}

export function playGame(RLE, turns){

    const parsedRLE = formatRLE(RLE)
    let state = getLivingCellsFromRLE(parsedRLE[1])

    for(let turn = 0; turn < turns; turn++){
        state = getNewLivingCells(state)
    }

    const normalizedCells = normalizeCells(state)
    const MinMax = getDifMinMax(normalizedCells)
    const emptyField = createField(MinMax[1],MinMax[0])
    const endField = placeCellsOnField(emptyField, normalizedCells)

    return(formRLE(endField))

}
export function getNewLivingCells(livingCells){
    let neighbourCount = []
    let NewLivingCells = []
    for(let cell = 0; cell < livingCells.length; cell++){
        const currentCell = livingCells[cell]
        for(let dy = -1; dy < 2; dy++){
            for(let dx = -1; dx < 2; dx++){
                if (dx == 0 && dy == 0) continue
                neighbourCount.push([currentCell[0] + dx, currentCell[1] + dy])
            }
        }
    }

    for(let i = 0; i < neighbourCount.length; i++){
        let count = neighbourCount.filter(item => JSON.stringify(item) == JSON.stringify(neighbourCount[i])).length
        let living = livingCells.some(item => JSON.stringify(item) == JSON.stringify(neighbourCount[i]))
        if(count == 2 && living){
            NewLivingCells.push(neighbourCount[i])
        } else if (count == 3){
            NewLivingCells.push(neighbourCount[i])
        }
        
    }

    
    const uniqueCellsString = [...new Set(NewLivingCells.map(item => JSON.stringify(item)))]
    
    const uniqueCellsArray = uniqueCellsString.map(item => JSON.parse(item))

    return(uniqueCellsArray)
}

export function getDifMinMax(livingCells){
    const xs = livingCells.map(cell => cell[0])
    const ys = livingCells.map(cell => cell[1])
    const minX = Math.min (...xs)
    const maxX = Math.max (...xs)
    const minY = Math.min (...ys)
    const maxY = Math.max (...ys)

    return([((maxX - minX)+1),((maxY - minY)+1)])
}

export function normalizeCells(cells){
    const minX = Math.min(...cells.map(c => c[0]))
    const minY = Math.min(...cells.map(c => c[1]))
    const answer = cells.map(([x,y]) => [x-minX, y-minY])
    return answer
}
