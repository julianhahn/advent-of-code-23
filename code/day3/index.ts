type numberEntry = {
    value: number
    rowIndex: number
    colStartIndex: number
    colEndIndex: number
}

export function part1(input: string): number {
    let lines = splitLines(input)
    lines = lines.map((line) => line.trim())
    let indexCounter = 0
    const values: string[][] = []
    const numbers: numberEntry[] = []
    for (const line of lines) {
        numbers.push(...getNumbersFromLine(line, indexCounter))
        values[indexCounter] = line.split('')
        indexCounter++
    }
    let filtered = numbers.filter((number) => hasSymbolAdjacent(number, values))

    let sum = 0
    for (let number of filtered) {
        sum += number.value
    }
    console.log(sum)
    return sum
}

function hasSymbolAdjacent(number: numberEntry, values: string[][]): boolean {
    // for the row above, the own row and the row below
    // check for each of the x values from x=colStartIndex-1 to x=colEndIndex+1
    // if the value is a symbol
    // if so, return true
    // if not, return false
    1
    let found = false

    const hasRowAbove = number.rowIndex > 0
    const hasRowBelow = number.rowIndex < values.length - 1
    const hasColLeft = number.colStartIndex > 0
    const hasColRight = number.colEndIndex < values[0].length - 1

    const colStart = hasColLeft
        ? number.colStartIndex - 1
        : number.colStartIndex
    const colEnd = hasColRight ? number.colEndIndex + 1 : number.colEndIndex

    if (hasRowAbove) {
        found = columnSpanHasSymbol(
            colStart,
            colEnd,
            values[number.rowIndex - 1]
        )
    }
    if (!found) {
        found = columnSpanHasSymbol(colStart, colEnd, values[number.rowIndex])
    }
    if (!found && hasRowBelow) {
        found = columnSpanHasSymbol(
            colStart,
            colEnd,
            values[number.rowIndex + 1]
        )
    }
    return found
}

function columnSpanHasSymbol(
    colStart: number,
    colEnd: number,
    row: string[]
): boolean {
    const symbolRegex = /[^.\w\s]/g
    for (let j = colStart; j < colEnd + 1; j++) {
        if (row[j] === undefined)
            console.error('row[j] is undefined', j, colStart, colEnd, row)
        if (row[j].match(symbolRegex)) {
            return true
        }
    }
    return false
}

function getNumbersFromLine(line: string, index: number): numberEntry[] {
    const numbers: numberEntry[] = []
    const numberRegex = /\d+/g
    const matches = line.matchAll(numberRegex)
    for (const match of matches) {
        if (match.index === undefined)
            throw new Error('match.index is undefined')
        const value = parseInt(match[0])
        const colStartIndex = match.index
        numbers.push({
            value: value,
            rowIndex: index,
            colStartIndex: colStartIndex,
            colEndIndex: getEndIndexFromNumber(value, colStartIndex),
        })
    }

    return numbers
}

function getEndIndexFromNumber(number: number, startIndex: number): number {
    return startIndex + number.toString().length - 1
}

function splitLines(input: string): string[] {
    return input.split(/\r?\n/)
}
