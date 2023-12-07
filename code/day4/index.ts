import { readFileSync, writeFileSync } from 'fs'

type card = {
    id: number
    winningNumbers: number[]
    myNumbers: number[]
    amountOfMatches: number
}

export function part1(input: string): number {
    const cards = getCards(input)
    let sumOfPoints = 0
    for (let card of cards) {
        sumOfPoints += getPointsOfCard(card)
    }
    return sumOfPoints
}

export function part2(input: string): number {
    const cards = getCards(input)
    const allCards = []
    const tempCards = [...cards]

    while (tempCards.length > 0) {
        const card = tempCards.pop()
        if (card === undefined) throw new Error('card is undefined')
        const copies = getCopiesOfCard(card, cards)
        allCards.push(card)
        tempCards.push(...copies)
    }
    printResult(cards, allCards)

    return allCards.length
}

function printResult(cards: card[], copiedInstances: card[]) {
    for (let originalCard of cards) {
        const amountOfInstances = copiedInstances.filter(
            (card) => card.id === originalCard.id
        ).length
        console.log(
            `card with id ${originalCard.id} has ${originalCard.amountOfMatches} matches, and ${amountOfInstances} instances`
        )
    }
}

function getCardById(id: number, cards: card[]): card | undefined {
    return cards.find((card) => card.id === id)
}

// a card with 5 matching number and the id of 10 would copy the cards with id 11, 12, 13, 14 and 15
function getCopiesOfCard(card: card, cards: card[]): card[] {
    const matchCount = card.amountOfMatches
    const tempCards: card[] = []
    if (matchCount === 0) {
        return []
    }
    for (let i = 1; i <= matchCount; i++) {
        const tempCard = getCardById(card.id + i, cards)
        if (tempCard === undefined)
            throw new Error(`tempCard is undefined ${card.id + i}`)
        tempCards.push(tempCard)
    }
    return tempCards
}

function getPointsOfCard(card: card): number {
    let points = 0
    for (let i = 0; i < card.amountOfMatches; i++) {
        if (points === 0) {
            points = 1
        } else {
            points *= 2
        }
    }
    return points
}

function getCards(input: string): card[] {
    const lines = input.split('\n')
    const cards: card[] = []
    lines.forEach((line) => {
        const cardNameSplit = line.split(':')
        const id = parseInt(cardNameSplit[0].split('Card')[1])
        const numberLists = cardNameSplit[1].split('|')
        let winningNumbers = numberLists[0].split(' ').map((n) => parseInt(n))
        let myNumbers = numberLists[1].split(' ').map((n) => parseInt(n))
        winningNumbers = winningNumbers.filter((n) => !Number.isNaN(n))
        myNumbers = myNumbers.filter((n) => !Number.isNaN(n))
        let matchCount = 0
        for (let number of myNumbers) {
            if (winningNumbers.includes(number)) {
                matchCount++
            }
        }

        cards.push({
            id,
            winningNumbers,
            myNumbers,
            amountOfMatches: matchCount,
        })
    })
    return cards
}

function main() {
    const input = readFileSync('input.txt', 'utf8')
    console.log(part2(input))
}
main()
