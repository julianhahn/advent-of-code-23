import { readFileSync } from 'fs'

type set = {
    red: number
    green: number
    blue: number
}

type game = {
    id: number
    sets: set[]
}

function isGamePossible(game: game, targetSet: set): boolean {
    for (let set of game.sets) {
        if (
            set.red > targetSet.red ||
            set.green > targetSet.green ||
            set.blue > targetSet.blue
        ) {
            console.log('false', set)
            return false
        }
    }
    return true
}

export function part_1(input: string): number {
    const lines = splitLines(input)
    const games: game[] = []
    const targetSet: set = {
        red: 12,
        green: 13,
        blue: 14,
    }
    for (let line of lines) {
        const [id, sets] = line.split(': ')
        games.push({
            id: parseInt(id.split('Game ')[1]),
            sets: getSets(line),
        })
    }
    const possibleGames = games.filter((game) => {
        return isGamePossible(game, targetSet)
    })

    let total = 0
    for (let game of possibleGames) {
        total += game.id
    }
    return total
}

export function part_2(input: string): number {
    const lines = splitLines(input)
    const games: game[] = []
    for (let line of lines) {
        const [id, sets] = line.split(': ')
        games.push({
            id: parseInt(id.split('Game ')[1]),
            sets: getSets(line),
        })
    }
    const smallestSets = games.map((game) => {
        return getSmallestPossibleSet(game)
    })
    let total = 0
    for (let set of smallestSets) {
        total += calculatePowerOfSet(set)
    }
    return total
}

function calculatePowerOfSet(set: set): number {
    return set.red * set.green * set.blue
}

function getSmallestPossibleSet(game: game): set {
    let maxRed = 0
    let maxGreen = 0
    let maxBlue = 0
    // find the biggest number in each set as a maximum
    for (let set of game.sets) {
        if (set.red > maxRed) {
            maxRed = set.red
        }
        if (set.green > maxGreen) {
            maxGreen = set.green
        }
        if (set.blue > maxBlue) {
            maxBlue = set.blue
        }
    }
    return {
        red: maxRed,
        green: maxGreen,
        blue: maxBlue,
    }
}

function getSets(line: string): set[] {
    const resultSet = []
    // split id from sets
    const [id, sets] = line.split(': ')
    // split sets
    const setsArray = sets.split('; ')
    for (let set of setsArray) {
        const amount_color_tuple = set.split(', ')
        let newSet: set = {
            red: 0,
            green: 0,
            blue: 0,
        }
        for (let color of amount_color_tuple) {
            const [amount, colorString] = color.split(' ')
            switch (colorString) {
                case 'red':
                    newSet.red = parseInt(amount)
                    break
                case 'green':
                    newSet.green = parseInt(amount)
                    break
                case 'blue':
                    newSet.blue = parseInt(amount)
                    break
                default:
                    break
            }
        }
        resultSet.push(newSet)
    }
    return resultSet
}

function splitLines(input: string): string[] {
    return input.split(/\r?\n/)
}

function main() {
    const input = readFileSync('input.txt', 'utf8')
    console.log(part_2(input))
}
main()
