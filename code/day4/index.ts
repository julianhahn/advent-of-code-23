import { readFileSync } from 'fs'

type card = {
    winningNumbers: number[]
    myNumbers: number[]
}

export function part1(input: string): number {
    const cards = getCards(input)
    let sumOfPoints = 0
    for (let card of cards) {
        sumOfPoints += getPointsOfCard(card)
    }
    return sumOfPoints
}

function getPointsOfCard(card: card): number {
    let points = 0
    for (let number of card.myNumbers) {
        if (card.winningNumbers.includes(number)) {
            if (points == 0) points = 1
            else {
                points = points * 2
            }
        }
    }
    return points
}

function getCards(input: string): card[] {
    const lines = input.split('\n')
    const cards: card[] = []
    lines.forEach((line) => {
        const cardNameSplit = line.split(':')
        const numberLists = cardNameSplit[1].split('|')
        let winningNumbers = numberLists[0].split(' ').map((n) => parseInt(n))
        let myNumbers = numberLists[1].split(' ').map((n) => parseInt(n))
        winningNumbers = winningNumbers.filter((n) => !Number.isNaN(n))
        myNumbers = myNumbers.filter((n) => !Number.isNaN(n))
        cards.push({
            winningNumbers,
            myNumbers,
        })
    })
    return cards
}

function main() {
    const input = readFileSync('input.txt', 'utf8')
    console.log(part1(input))
}
main()
