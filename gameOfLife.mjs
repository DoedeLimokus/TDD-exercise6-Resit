export function createField(x,y){
    return ([['b','b','b'],['b','b','b'],['b','b','b']])
}

export function getSizeFromRLE(RLE){
    return ([['x',3], ['y',3]])
}

export function getLivingCellsFromRLE(RLE){
    return ([[1,0], [2,1], [0,2], [1,2], [2,2]])
}