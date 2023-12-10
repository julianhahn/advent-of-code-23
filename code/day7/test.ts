const example = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`

import { parseToHands } from './index'

test(`parse the list into a list of hands`, () => {
    const hands = parseToHands(example)
    expect(hands.length).toEqual(5)
})
