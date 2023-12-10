// go through a hand and find the highest possible hand.

// i guess when we have only four different kind of hands, we just choose one hand as the highest with the highest value inside the same hand.
//  A, K, Q, J, T, 9, 8, 7, 6, 5, 4, 3, 2 or
const CARD_VALUES = {
    A: 14,
    K: 13,
    Q: 12,
    J: 11,
    T: 10,
    9: 9,
    8: 8,
    7: 7,
    6: 6,
    5: 5,
    4: 4,
    3: 3,
    2: 2,
} as const
type CardValue = (typeof HAND_TYPES)[keyof typeof HAND_TYPES]

const HAND_TYPES = {
    FIVE_OF_A_KIND: 7,
    FOUR_OF_A_KIND: 6,
    FULL_HOUSE: 5,
    THREE_OF_A_KIND: 4,
    TWO_PAIR: 3,
    ONE_PAIR: 2,
    HIGH_CARD: 1,
} as const

type HandType = (typeof HAND_TYPES)[keyof typeof HAND_TYPES]

class Hand {
    cards: CardValue[]
    strength: HandType
    bid: number

    constructor(cards: CardValue[], bid: number) {
        this.cards = cards
        this.strength = this.findStrength()
        this.bid = bid
    }

    findStrength(): HandType {
        if (this.isFiveOfAKind()) {
            return HAND_TYPES.FIVE_OF_A_KIND
        } else if (this.isFourOfAKind()) {
            return HAND_TYPES.FOUR_OF_A_KIND
        }
    }

    isTwoPair(): boolean {
        let pairCount = 0
        let firs
    }

    isThreeOfAKind(): boolean {
        for (let i = 0; i < this.cards.length; i++) {
            let matchCount = 0
            for (let j = 0; j < this.cards.length; j++) {
                if (this.cards[i] === this.cards[j]) {
                    matchCount++
                }
            }
            if (matchCount === 3) {
                return true
            }
        }
        return false
    }

    isFullHouse(): boolean {
        let kindOfCardForThree = 0
        // has three of the same kind
        for (let i = 0; i < this.cards.length; i++) {
            let matchCount = 0
            for (let j = 0; j < this.cards.length; j++) {
                if (this.cards[i] === this.cards[j]) {
                    matchCount++
                }
            }
            if (matchCount === 3) {
                kindOfCardForThree = this.cards[i]
                break
            }
        }
        // since there is no card with the value 0 we can use it as a flag to indicate that we didn't find a card with three of a kind
        if (kindOfCardForThree === 0) {
            return false
        }
        // has two of the same kind
        for (let i = 0; i < this.cards.length; i++) {
            let matchCount = 0
            for (let j = 0; j < this.cards.length; j++) {
                if (this.cards[i] === this.cards[j]) {
                    matchCount++
                }
            }
            if (matchCount === 2 && this.cards[i] !== kindOfCardForThree) {
                return true
            }
        }
        return false
    }

    isFourOfAKind(): boolean {
        for (let i = 0; i < this.cards.length; i++) {
            let matchCount = 0
            for (let j = 0; j < this.cards.length; j++) {
                if (this.cards[i] === this.cards[j]) {
                    matchCount++
                }
            }
            if (matchCount === 4) {
                return true
            }
        }
        return false
    }

    isFiveOfAKind(): boolean {
        return this.cards.every((card) => card === this.cards[0])
    }
}

export function parseToHands(input: string): Hand[] {
    return input.split('\n').map(parseToHand)
}

function parseToHand(input: string): Hand {
    const [cards, value] = input.split(' ')
}
