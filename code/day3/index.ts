import { readFileSync } from 'fs'

type numberEntry = {
    value: number
    rowIndex: number
    colStartIndex: number
    colEndIndex: number
}

type gear = {
    rowIndex: number
    colIndex: number
}

export function part1(input: string): number {
    let indexCounter = 0
    const values: string[][] = []
    const numbers: numberEntry[] = []
    const lines = splitLines(input)
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
    return sum
}

export function part2(input: string): number {
    let indexCounter = 0
    const values: string[][] = []
    const lines = splitLines(input)
    for (const line of lines) {
        values[indexCounter] = line.split('')
        indexCounter++
    }
    const gears = findAllGears(values)
    const gearsWidthAdjacentNumbers = gears.map((gear) =>
        getAdjacentNumbers(gear, values)
    )

    let sum = 0
    for (let gear of gearsWidthAdjacentNumbers) {
        if (gear.adjacent) {
            sum += gear.numbers[0].value * gear.numbers[1].value
        }
    }
    return sum
}

function getAdjacentNumbers(
    gear: gear,
    values: string[][]
): { gear: gear; adjacent: boolean; numbers: numberEntry[] } {
    // check the row above for all numbers
    // check the own row for all numbers
    // check the row below for all numbers

    // no check for each number if it's start and end col is adjacent to the gear
    // if so save it in a adjacentNumbers array
    // if adjacentNumbers.length === 2 return true - we need to match exactly two numbers
    // else return false

    const numbersToCheck: numberEntry[] = []
    const hasRowAbove = gear.rowIndex > 0
    if (hasRowAbove) {
        numbersToCheck.push(
            ...getNumbersFromLine(
                values[gear.rowIndex - 1].join(''),
                gear.rowIndex - 1
            )
        )
    }
    numbersToCheck.push(
        ...getNumbersFromLine(values[gear.rowIndex].join(''), gear.rowIndex)
    )
    const hasRowBelow = gear.rowIndex < values.length - 1
    if (hasRowBelow) {
        numbersToCheck.push(
            ...getNumbersFromLine(
                values[gear.rowIndex + 1].join(''),
                gear.rowIndex + 1
            )
        )
    }
    const numbersAdjacent = numbersToCheck.filter((number) =>
        checkIfNumberIsAdjacentToGear(gear, number)
    )
    if (numbersAdjacent.length === 2) {
        return { gear: gear, adjacent: true, numbers: numbersAdjacent }
    }
    return { gear: gear, adjacent: false, numbers: [] }
}

function checkIfNumberIsAdjacentToGear(gear: gear, number: numberEntry) {
    if (
        gear.rowIndex !== number.rowIndex &&
        gear.rowIndex !== number.rowIndex - 1 &&
        gear.rowIndex !== number.rowIndex + 1
    ) {
        return false
    }
    if (
        number.colEndIndex >= gear.colIndex - 1 &&
        number.colStartIndex <= gear.colIndex + 1
    )
        return true
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
    let lines = input.split(/\r?\n/)
    lines = lines.map((line) => line.trim())
    return lines
}

function findAllGears(values: string[][]): gear[] {
    const gears: gear[] = []
    for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < values[i].length; j++) {
            if (values[i][j] === '*') {
                gears.push({ rowIndex: i, colIndex: j })
            }
        }
    }
    return gears
}

function main() {
    const input = readFileSync('input.txt', 'utf8')
    console.log(part2(input))
}
main()
